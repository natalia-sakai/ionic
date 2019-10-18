<?php
namespace App\Http\Controllers\Auth;

use App\Agape;
use App\Avental;
use App\Cargos;
use App\Events\CreateReuniao;
use App\User;
use App\ListaPresenca;
use App\Reuniao;
use App\Ordem;
use App\Info;
use Hash;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Mockery\HigherOrderMessage;

class AuthController extends Controller
{
    public function register(Request $request){
        //função de validacao de dados
        $request->validate([
            'fName' => 'required|string',
            'lName' => 'required|string',
            'endereco' => 'required|string',
            'cidade' => 'required|string',
            'estado' => 'required|string',
            'data_nasc' => 'required|date',
            'email' => 'required|string|email|unique:users',
            'cargo_id'  => 'required|integer',
            'avental_id'  => 'required|integer',
            'telefone' => 'required|string',
            'password' => 'required|string'
        ]);
        
        //novo user
        $user = new User;
        //insere os dados
        $user->first_name = $request->fName;
        $user->last_name = $request->lName;
        $user->endereco = $request->endereco;
        $user->cidade = $request->cidade;
        $user->estado = $request->estado;
        $user->data_nasc = $request->data_nasc;
        $user->telefone = $request->telefone;
        $user->email = $request->email;
        $user->cargo_id = $request->cargo_id;
        $user->avental_id = $request->avental_id;
        $user->password = bcrypt($request->password);
        //salva o user
        $user->save();
        return response()->json([
            'message' => 'Usuário criado com sucesso!'
        ], 201);
    }

    public function listapresenca(Request $request){
        $request->validate([
            'id_user' => 'required|int',
            'presenca' => 'required|int',
            'motivo' => 'string'
        ]);
        $lista = ListaPresenca::where('id_user', $request->id_user)->first();
        if($lista != null){
            ListaPresenca::where('id_user', $request->id_user)->update(['presenca'=> $request->presenca, 'motivo'=>$request->motivo]);
            return response()->json([
                'message' => 'Lista Atualizada!'
            ], 201);
        }
        else
        {
            $presenca = new ListaPresenca;
            $presenca -> id_user = $request->id_user;
            $presenca -> presenca = $request->presenca;
            $presenca -> motivo = $request->motivo;
            $presenca->save();
        
            return response()->json([
                'message' => 'Novo usuário inserido na lista!'
            ], 201);
        }
    }

    public function ordem(Request $request){
        $request->validate([
            'ordem' => 'required|string',
            'id_user' => 'required|int',
            'nivel' => 'required|int'
        ]);

        $ordem = new Ordem;
        $ordem  -> id_user = $request->id_user;
        $ordem  -> ordem = $request->ordem;
        $ordem  -> nivel = $request->nivel;
        $ordem  -> ativo = 1;
        $ordem ->save();
    
        return response()->json([
            'message' => 'Nova ordem adicionada!'
        ], 201);
    }

    public function informativo(Request $request){
        $request->validate([
            'info' => 'required|string',
            'permissao' => 'required|int',
            'id_user' => 'required|int'
        ]);
        
        $info = new Info;
        $info  -> id_user = $request->id_user;
        $info  -> info = $request->info;
        $info  -> ativo = 1;
        $info  -> permissao = $request->permissao;
        $info ->save();
    
        return response()->json([
            'message' => 'Novo informativo adicionado!'
        ], 201);
        
    }

    public function agape(Request $request){
        $request->validate([
            'date' => 'required|string',
            'id_user' => 'required|int',
            'agape'=> 'required|string'
        ]);
        $agape = new Agape;
        $aux = $request->date;
        $data = strtotime($aux);
        $agape -> data = date('Y-m-d', $data);
        $agape -> id_user = $request->id_user;
        $agape -> agape = $request->agape;
        $agape -> ativo = 1;
        $agape->save();
        return response()->json([
            'message' => 'Ágape criada!'
        ], 201);
    }

    public function createreuniao($day){
        Carbon::setLocale('pt_BR');
        //pega a data atual
        $now =Carbon::now();
        //transforma em data
        $now = strtotime($now);
        $string = "+".$day." day";
        //soma a qtde de dias
        $data = strtotime($string, $now);
        //configura o formato
        $resul = date('Y-m-d', $data);
        //desativa reuniao antiga toda terça
        if($day == 6)
        {
            //pega a data do dia anterior
            $aux = strtotime("-1 day", $now);
            $antiga= date('Y-m-d', $aux);
            Reuniao::where('data',$antiga)->update(['ativo'=> 0]);
            return response()->json([
                'message' => 'Reuniao antiga desativada!'
            ], 201);
        }
        
        //verifica se ja tem uma reuniao nesse dia
        $verifica = Reuniao::where('data', $resul)->first();
        //se nao tiver
        if($verifica == null)
        {
            $reuniao = new Reuniao;
            $reuniao->data = $resul;
            $reuniao->ativo=1;
            $reuniao->save();
            return response()->json([
                'message' => 'Reuniao criada!'
            ], 201);
        }
        else{
            return response()->json([
                'message' => 'Reuniao já marcada!'
            ], 201);
        }
        
    }
    public function reuniao(){
        //pega o dia da semana
        $atual = date('w');
        switch($atual){
            case 1: //segunda
                return $this->createreuniao(0);
                break;
            case 2:
                return $this->createreuniao(6);
                break;
            case 3:
                return $this->createreuniao(5);
                break;
            case 4:
                return $this->createreuniao(4);
                break;
            case 5:
                return $this->createreuniao(3);
                break;
            case 6:
                return $this->createreuniao(2);
                break;
            case 0: //domingo
                return $this->createreuniao(1);
                break;
        }
        
    }

    public function login(Request $request) {
        /*para o login é preciso criar o token, precisa fazer:
        php artisan passport:install que ele dará um token e add no banco sozinho
        */
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me'=> 'boolean'
        ]);
        ///*
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
            'message' => 'Login não autorizado! Verifique se a senha ou o email estão corretos'
        ], 401);
        $user= Auth::user();
        $tokenResult = $user->createToken('Token de acesso pessoal');
        return response()->json($tokenResult);
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'id'=>$user->id,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }
    
    public function logout(Request $request){
        $request->user()->token()->revoke();
        if($request == null)
            return response()->json([
                'message' => 'Logout falhou!'
            ]);
        else
            return response()->json([
            'message' => 'Logout feito com sucesso!'
            ]);
    }
    //validacao
    public function checkpassword(Request $request){
        $request->validate([
            'id_user'=> 'required|int',
            'password' => 'required|string'
        ]);
        $password = User::where('id', $request->id_user)->value('password');
        if(Hash::check($request->password, $password, []))
            return response()->json('Senha correta!');
        else
            return response()->json('Senha incorreta!');
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */

     //funcoes do user
    public function user(Request $request){
        return response()->json($request->user());
    }

    public function getid(){
        $userInfo=Auth::user();
        return response()->json($userInfo->id);
    }

    public function updateuser(Request $request){
        $request->validate([
            'id_user'=> 'required|int',
            'fName' => 'required|string',
            'lName' => 'required|string',
            'email' => 'required|string|email',
            'endereco' => 'required|string',
            'cidade' => 'required|string',
            'estado' => 'required|string',
            'data_nasc' => 'required|date',
            'telefone' => 'required|string'
        ]);
        User::where('id', $request->id_user)->update([
            'first_name'=> $request->fName, 'last_name'=> $request->lName, 'email'=>$request->email,
            'endereco' => $request->endereco, 'cidade'=> $request->cidade, 'estado'=>$request->estado,
            'data_nasc'=>$request->data_nasc, 'telefone'=>$request->telefone
        ]);

        return response()->json([
            'message' => 'Usuário Atualizado!'
        ], 201);

    }

    public function updatepassword(Request $request){
        $request->validate([
            'id_user'=> 'required|int',
            'password' => 'required|string'
        ]);
        $password = bcrypt($request->password);
        User::where('id', $request->id_user)->update(['password'=> $password]);
        return response()->json([
            'message' => 'Senha Atualizada!'
        ], 201);
    }

    public function updateinfo(Request $request){
        $request->validate([
            'id'=>'required|int',
            'info'=>'required|string',
            'ativo'=>'required|int'
        ]);
        Info::where('id', $request->id)->update(['info'=>$request->info, 'ativo'=>$request->ativo]);
        return response()->json([
            'message' => 'Informativo Atualizado!'
        ], 201);
    }

    public function updateordem(Request $request){
        $request->validate([
            'id'=>'required|int',
            'ordem'=>'required|string',
            'ativo'=>'required|int'
        ]);
        Ordem::where('id', $request->id)->update(['ordem'=>$request->ordem, 'ativo'=>$request->ativo]);
        return response()->json([
            'message' => 'Ordem Atualizada!'
        ], 201);
    }

    public function updateagape(Request $request){
        $request->validate([
            'id'=>'required|int',
            'agape'=>'required|string',
            'ativo'=>'required|int',
            'date'=>'required|string'
        ]);
        $data = strtotime($request->date);
        $resul= date('Y-m-d', $data);
        Agape::where('id', $request->id)->update(['agape'=>$request->agape, 'ativo'=>$request->ativo, 'data'=>$resul]);
        return response()->json([
            'message' => 'Ágape Atualizada!'
        ], 201);
    }

    public function getusers(Request $request){
        $request->validate([
            'id_user'=>'required|int'
        ]);
        $resp = User::where('id', $request->id_user)->get();
        return response()->json($resp);
    }

    public function getlista(){
        $reuniaoInfo=Reuniao::where('ativo', '1')->value('id'); 
        $listaInfo = ListaPresenca::where('reuniao', $reuniaoInfo)->get();
        if($listaInfo != null)
            return response()->json($listaInfo);
        else
            return response()->json(" ");
    }

    public function getalllista(Request $request)
    {
        $request->validate([
            'id'=>'required|int'
        ]);
        $listaInfo = ListaPresenca::where('reuniao', $request->id)->get();
        if($listaInfo != null)
            return response()->json($listaInfo);
        else
            return response()->json(" ");
    }

    public function getreuniao(){
        //recebe do bd o valor 
        $reuniaoInfo=Reuniao::where('ativo', '1')->value('data');
        
        return response()->json($reuniaoInfo);
    }

    public function getallreuniao(){
        //recebe do bd o valor 
        $reuniaoInfo=Reuniao::where('ativo', '0')->get();
        
        return response()->json($reuniaoInfo);
    }
    
    public function getinfo(){
        //recebe do bd o valor 
        $infoInfo=Info::where('ativo', '1')->get();
        
        return response()->json($infoInfo);
    }

    public function getallinfo(){
        //recebe do bd o valor 
        $infoInfo=Info::get();
        
        return response()->json($infoInfo);
    }

    public function getordem(){
        $ordemInfo=Ordem::where('ativo', '1')->get();
        return response()->json($ordemInfo);
    }

    public function getallordem(){
        $ordemInfo=Ordem::get();
        return response()->json($ordemInfo);
    }

    public function getcargos(){
        $cargoInfo=Cargos::get();
        return response()->json($cargoInfo);
    }

    public function getagape(){
        $info=Agape::where('ativo', '1')->get();
        
        return response()->json($info);
    }

    public function getallagape(){
        $info=Agape::get();
        
        return response()->json($info);
    }
    public function getavental(){
        $info=Avental::get();
        
        return response()->json($info);
    }
}