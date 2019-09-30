<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCargos extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cargos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cargo'); 
            $table->boolean('value')->default(0);
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();
        });

        DB::table('cargos')->insert([
            ['cargo'=>'Tesoureiro Adjunto'],
            ['cargo'=>'Mestre de Cerimonias'],
            ['cargo'=>'Tesoureiro'],
            ['cargo'=>'Venerável'],
            ['cargo'=>'Paste master'],
            ['cargo'=>'Primeiro Vigilante'],
            ['cargo'=>'Segundo Vigilante'],
            ['cargo'=>'Orador'],
            ['cargo'=>'Secretário'],
            ['cargo'=>'Harmonia'],
            ['cargo'=>'Banquetes'],
            ['cargo'=>'Cobridor'],
            ['cargo'=>'Cobridor Externo'],
            ['cargo'=>'Primeiro Diácono'],
            ['cargo'=>'Segundo Diácono'],
            ['cargo'=>'Experto I'],
            ['cargo'=>'Experto II'],
            ['cargo'=>'Chanceler'],
            ['cargo'=>'Porta Estandarte'],
            ['cargo'=>'Porta Espadas'],
            ['cargo'=>'Bibliotecário'],
            ['cargo'=>'Arquiteto'],
            ['cargo'=>'Hospitaleiro'],
            ['cargo'=>'Porta Bandeira']
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cargos');
    }
}