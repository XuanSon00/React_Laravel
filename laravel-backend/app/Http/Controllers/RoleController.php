<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index()
    {
        return response()->json(Role::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|integer|in:0,1'
        ]);

        $role = Role::create($validated);

        return response()->json($role, 201);
    }


    public function show($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        return response()->json($role, 200);
    }

    public function update(Request $request, $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        $role->update($request->all());
        return response()->json($role, 200);
    }

    public function destroy($id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role not found'], 404);
        }
        $role->delete();
        return response()->json(['message' => 'Role deleted'], 200);
    }

    public function destroyAll()
    {
        //Role::truncate();

        $nonAdminRole = Role::where('name', '!=', 'Admin')->get();

        foreach ($nonAdminRole as $role) {
            $role->delete();
        }
        return response()->json(['message' => 'All roles deleted'], 200);
    }
}
