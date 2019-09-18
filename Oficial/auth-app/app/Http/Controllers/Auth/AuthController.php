<?php
namespace App\Http\Controllers\Auth;
use App\User;
use App\ListaPresenca;
use App\Reuniao;
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
        $user = $request->user();
        $tokenResult = $user->createToken('Token de acesso pessoal');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'fName' => 'required|string',
            'lName' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string'
        ]);
        
        $user = new User;
        $user->first_name = $request->fName;
        $user->last_name = $request->lName;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
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
            'presenca' => 'required|boolean',
        ]);
        $presenca = new ListaPresenca;
        $presenca -> id_user = $request->id_user;
        $presenca -> presenca = $request->presenca;
        $presenca->save();
        return response()->json([
            'message' => 'Lista de presença atualizada!'
        ], 201);
    }

    public function reuniao(Request $request)
    {
        $request->validate([
            'data' => 'required|date'
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
        $userInfo=auth('api')->user();
        return response()->json($userInfo->id);
    }

    public function getreuniao()
    {
        $reuniao = DB::select('select data from reuniao where ativo = 1');
        return $reuniao;
    }
}

/*
É possivel fazer:
public function index()
{
    $users = DB::select('select * from users where active = ?', [1]);

    return view('user.index', ['users' => $users]);
}

*/