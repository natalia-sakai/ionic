<?php
namespace App;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\Info as Authenticatable;
class Info extends Authenticatable
{
    use HasApiTokens, Notifiable;
    protected $table = 'informativo';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'info','ativo','id_user','permissao'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
}