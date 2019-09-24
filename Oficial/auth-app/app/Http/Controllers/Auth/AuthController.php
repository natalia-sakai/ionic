<?php
namespace App\Http\Controllers\Auth;
use App\User;
use App\ListaPresenca;
use App\Reuniao;
use App\Ordem;
use App\Info;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        $user = Auth::user();
        $tokenResult = $user->createToken('Token de acesso pessoal');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'id' => $user->id, //nao sei se é isso
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function register(Request $request)
    {
        //função de validacao de dados
        $request->validate([
            'fName' => 'required|string',
            'lName' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);
        //novo user
        $user = new User;
        //insere os dados
        $user->first_name = $request->fName;
        $user->last_name = $request->lName;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        //salva o user
        $user->save();
        return response()->json([
            'message' => 'Usuário criado com sucesso!'
        ], 201);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Logged out feito com sucesso!'
        ]);
    }
  
    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function listapresenca(Request $request)
    {
        $request->validate([
            'id_user' => 'required|int',
            'presenca' => 'required|int',
        ]);
        $lista = ListaPresenca::where('id_user', $request->id_user)->first();
        if($lista != null){
            $presenca = ListaPresenca::where('id_user', $request->id_user)->update(['presenca'=> $request->presenca]);
            return response()->json([
                'message' => 'Lista Atualizada!'
            ], 201);
        }
        else
        {
            $presenca = new ListaPresenca;
            $presenca -> id_user = $request->id_user;
            $presenca -> presenca = $request->presenca;
            $presenca->save();
        
            return response()->json([
                'message' => 'Novo usuário inserido na lista!'
            ], 201);
        }
        
        
    }

    public function getlista()
    {
        $userInfo=Auth::user();
        $id = $userInfo->id;
        //pega o primeiro q tiver o id (q é unico)
        $listaInfo = ListaPresenca::where('id_user', $id)->first();
        //se tiver a info no bd
            return response()->json($listaInfo);
    }

    public function reuniao(Request $request)
    {
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

    public function getid()
    {
        $userInfo=Auth::user();
        return response()->json($userInfo->id);
    }
    
    public function getreuniao()
    {
        //recebe do bd o valor 
        $reuniaoInfo=Reuniao::where('ativo', '1')->value('data');
        
        return response()->json($reuniaoInfo);
    }
    
    public function getinfo()
    {
        //recebe do bd o valor 
        $infoInfo=Info::where('ativo', '1')->value('info');
        
        return response()->json($infoInfo);
    }

    public function getordem()
    {
        //recebe do bd o valor 
        $ordemInfo=Ordem::where('ativo', '1')->value('ordem');
        
        return response()->json($ordemInfo);
    }

    
    
    
}