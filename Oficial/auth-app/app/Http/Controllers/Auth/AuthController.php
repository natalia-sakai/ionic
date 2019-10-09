<?php
namespace App\Http\Controllers\Auth;

use App\Cargos;
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
            $presenca = ListaPresenca::where('id_user', $request->id_user)->update(['presenca'=> $request->presenca, 'motivo'=>$request->motivo]);
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
            'id_user' => 'required|int',
            'ordem' => 'required|string',
            'ativo' => 'required|int'
        ]);

        $ordem = new Ordem;
        $ordem  -> id_user = $request->id_user;
        $ordem  -> ordem = $request->ordem;
        $ordem  -> ativo = $request->ativo;
        $ordem ->save();
    
        return response()->json([
            'message' => 'Nova ordem adicionada!'
        ], 201);
    }

    public function informativo(Request $request){
        $request->validate([
            'id_user' => 'required|int',
            'info' => 'required|string',
            'ativo' => 'required|int',
            'permissao' => 'required|int'
        ]);
        $info = new Info;
        $info  -> id_user = $request->id_user;
        $info  -> info = $request->info;
        $info  -> ativo = $request->ativo;
        $info  -> permissao = $request->permissao;
        $info ->save();
    
        return response()->json([
            'message' => 'Novo informativo adicionado!'
        ], 201);
        
    }

    public function reuniao(Request $request){
        $request->validate([
            'data' => 'required|date',
            'ativo' => 'number'
        ]);
        $reuniao = new Reuniao;
        $reuniao -> data = $request->data;
        $reuniao->save();
        return response()->json([
            'message' => 'Reuniao criada!'
        ], 201);
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

    public function getlista(){
        $userInfo=Auth::user();
        $id = $userInfo->id;
        //pega o primeiro q tiver o id (q é unico)
        $listaInfo = ListaPresenca::where('id_user', $id)->first();
        if($listaInfo != null)
            return response()->json($listaInfo);
        else
            return response()->json([
                'message' => 'Lista de presenca não marcada!'
            ], 201);
    }

    public function getreuniao(){
        //recebe do bd o valor 
        $reuniaoInfo=Reuniao::where('ativo', '1')->value('data');
        
        return response()->json($reuniaoInfo);
    }
    
    public function getinfo(){
        //recebe do bd o valor 
        $infoInfo=Info::where('ativo', '1')->pluck('info');
        
        return response()->json($infoInfo);
    }

    public function getordem(){
        //recebe do bd o valor 
        $ordemInfo=Ordem::where('ativo', '1')->pluck('ordem');
        return response()->json($ordemInfo);
    }

    public function getcargos(){
        $cargoInfo=Cargos::pluck('cargo');
        return response()->json($cargoInfo);
    }
}