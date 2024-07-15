<?php

namespace App\Http\Controllers;

use App\Models\EducationType;
use Illuminate\Http\Request;

class EduTypeController extends Controller
{
    public function index()
    {
        return response()->json(EducationType::all(), 200);
    }

    public function store(Request $request)
    {
        $eduType = EducationType::create($request->all());
        return response()->json($eduType, 201);
    }

    public function show($id)
    {
        $eduType = EducationType::find($id);
        if (!$eduType) {
            return response()->json(['message' => 'Education Type not found'], 404);
        }
        return response()->json($eduType, 200);
    }

    public function update(Request $request, $id)
    {
        $eduType = EducationType::find($id);
        if (!$eduType) {
            return response()->json(['message' => 'Education Type not found'], 404);
        }
        $eduType->update($request->all());
        return response()->json($eduType, 200);
    }

    public function destroy($id)
    {
        $eduType = EducationType::find($id);
        if (!$eduType) {
            return response()->json(['message' => 'EducationType not found'], 404);
        }
        $eduType->delete();
        return response()->json(['message' => 'EducationType  deleted'], 200);
    }

    public function destroyAll()
    {
        EducationType::truncate();
        return response()->json(['message' => 'All EducationType  deleted'], 200);
    }
}
