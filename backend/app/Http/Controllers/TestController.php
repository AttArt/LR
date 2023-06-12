<?php

namespace App\Http\Controllers;

use App\Models\test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return test::select('idtest', 'name')->get();

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        //
        $page = $request->input('page', 1); // รับค่า parameter 'page' หากไม่ระบุให้เป็นค่าเริ่มต้น 1
        echo ($page);
        // $perPage = $request->input('per_page', 1); // รับค่า parameter 'per_page' หากไม่ระบุให้เป็นค่าเริ่มต้น 10
        // $delay = $request->input('delay', 1); // รับค่า parameter 'delay' หากไม่ระบุให้เป็นค่าเริ่มต้น 1

        // // 
        // sleep($delay); // หน่วงเวลาตามค่า parameter 'delay'

        // $tests = test::paginate($perPage, ['*'], 'page', $page); // ดึงข้อมูลผู้ใช้โดยใช้การแบ่งหน้า

        // return response()->json(['tests' => $tests]);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function edit(test $test)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, test $test)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\test  $test
     * @return \Illuminate\Http\Response
     */
    public function destroy(test $test)
    {
        //
    }
}
