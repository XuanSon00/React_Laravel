<?php

namespace App\Http\Controllers;

use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Models\Subject;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class SubjectController extends Controller
{
    public function index(Request $request)
    {
        $grade = $request->query('grade');
        $searchTerm = $request->query('searchTerm', '');

        $query = Subject::with('educationType');

        if ($grade) {
            $query->where('grade', $grade);
        }

        if ($searchTerm) {
            $query->where('name', 'LIKE', "%$searchTerm%");
        }

        $subjects = $query->paginate(10);
        return response()->json($subjects);
    }

    public function indexData()
    {
        $subjects = Subject::with('educationType')->get();

        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'active' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'max_students' => 'required|integer',
            'idEducationType' => 'required|exists:education_types,id'
        ]);

        $subject = Subject::create($validatedData);
        return response()->json($subject, 201);
    }

    public function show($id)
    {
        $subject = Subject::with('educationType',)->findOrFail($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được khóa học'], 404);
        }
        return response()->json($subject);
    }

    public function update(Request $request, $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'không tìm được môn học'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'active' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
            'max_students' => 'required|integer',
            'idEducationType' => 'required|exists:education_types,id'
        ]);

        $subject->update($validatedData);
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
    /*     public function totalSubject()
    {
        $totalSubjects = Subject::count();
        $lastUpdatedSubject = Subject::latest()->orderBy('updated_at', 'desc')->first()->updated_at;
        $formattedLastUpdateTeacher = date('d/m/Y H:i:s', strtotime($lastUpdatedSubject));

        return response()->json([
            'totalSubjects' => $totalSubjects,
            'lastUpdatedSubject' => $formattedLastUpdateTeacher
        ]);
    }
 */
    public function checkOnlineEnrollment($id)
    {
        $user = Auth::user();
        $subjectId = $id;

        // Kiểm tra user đã đăng ký lớp học với education_type là "Online"
        $isEnrolled = Enrollment::where('idUser', $user->id)
            ->whereHas('subject.educationType', function ($query) {
                $query->where('type', 'Online');
            })
            ->where('idSubject', $subjectId)
            ->exists();

        if (!$isEnrolled) {
            return response()->json(['message' => 'Bạn không có quyền truy cập.'], 403);
        }

        return response()->json(['message' => 'Bạn có quyền truy cập.'], 200);
    }
}
