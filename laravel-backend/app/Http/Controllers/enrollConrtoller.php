<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Order;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class enrollConrtoller extends Controller
{
    public function index()
    {
        $enrollment = Enrollment::with('schedule', 'subject', 'user',)->get();
        return response()->json($enrollment, 200);
    }

    public function totalEnroll($idUser)
    {
        $count = Enrollment::where('idUser', $idUser)->count();
        return response()->json(['totalEnrollment' => $count]);
    }

    public function store(Request $request)
    {
        $order = Order::where('idUser', $request->idUser)->where('idSubject', $request->idSubject)->first();

        if (!$order) {
            return response()->json(['message' => 'Bạn chưa mua khóa học này'], 403);
        }
        $existingEnrollment = Enrollment::where('idSchedule', $request->idSchedule)->where('idUser', $request->idUser)->first();

        if ($existingEnrollment) {
            return response()->json(['message' => 'Bạn đã đăng ký lớp học này rồi'], 409);
        }

        $validatedData = $request->validate([
            'idSubject' => 'required|exists:subjects,id',
            'idUser' => 'required|exists:users,id',
            'idSchedule' => 'required|exists:schedules,id',
        ]);

        // Tìm và cập nhật số lượng available_seats
        $schedule = Schedule::findOrFail($request->idSchedule);

        if ($schedule->available_seats > 0) {
            $schedule->available_seats -= 1;
            $schedule->save();
        } else {
            return response()->json(['message' => 'Lớp học đã đầy, không thể đăng ký thêm học viên'], 409);
        }

        $enrollment = Enrollment::create($validatedData);

        return response()->json($enrollment);
    }

    public function destroy($id)
    {
        $enrollment = Enrollment::find($id);
        if ($enrollment) {
            $enrollment->delete();
            return response()->json(['message' => 'xóa người đăng ký xóa thành công.']);
        } else {
            return response()->json(['message' => 'Không tìm thấy lớp giảng dạy.'], 404);
        }
    }

    public function destroyAll()
    {
        Enrollment::truncate();
        return response()->json(['message' => 'Enrollment deleted'], 200);
    }
}
