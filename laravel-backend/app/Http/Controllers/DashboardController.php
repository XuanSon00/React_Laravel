<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    //Tổng số tài khoản
    public function totalUser()
    {
        $totalUsers = DB::table('users')
            ->join('roles', 'users.idRole', '=', 'roles.id')
            // ->where('roles.name', 'Student')
            ->count();

        $lastUpdatedUser = DB::table('users')
            ->join('roles', 'users.idRole', '=', 'roles.id')
            ->where('roles.name', 'Student')
            ->latest('users.updated_at')
            ->first()?->updated_at;

        $formattedLastUpdateUser = $lastUpdatedUser
            ? date('d/m/Y H:i:s', strtotime($lastUpdatedUser))
            : null;

        return [
            'totalUsers' => $totalUsers,
            'lastUpdatedUser' => $formattedLastUpdateUser,
        ];
    }
    //tổng số môn học
    public function totalSubject()
    {
        $totalSubjects = Subject::count();
        $lastUpdatedSubject = Subject::latest()->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdateTeacher = date('d/m/Y H:i:s', strtotime($lastUpdatedSubject));

        return [
            'totalSubjects' => $totalSubjects,
            'lastUpdatedSubject' => $formattedLastUpdateTeacher
        ];
    }
    // tổng người dùng có role = "Student"
    public function totalStudent()
    {
        $totalStudents = User::where('role', 'Student')->count();
        $lastUpdatedStudent = User::where('role', 'Student')->orderBy('updated_at', 'desc')->first()->updated_at ?? null;

        $formattedLastUpdateStudent = $lastUpdatedStudent ? date('d/m/Y H:i:s', strtotime($lastUpdatedStudent)) : null;
        return [
            'totalStudents' => $totalStudents,
            'lastUpdatedStudent' => $formattedLastUpdateStudent
        ];
    }
    // tổng người dùng có role = "Teacher"
    public function totalTeacher()
    {
        /* $totalTeachers = DB::table('users')
            ->join('roles', 'users.idRole', '=', 'roles.id')
            ->where('roles.name', 'Teacher')
            ->count();

        $lastUpdatedTeacher = DB::table('users')
            ->join('roles', 'users.idRole', '=', 'roles.id')
            ->where('roles.name', 'Teacher')
            ->latest('users.updated_at')
            ->first()?->updated_at ?? null; */

        $totalTeachers = User::where('role', 'Teacher')->count();
        $lastUpdatedTeacher = User::where('role', 'Teacher')->orderBy('updated_at', 'desc')->first()->updated_at ?? null;

        $formattedLastUpdateTeacher = $lastUpdatedTeacher
            ? date('d/m/Y H:i:s', strtotime($lastUpdatedTeacher))
            : null;

        return [
            'totalTeachers' => $totalTeachers,
            'lastUpdatedTeacher' => $formattedLastUpdateTeacher,
        ];
    }

    //tổng tiền đã thanh toán
    public function totalPrice()
    {
        $total = Order::sum(DB::raw('price * quantity'));

        $lastUpdatedPrice = Order::latest()->orderBy('updated_at', 'desc')->first()->updated_at ?? null;

        $formattedLastUpdatePrice = $lastUpdatedPrice ? date('d/m/Y H:i:s', strtotime($lastUpdatedPrice)) : null;

        return [
            'total' => $total,
            'lastUpdatedPrice' => $formattedLastUpdatePrice
        ];
    }


    public function getDashboardData()
    {
        $userData = $this->totalUser();
        $subjectData = $this->totalSubject();
        $studentData = $this->totalStudent();
        $teacherData = $this->totalTeacher();
        $priceData = $this->totalPrice();

        return response()->json([
            'totalUsers' => $userData['totalUsers'],
            'lastUpdatedUser' => $userData['lastUpdatedUser'],
            'totalSubjects' => $subjectData['totalSubjects'],
            'lastUpdatedSubject' => $subjectData['lastUpdatedSubject'],
            'totalStudents' => $studentData['totalStudents'],
            'lastUpdatedStudent' => $studentData['lastUpdatedStudent'],
            'totalTeachers' => $teacherData['totalTeachers'],
            'lastUpdatedTeacher' => $teacherData['lastUpdatedTeacher'],
            'totalPrice' => $priceData['total'],
            'lastUpdatedPrice' => $priceData['lastUpdatedPrice'],
        ]);
    }
}
