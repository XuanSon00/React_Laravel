<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class PasswordResetController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thông tin không hợp lệ',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Không thể tìm thấy người dùng có email này.',
            ], 404);
        }

        //$response = Password::broker()->sendResetLink($request->only('email'));

        //Log::info('Password reset link response: ' . $response);
        $response = Password::sendResetLink($request->only('email'));
        if ($response == Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Chúng tôi đã gửi email liên kết đặt lại mật khẩu của bạn!',
            ]);
        } else {
            return response()->json([
                'message' => 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
            ], 500);
        }
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Thông tin không hợp lệ',
                'errors' => $validator->errors(),
            ], 422);
        }

        $response = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            }
        );

        if ($response == Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Mật khẩu của bạn đã được đặt lại thành công!',
            ]);
        } else {
            return response()->json([
                'message' => 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
            ], 500);
        }
    }
}
