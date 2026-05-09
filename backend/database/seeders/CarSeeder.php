<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            ['brand' => 'Toyota', 'model' => 'Camry', 'year' => 2024, 'plate' => '1234-A-1', 'fuel' => 'Essence', 'transmission' => 'Automatic', 'seats' => 5, 'price_per_day' => 500, 'status' => 'available'],
            ['brand' => 'Mercedes', 'model' => 'GLC 300', 'year' => 2023, 'plate' => '5678-B-2', 'fuel' => 'Diesel', 'transmission' => 'Automatic', 'seats' => 5, 'price_per_day' => 1200, 'status' => 'rented'],
            ['brand' => 'BMW', 'model' => 'X5', 'year' => 2024, 'plate' => '9012-C-3', 'fuel' => 'Diesel', 'transmission' => 'Automatic', 'seats' => 7, 'price_per_day' => 1500, 'status' => 'available'],
            ['brand' => 'Dacia', 'model' => 'Duster', 'year' => 2024, 'plate' => '3456-D-4', 'fuel' => 'Essence', 'transmission' => 'Manual', 'seats' => 5, 'price_per_day' => 350, 'status' => 'maintenance'],
            ['brand' => 'Renault', 'model' => 'Clio', 'year' => 2023, 'plate' => '7890-E-5', 'fuel' => 'Essence', 'transmission' => 'Manual', 'seats' => 5, 'price_per_day' => 300, 'status' => 'available'],
            ['brand' => 'Audi', 'model' => 'Q7', 'year' => 2024, 'plate' => '1111-F-6', 'fuel' => 'Diesel', 'transmission' => 'Automatic', 'seats' => 7, 'price_per_day' => 1800, 'status' => 'rented'],
        ];

        foreach ($cars as $car) {
            Car::create($car);
        }
    }
}
