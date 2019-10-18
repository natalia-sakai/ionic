<?php

namespace App\Listeners;

use App\Events\CreateReuniao;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendMessageReuniao
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CreateReuniao  $event
     * @return void
     */
    public function handle(CreateReuniao $event)
    {
        //
    }
}
