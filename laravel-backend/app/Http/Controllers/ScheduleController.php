<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\Order;
use Illuminate\Http\Request;
use App\Models\Schedule;
use App\Models\Subject;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ScheduleController extends Controller
{
    public function index()
    {
        $schedules = Schedule::with('subject.educationType', 'teacher')
            ->whereHas('subject.educationType', function ($query) {
                $query->where('type', 'Online');
            })
            ->get();

        return response()->json($schedules);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'idSubject' => 'required|exists:subjects,id',
            //'grade' => 'required',
            'startTime' => 'required',
            'endTime' => 'required',
            'idTeacher' => 'required|exists:users,id',
            'schedule' => 'required',
        ]);

        $subject = Subject::findOrFail($validatedData['idSubject']);
        $validatedData['available_seats'] = $subject->max_students;

        $schedule = Schedule::create($validatedData);

        return response()->json($schedule);
    }


    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'idSubject' => [
                'required',
                Rule::exists('subjects', 'id')->where(function ($query) {
                    $query->where('id', request()->input('idSubject'));
                }),
            ],
            'idTeacher' => [
                'required',
                Rule::exists('users', 'id')->where(function ($query) {
                    $query->where('id', request()->input('idTeacher'));
                }),
            ],
            //'grade' => 'required',
            'startTime' => 'required',
            'endTime' => 'required',
            'schedule' => 'required',
            'available_seats' => 'required|integer|min:0',

        ]);

        $schedule = Schedule::findOrFail($id);
        $schedule->update($validatedData);

        return response()->json(['message' => 'Schedule updated successfully']);
    }

    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if ($schedule) {
            $schedule->delete();
            return response()->json(['message' => 'Lịch giảng dạy  được xóa thành công.']);
        } else {
            return response()->json(['message' => 'Không tìm thấy lịch giảng dạy.'], 404);
        }
    }

    public function destroyAll()
    {
        Schedule::truncate();
        return response()->json(['message' => 'Schedule deleted'], 200);
    }

    public function getScheduleTeacher()
    {
        $user = Auth::user();

        $schedules = Schedule::where('idTeacher', $user->id)->with('subject')->get(['grade', 'startTime', 'endTime', 'schedule', 'idSubject']);

        return response()->json($schedules);
    }

    public function getStudentsBySchedule($idSchedule)
    {
        $user = Auth::user();

        $schedule = Schedule::where('id', $idSchedule)->where('idTeacher', $user->id)->first();

        if (!$schedule) {
            return response()->json(['error' => 'không tìm được lịch '], 404);
        }

        // Lấy danh sách học sinh từ bảng enrollments
        $students = Enrollment::where('idSchedule', $idSchedule)->join('users', 'enrollments.idUser', '=', 'users.id')
            ->select('users.id', 'users.name', 'users.email')->get();

        return response()->json($students);
    }

    public function getStudentsScheduleList()
    {
        $user = Auth::user();
        $schedules = Schedule::where('idTeacher', $user->id)->with('subject', 'teacher')->get(); // lấy ra dữ liệu 2 bảng
        return response()->json($schedules, 200);
    }
}
