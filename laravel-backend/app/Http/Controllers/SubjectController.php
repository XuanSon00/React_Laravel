<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;
use Illuminate\Http\Response;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        $subject = Subject::create($request->all());
        return response()->json($subject, 201);
    }

    public function show($id)
    {
        $subject = Subject::findOrFail($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được khóa học'], 404);
        }
        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được khóa học'], 404);
        }
        $subject->update($request->all());
        return response()->json($subject, 200);
    }

    public function destroy($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được khóa học'], 404);
        }
        $subject->delete();
        return response()->json(['message' => 'Đã xóa khóa học'], 200);
    }

    public function destroyAll()
    {
        Subject::truncate();
        return response()->json(['message' => 'Đã xóa tất cả khóa học'], 200);
    }
    // tổng số môn học
    public function totalSubject()
    {
        $totalSubjects = Subject::count();
        $lastUpdatedSubject = Subject::latest()->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdateTeacher = date('d/m/Y H:i:s', strtotime($lastUpdatedSubject));

        return response()->json([
            'totalSubjects' => $totalSubjects,
            'lastUpdatedSubject' => $formattedLastUpdateTeacher
        ]);
    }
    //tìm kiếm môn học
    /*     public function search(Request $request)
    {
        $query = $request->input('query');
        $subjects = Subject::where('name', 'LIKE', "%{$query}%")->get();
        return response()->json($subjects);
    }
 */
}
