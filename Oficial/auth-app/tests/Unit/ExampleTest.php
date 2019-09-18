<?php

namespace Tests\Unit;
use App\ListaPresenca;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;


class ExampleTest extends TestCase
{
    use DatabaseMigrations;

    public function test_a_lista_can_be_created()
    {
        $lista_presenca= ListaPresenca::create(['id_user' => 1, 'presenca' => 1]);

        //busca o ultimo
        $latest_lista = ListaPresenca::latest()->first();
        //verifica se a info é igual
        $this->assertEquals($lista_presenca->id, $latest_lista->id);
        $this->assertEquals(1, $latest_lista->id_user);
        $this->assertEquals(1, $latest_lista->presenca);

        //verifica se no banco possui essas informações
        $this->seeInDatabase('lista_presenca', ['id' => 1, 'id_user' => 1, 'presenca' => 1]);

    }
}
