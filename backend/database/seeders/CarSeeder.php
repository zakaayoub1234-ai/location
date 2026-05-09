<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    public function run(): void
    {
        $cars = [
            ['brand' => 'Toyota', 'model' => 'Camry', 'year' => 2024, 'plate' => '1234-A-1', 'fuel' => 'Essence', 'transmission' => 'Automatic', 'seats' => 5, 'price_per_day' => 500, 'status' => 'available', 'image' => 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=600'],
            ['brand' => 'Mercedes', 'model' => 'GLC 300', 'year' => 2023, 'plate' => '5678-B-2', 'fuel' => 'Diesel', 'transmission' => 'Automatic', 'seats' => 5, 'price_per_day' => 1200, 'status' => 'rented', 'image' => 'https://images.unsplash.com/photo-1605559424843-9e4c228f2232?w=600'],
            ['brand' => 'BMW', 'model' => 'X5', 'year' => 2024, 'plate' => '9012-C-3', 'fuel' => 'Diesel', 'transmission' => 'Automatic', 'seats' => 7, 'price_per_day' => 1500, 'status' => 'available', 'image' => 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600'],
            ['brand' => 'Dacia', 'model' => 'Duster', 'year' => 2024, 'plate' => '3456-D-4', 'fuel' => 'Essence', 'transmission' => 'Manual', 'seats' => 5, 'price_per_day' => 350, 'status' => 'maintenance', 'image' => 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600'],
            ['brand' => 'Renault', 'model' => 'Clio', 'year' => 2023, 'plate' => '7890-E-5', 'fuel' => 'Essence', 'transmission' => 'Manual', 'seats' => 5, 'price_per_day' => 300, 'status' => 'available', 'image' => 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600'],
            ['brand' => 'Audi', 'model' => 'Q7', 'year' => 2024, 'plate' => '1111-F-6', 'fuel' => 'Diesel', 'transmission' => 'Automatic', 'seats' => 7, 'price_per_day' => 1800, 'status' => 'rented', 'image' => 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600'],
        ];

        foreach ($cars as $car) {
            Car::updateOrCreate(['plate' => $car['plate']], $car);
        }
    }
}
