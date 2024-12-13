
"use client";
import React, { useState } from 'react';


export default function LoginPage() {
    
    const [form, setForm]=useState({
        Email:"",
        Password:"",
    })
    const submitHandler=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        console.log(form);

    }

    const changeHandler=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target;
        setForm((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login Up</h2>
                <form onSubmit={submitHandler}  className="space-y-4" >
                <div>
                    <label htmlFor="email"  className="block text-sm font-semibold text-gray-700 mb-1" >Email: </label>
                    <input
                    type="text"
                    placeholder="Enter Email"
                    value={form.Email}
                    name='Email'
                    onChange={changeHandler}
                     className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"

                     />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">Password: </label>
                    <input
                    type="Password"
                    name='Password'
                    value={form.Password}
                    placeholder="Enter Password "
                    onChange={changeHandler}
                     className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                     />
                </div>
                <div>
                    <button  type="submit"   className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600">Login</button>
                </div>
                </form>
            </div>
        </div>
    );
}
