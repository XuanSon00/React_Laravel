<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    //lấy tất cả dữ liệu bảng User
    public function getAllUsers()
    {
        //$users = User::all();
        $users = User::paginate(20);

        return response()->json($users->items());
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user, 200);
    }

    /* public function store(Request $request)
    {
        $user = User::create($request->all());
        return response()->json($user, 201);
    } */

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->update($request->all());
        return response()->json($user, 200);
    }

    //chọn ra id Admin 
    public function getSuperAdmin()
    {
        $adminId = 14; //danh sách Admin(chính)

        $admin = User::find($adminId);

        return response()->json($admin);
    }
    //xóa
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted'], 200);
    }

    public function destroyAll()
    {

        $currentUser = Auth::user();
        $allowedIds = [14]; //danh sách Admin(chính)

        if ($currentUser->role === 'Admin' && $currentUser->id === in_array($currentUser->id, $allowedIds)) {
            User::where('role', '!=', 'Admin')->delete();

            return response()->json(['message' => 'Xóa tất cả người dùng không phải Admin thành công'], 200);
        } else if ($currentUser->role === 'Admin') {
            User::where('role', '!=', 'Admin')->delete();

            return response()->json(['message' => 'Xóa tất cả người dùng không phải Admin thành công'], 200);
        }
    }
    /*     //Tổng số tài khoản
    public function totalUser()
    {
        $totalUsers = User::count();
        $lastUpdatedUser = User::latest()->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdateTeacher = date('d/m/Y H:i:s', strtotime($lastUpdatedUser));

        return response()->json([
            'totalUsers' => $totalUsers,
            'lastUpdatedUser' => $formattedLastUpdateTeacher
        ]);
    }
 */
    //lấy ra cột role giá trị = "Teacher"
    public function getTeachers()
    {
        $teachers = User::where('role', 'Teacher')->get(); // Lấy tất cả các giảng viên
        return response()->json($teachers);
    }

    /* // tổng người dùng có role = "Student"
    public function totalStudent()
    {
        $totalStudents = User::where('role', 'Student')->count();
        $lastUpdatedStudent = User::where('role', 'Student')->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdateStudent = date('d/m/Y H:i:s', strtotime($lastUpdatedStudent));
        return response()->json([
            'totalStudents' => $totalStudents,
            'lastUpdatedStudent' => $formattedLastUpdateStudent
        ]);
    }
     */
    /* 
    // tổng người dùng có role = "Teacher"
    public function totalTeacher()
    {
        $totalTeachers = User::where('role', 'Teacher')->count();
        $lastUpdatedTeacher = User::where('role', 'Teacher')->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdateTeacher = date('d/m/Y H:i:s', strtotime($lastUpdatedTeacher));

        return response()->json([
            'totalTeachers' => $totalTeachers,
            'lastUpdatedTeacher' => $formattedLastUpdateTeacher
        ]);
    } */

    //người dùng đăng nhập hiện tại
    public function getCurrentUser(Request $request)
    {
        if (!$request->user()) {
            return response()->json(['message' => '', 401]);
        }

        return response()->json($request->user());
    }
}
