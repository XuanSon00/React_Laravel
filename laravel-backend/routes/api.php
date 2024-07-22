<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EduTypeController;
use App\Http\Controllers\enrollConrtoller;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Đăng ký-Đăng nhập
Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});
Route::post('/register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
//quên mật khẩu
Route::post('password/email', [PasswordResetController::class, 'sendResetLinkEmail'])->name('password.email');
Route::post('/password/reset', [PasswordResetController::class, 'resetPassword'])->name('password.reset');
//Khóa học
Route::get('/subjects', [SubjectController::class, 'index']); //trang home
//chi tiết khóa học
Route::get('/subjects/{id}', [SubjectController::class, 'show']);

//Middleware login
Route::group(['middleware' => 'auth:api'], function () {
    //Khóa học
    Route::get('/subject', [SubjectController::class, 'indexData']); //admin
    Route::post('/subjects', [SubjectController::class, 'store']);
    Route::put('/subjects/{id}', [SubjectController::class, 'update']);
    Route::delete('subjects/{id}', [SubjectController::class, 'destroy']);
    Route::delete('subjects', [SubjectController::class, 'destroyAll']);
    //Route::get('/total-subjects', [SubjectController::class, 'totalSubject']);
    Route::get('/online-subjects/{id}', [SubjectController::class, 'checkOnlineEnrollment']);
    //vai trò
    Route::get('/roles', [RoleController::class, 'index']);
    Route::post('/roles', [RoleController::class, 'store']);
    Route::put('/roles/{id}', [RoleController::class, 'update']);
    Route::delete('roles/{id}', [RoleController::class, 'destroy']);
    Route::delete('roles', [RoleController::class, 'destroyAll']);
    //loại hình giáo dục
    Route::get('/educations', [EduTypeController::class, 'index']);
    Route::post('/educations', [EduTypeController::class, 'store']);
    Route::put('/educations/{id}', [EduTypeController::class, 'update']);
    Route::delete('educations/{id}', [EduTypeController::class, 'destroy']);
    Route::delete('educations', [EduTypeController::class, 'destroyAll']);
    //Người dùng
    Route::get('/users', [UserController::class, 'getAllUsers']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::delete('/users', [UserController::class, 'destroyAll']);
    //Route::get('/total-users', [UserController::class, 'totalUser']); //lấy ra tổng số người dùng
    //Route::get('/totalStudents', [UserController::class, 'totalStudent']); // lấy ra tổng số người dùng là "Student"
    //Route::get('/totalTeachers', [UserController::class, 'totalTeacher']); // lấy ra tổng số người dùng là "Teacher"
    Route::get('/getTeachers', [UserController::class, 'getTeachers']); // lấy ra người dùng là "Teacher"
    Route::get('/user', [UserController::class, 'getCurrentUser']); //thông tin người dùng đăng nhập
    //lịch
    Route::get('/schedules', [ScheduleController::class, 'index']);
    Route::get('/classOnline', [ScheduleController::class, 'classOnline']);
    Route::get('/schedule/students', [ScheduleController::class, 'getStudentsScheduleList']);
    Route::post('/schedules', [ScheduleController::class, 'store']);
    Route::put('/schedules/{id}', [ScheduleController::class, 'update']);
    Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);
    Route::delete('schedules', [ScheduleController::class, 'destroyAll']);
    Route::get('/getScheduleTeacher', [ScheduleController::class, 'getScheduleTeacher']); // lấy lịch giảng dạy 
    Route::get('/teacher/students/{idSchedule}', [ScheduleController::class, 'getStudentsBySchedule']); //lấy danh sách học sinh
    //lịch sử thanh toán
    Route::get('/orders/history', [OrderController::class, 'getOrderHistory']);
    //hóa đơn
    Route::get('/order/recipt', [OrderController::class, 'getCurrentRecipts']);
    Route::get('/recipt', [OrderController::class, 'index']);
    //Đăng ký lớp học
    Route::post('/enroll', [enrollConrtoller::class, 'store']);
    Route::get('/enroll', [enrollConrtoller::class, 'index']);
    Route::delete('/enroll/{id}', [enrollConrtoller::class, 'destroy']);
    Route::delete('enroll', [enrollConrtoller::class, 'destroyAll']);
    //lớp học đăng ký
    Route::get('/totalEnroll/{idUser}', [enrollConrtoller::class, 'totalEnroll']);
    Route::get('/ordersUser', [OrderController::class, 'getOrderUser']);
    //bài học
    Route::get('/lessons', [LessonController::class, 'index']);
    Route::post('/lessons', [LessonController::class, 'store']);
    Route::put('/lessons/{id}', [LessonController::class, 'update']);
    Route::delete('/lessons/{id}', [LessonController::class, 'destroy']);
    //chi tiết lớp học(online)
    Route::get('/online/subjects/{id}', [LessonController::class, 'show']);
    //thông tin dashboard
    Route::get('/dashboard-data', [DashboardController::class, 'getDashboardData']);
    //chọn ra id admin-super
    Route::get('/admin/super-admins', [UserController::class, 'getSuperAdmin']);

    Route::get('/totalTeacher', [DashboardController::class, 'totalTeacher']);
});

//thanh toán(paypal)
Route::post('/orders', [OrderController::class, 'store']);
/* Route::get('/search-subjects', [SubjectController::class, 'search']);
 */