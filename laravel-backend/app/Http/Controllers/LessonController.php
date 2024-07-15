<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Subject;
use Illuminate\Http\Request;

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
            'video_url' => 'required|string|max:255',
            'content' => 'required|string|max:255',
        ]);

        $lesson = Lesson::create($validatedData);
        return response()->json($lesson, 201);
    }

    public function show($id)
    {
        $subject = Subject::with('lessons', 'educationType')->findOrFail($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được bài học'], 404);
        }
        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $lesson = Lesson::find($id);
        if (!$lesson) {
            return response()->json(['message' => 'không tìm được bài học'], 404);
        }

        $validatedData = $request->validate([
            'idSubject' => 'required|exists:subjects,id',
            'title' => 'required|string|max:255',
            'video_url' => 'required|string|max:255',
            'content' => 'string|max:255',
        ]);

        $lesson->update($validatedData);
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
