<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\Schedule;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function getCurrentRecipts()
    {
        $idUser = Auth::id();

        $userRecipts = Order::with('subject')->where('idUser', $idUser)->get();
        return response()->json($userRecipts);
    }

    public function getOrderHistory()
    {
        $user = Auth::user();

        $orders = Order::where('idUser', $user->id)->with('subject')->orderBy('created_at', 'desc')->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'idUser' => 'required|exists:users,id',
            'items' => 'required|array',
            'items.*.idSubject' => 'required|exists:subjects,id',
            'items.*.price' => 'required|numeric',
            'items.*.quantity' => 'required|integer',
            'payment_method' => 'required|string',
            'payment_status' => 'required|string',
            //'orderID' => 'required|string',
        ]);

        $totalPrice = 0;
        foreach ($validatedData['items'] as $item) {
            $totalPrice += $item['price'] * $item['quantity'];
            $subject = Subject::find($item['idSubject']);
            if ($subject) {
                Order::create([
                    'idUser' => $validatedData['idUser'],
                    'idSubject' => $item['idSubject'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'payment_method' => $validatedData['payment_method'],
                    'payment_status' => $validatedData['payment_status'],
                    //'orderID' => $validatedData['orderID'],
                ]);
            } else {
                return response()->json(['message' => 'Khóa học không khả dụng'], 400);
            }
        }
        /* $totalPrice = collect($validatedData['items'])->sum(fn ($item) => $item['price'] * $item['quantity']);
        $orders = collect($validatedData['items'])
            ->filter(fn ($item) => Subject::find($item['idSubject']))
            ->map(function ($item) use ($validatedData) {
                return [
                    'idUser' => $validatedData['idUser'],
                    'idSubject' => $item['idSubject'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'payment_method' => $validatedData['payment_method'],
                    'payment_status' => $validatedData['payment_status'],
                ];
            })->toArray();

        if ($orders->isEmpty()) {
            return response()->json(['message' => 'Khóa học không khả dụng'], 400);
        } */

        //Order::insert($orders);
        $user = User::find($validatedData['idUser']);
        $user->role = "Student";
        $user->save();

        return response()->json([
            'message' => 'Đơn hàng tạo thành công',
            //'orderID' => $validatedData['orderID'],
            //'total_price' => $totalPrice,
        ], 201);
    }

    /*     public function totalPrice()
    {
        $total = Order::sum(DB::raw('price * quantity'));
        $lastUpdatedPrice = Order::latest()->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdatePrice = date('d/m/Y H:i:s', strtotime($lastUpdatedPrice));

        return response()->json([
            'total' => $total,
            'lastUpdatedPrice' => $formattedLastUpdatePrice
        ]);
    }
 */
    public function getOrderUser()
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'Vui lòng đăng nhập để xem môn học đã đăng ký']);
        }

        $user = Auth::user();

        $orders = Order::where('idUser', $user->id)->with(['subject',])->get();

        $orders->each(function ($order) {
            $subject = $order->subject;
            $schedule = Schedule::where('idSubject', $subject->id)->first();
            $order->isScheduled = $schedule ? true : false;
        });

        return response()->json($orders);
    }
}
