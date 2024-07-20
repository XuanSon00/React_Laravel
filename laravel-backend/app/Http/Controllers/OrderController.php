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
    public function index()
    {
        $lesson = Order::with('user', 'subject')->get();

        return response()->json($lesson);
    }

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
        /* $totalPrice = 0;
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
 */
        $subjectIds = collect($validatedData['items'])->pluck('idSubject');
        $subjects = Subject::findMany($subjectIds);

        // Tạo dữ liệu cho các đơn hàng từ items và subjects
        $orderData = collect($validatedData['items'])->map(function ($item) use ($subjects, $validatedData) {
            $subject = $subjects->firstWhere('id', $item['idSubject']);
            return [
                'idUser' => $validatedData['idUser'],
                'idSubject' => $item['idSubject'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
                'payment_method' => $validatedData['payment_method'],
                'payment_status' => $validatedData['payment_status'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        })->toArray();

        Order::insert($orderData);

        // Cập nhật vai trò của người dùng thành "Student"
        User::where('id', $validatedData['idUser'])->update(['role' => 'Student']);

        return response()->json(['message' => 'Đơn hàng tạo thành công'], 201);
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
