<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LessonController extends Controller
{
    public function index()
    {
        $lesson = Lesson::with('subject')->get();

        return response()->json($lesson);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'idSubject' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'video_url' => 'required|file|mimes:mp4,avi,mov|max:20480',
            'content' => 'required|string|max:255',
        ]);

        // xử lý upload video
        if ($request->hasFile('video_url')) {
            $videoFile = $request->file('video_url');
            $videoName = $videoFile->getClientOriginalName(); // lấy tên file gốc
            $videoPath = $videoFile->storeAs('videos', $videoName, 'public'); // lưu video với tên gốc
            //$validatedData['video_url'] = asset('storage/videos/' . $videoName);
            $validatedData['video_url'] = $videoName;
        }


        $lesson = Lesson::create($validatedData);
        //$lesson->video_url = asset('storage/' . $lesson->video_url);

        return response()->json($lesson, 201);
    }

    public function show($id)
    {
        $subject = Subject::with('lessons', 'educationType')->findOrFail($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được bài học'], 404);
        }
        foreach ($subject->lessons as $lesson) {
            //$lesson->video_url = public_path('videos/' . $lesson->video_url);
            $lesson->video_url = asset('storage/videos') . '/' . $lesson->video_url;
        }
        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'idSubject' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'video_url' => 'nullable|file|mimes:mp4,avi,mov|max:20480', // video_url là không bắt buộc
            'content' => 'required|string|max:255',
        ]);

        $lesson = Lesson::findOrFail($id);

        // Xử lý upload video nếu có file mới
        if ($request->hasFile('video_url')) {
            // Xóa video cũ nếu có
            if ($lesson->video_url && file_exists(public_path('storage/' . $lesson->video_url))) {
                unlink(public_path('storage/' . $lesson->video_url));
            }

            $videoFile = $request->file('video_url');
            $videoName = $videoFile->getClientOriginalName(); // lấy tên file gốc
            $videoPath = $videoFile->storeAs('videos', $videoName, 'public'); // lưu video với tên gốc
            $validatedData['video_url'] = $videoName; // lưu tên file vào cơ sở dữ liệu
        } else {
            $validatedData['video_url'] = $lesson->video_url; // nếu không có video mới, giữ nguyên video cũ
        }

        // cập nhật thông tin bài học
        $lesson->update($validatedData);
        $lesson->video_url = asset('storage/' . $lesson->video_url);

        return response()->json($lesson, 200);
    }

    public function destroy($id)
    {
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return response()->json(['message' => 'không tìm được bài học'], 404);
        }
        $lesson->delete();
        return response()->json(['message' => 'Đã xóa bài học'], 200);
    }

    public function destroyAll()
    {
        Lesson::truncate();
        return response()->json(['message' => 'Đã xóa tất cả bài học'], 200);
    }
}
