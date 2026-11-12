<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

final class ProductsSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'id' => 'caverna',
                'title' => 'La Caverna Misteriosa',
                'type' => 'aventura',
                'label' => 'AVENTURA · MISTERIO',
                'level' => 'Nivel 5',
                'players' => '5 jugadores',
                'duration' => '2–3 sesiones de 2–2,5 h',
                'color' => '',
                'icon' => '◇',
                'intro' => 'Un desaparecido. Un bosque que se apaga. Y una caverna que guarda algo más que silencio.',
                'description' => 'En Eldermoor, la desaparición de Edwin conduce al grupo hacia el bosque de Gloomshade. Entre señales de corrupción y una caverna temida por los vecinos, los personajes deberán descubrir qué está consumiendo la vida del lugar.',
            ],
            [
                'id' => 'hogar',
                'title' => 'El Último Hogar',
                'type' => 'aventura',
                'label' => 'AVENTURA · FANTASÍA ARCANA',
                'level' => 'Nivel 5',
                'players' => '4–5 jugadores',
                'duration' => 'Por confirmar',
                'color' => 'blue',
                'icon' => '✧',
                'intro' => 'En la ciudad arcana de Dhalem, algunas puertas solo aparecen para quienes no deberían estar allí.',
                'description' => 'Una tormenta lleva al grupo hasta Dhalem y la posada El Último Hogar. Pero bajo la aparente calma de la ciudad, las desapariciones y las puertas imposibles plantean una pregunta: ¿qué ocurre con aquello que todos olvidan?',
            ],
        ];

        $rows = [];
        foreach ($products as $product) {
            $rows[] = [
                'id' => $product['id'],
                'data' => json_encode($product, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR),
            ];
        }

        DB::table('products')->insertOrIgnore($rows);
    }
}
