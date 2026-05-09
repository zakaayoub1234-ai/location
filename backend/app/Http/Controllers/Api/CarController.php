<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Car;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    public function index()
    {
        $cars = Car::orderBy('created_at', 'desc')->get();
        return response()->json(['status' => true, 'cars' => $cars]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:2030',
            'plate' => 'required|string|max:20|unique:cars',
            'fuel' => 'required|string',
            'transmission' => 'required|string',
            'seats' => 'required|integer|min:1|max:20',
            'price_per_day' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'required|in:available,rented,maintenance',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('cars', 'public');
        }

        $car = Car::create($validated);

        return response()->json(['status' => true, 'car' => $car, 'message' => 'Car added successfully'], 201);
    }

    public function show(Car $car)
    {
        return response()->json(['status' => true, 'car' => $car]);
    }

    public function update(Request $request, Car $car)
    {
        $validated = $request->validate([
            'brand' => 'sometimes|string|max:255',
            'model' => 'sometimes|string|max:255',
            'year' => 'sometimes|integer|min:2000|max:2030',
            'plate' => 'sometimes|string|max:20|unique:cars,plate,' . $car->id,
            'fuel' => 'sometimes|string',
            'transmission' => 'sometimes|string',
            'seats' => 'sometimes|integer|min:1|max:20',
            'price_per_day' => 'sometimes|numeric|min:0',
            'description' => 'nullable|string',
            'status' => 'sometimes|in:available,rented,maintenance',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($car->image) Storage::disk('public')->delete($car->image);
            $validated['image'] = $request->file('image')->store('cars', 'public');
        }

        $car->update($validated);

        return response()->json(['status' => true, 'car' => $car, 'message' => 'Car updated successfully']);
    }

    public function destroy(Car $car)
    {
        if ($car->image) Storage::disk('public')->delete($car->image);
        $car->delete();
        return response()->json(['status' => true, 'message' => 'Car deleted successfully']);
    }
}
