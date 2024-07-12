<?php

namespace App\Http\Controllers;

use App\Models\Lession;
use App\Models\Lesson;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LessionController extends Controller
{
    public function index()
    {

        $lession = Lession::with('subject')->get();
        return response()->json($lession);
    }

    public function store(Request $request)
    {
        $request->validate([
            'idSubject' => 'required|exists:subjects,id',
            'lession' => 'required|string|max:255',
        ]);

        $lession = Lession::create([
            'idSubject' => $request->idSubject,
            'lession' => $request->lession,
        ]);

        return response()->json($lession, 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'lession' => 'required|string|max:255',
        ]);

        $lession = Lession::findOrFail($id);
        $lession->update($request->all());

        return response()->json($lession, 200);
    }

    public function destroy($id)
    {
        $lession = Lession::findOrFail($id);
        $lession->delete();

        return response()->json(null, 204);
    }
}
