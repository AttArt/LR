<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     //
    //     return User::select('iduser', 'name', 'dept')->orderBy('iduser', 'asc')->get();

    // }

    public function index(Request $request)
    {
        //
        $page = $request->query('page');
        $perPage = $request->query('per_page');
        $search = $request->query('search');

        if($page) {
           
            $page =  ( $page - 1 ) * $perPage;

            if($search == "nosearch") {
                $User = User::select('iduser', 'name', 'dept')->orderBy('iduser', 'asc')->skip($page)->take($perPage)->get();
                $Usertotal = User::count();
                return response()->json(['data'=> $User,'total'=>$Usertotal]);
            }
            // $User = User::select('iduser', 'name', 'dept')->orderBy('iduser', 'asc')->skip($page)->take($perPage)->get();

            $User = User::whereRaw('LOWER(iduser) LIKE ?', ["%".strtolower($search)."%"])
            ->orWhereRaw('LOWER(name) LIKE ?', ["%".strtolower($search)."%"])
            ->orWhereRaw('LOWER(dept) LIKE ?',["%".strtolower($search)."%"])->orderBy('iduser', 'asc')->get();

            $Usertotal = count($User);
            $User = $User->skip($page)->take($perPage);
           
            return response()->json(['data'=> $User,'total'=>$Usertotal]);
        }

        $User = User::select('iduser', 'name', 'dept')->orderBy('iduser', 'asc')->get();
        $Usertotal = User::count();
        return response()->json(['data'=> $User,'total'=>$Usertotal]);
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($search)
    {
   
        // $userx = User::whereRaw('LOWER(iduser) LIKE ?', ["%".strtolower($search)."%"])
        //      ->orWhereRaw('LOWER(name) LIKE ?', ["%".strtolower($search)."%"])
        //      ->orWhereRaw('LOWER(dept) LIKE ?',["%".strtolower($search)."%"])
        //      ->get();

        // return response()->json(['data'=> $userx]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
