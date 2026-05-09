<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BookingRequest;
use Illuminate\Http\Request;

class BookingRequestController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
            'customer_phone' => 'required|string|max:20',
            'car_model' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'message' => 'nullable|string',
        ]);

        $booking = BookingRequest::create($validated);

        return response()->json([
            'status' => true,
            'message' => 'Booking request submitted successfully!',
            'booking' => $booking,
        ], 201);
    }

    public function index()
    {
        $bookings = BookingRequest::orderBy('created_at', 'desc')->get();
        return response()->json(['status' => true, 'bookings' => $bookings]);
    }

    public function update(Request $request, BookingRequest $bookingRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,confirmed,cancelled',
        ]);

        $bookingRequest->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Booking status updated successfully!',
            'booking' => $bookingRequest,
        ]);
    }
}
