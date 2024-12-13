"use client";
import React, { useState } from 'react';
// import { useRouter } from 'next/router';

export default function SignupPage() {
    const [users, setUsers] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Password: "",
        Compassword: "",
        User: ""
    });
    // const router = useRouter(); 

    const [error, setError] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Password: "",
        Compassword: "",
        User: "",
    });
    const [formIsValid, setFormIsValid] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(users);
        // router.push('/login');
    };

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let valid = true;

        
        const newError = { ...error };

        if (name === "FirstName") {
            if (!/^[A-Za-z]+$/.test(value)) {
                newError.FirstName = "First name must contain only letters.";
                valid = false;
            } else {
                newError.FirstName = "";
            }
        }

        if (name === "LastName") {
            if (!/^[A-Za-z]+$/.test(value)) {
                newError.LastName = "Last name must contain only letters.";
                valid = false;
            } else {
                newError.LastName = "";
            }
        }

        if (name === "PhoneNo") {
            if (!/^[0-9]{10}$/.test(value)) {
                newError.PhoneNo = "Phone number must contain only digits.";
                valid = false;
            } else {
                newError.PhoneNo = "";
            }
        }

        if (name === "Compassword") {
            if (value !== users.Password) {
                newError.Compassword = "Passwords do not match.";
                valid = false;
            } else {
                newError.Compassword = "";
            }
        }


        setError(newError);
        setFormIsValid(valid);


        setUsers((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-8">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <div className='flex'>
                        <fieldset>


                            <legend className="text-sm font-semibold text-gray-700 mb-2">Select User Type</legend>

                            <div>
                                <input
                                    type="radio"
                                    id="student"
                                    name="User"
                                    value="Student"
                                    checked={users.User === "Student"}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="teacher" className="ml-2 text-sm text-black">Student</label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    id="teacher"
                                    name="User"
                                    value="Teacher"
                                    checked={users.User === "Teacher"}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="teacher" className="ml-2 text-sm text-black">Teacher</label>
                            </div>
                            {error.User && <p className="text-red-600 text-xs mt-1">{error.User}</p>}
                        </fieldset>



                    </div>
                    <div>
                        <label htmlFor="fName" className="block text-sm font-semibold text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="fName"
                            value={users.FirstName}
                            name="FirstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                            required
                        />
                        {error.FirstName && <p className="text-red-600 text-xs mt-1">{error.FirstName}</p>}
                    </div>

                    <div>
                        <label htmlFor="LName" className="block text-sm font-semibold text-gray-700">Last Name</label>
                        <input
                            type="text"
                            id="lName"
                            name="LastName"
                            value={users.LastName}
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                        />
                        {error.LastName && <p className="text-red-600 text-xs mt-1">{error.LastName}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="Email"
                            value={users.Email}
                            onChange={changeHandler}
                            placeholder="Enter Email Id"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone No</label>
                        <input
                            type="text"
                            id="phone"
                            name="PhoneNo"
                            value={users.PhoneNo}
                            onChange={changeHandler}
                            placeholder="Enter Phone Number"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                            maxLength={10}
                            minLength={10}
                            required
                        />
                        {error.PhoneNo && <p className="text-red-600 text-xs mt-1">{error.PhoneNo}</p>}
                    </div>

                    <div>
                        <label htmlFor="pass" className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="pass"
                            name="Password"
                            value={users.Password}
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="cpass" className="block text-sm font-semibold text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="cpass"
                            name="Compassword"
                            value={users.Compassword}
                            onChange={changeHandler}
                            placeholder="Enter Confirm Password"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                            required
                        />
                        {error.Compassword && <p className="text-red-600 text-xs mt-1">{error.Compassword}</p>}
                    </div>

                    <div>
                        <button
                            type="submit"
                            // className="mt-4 bg-blue-600 text-white py-2 rounded-md w-full hover:bg-blue-700 transition"
                            disabled={!formIsValid} // Disable the submit button if form is not valid
                            className={`mt-4 py-2 rounded-md w-full transition ${formIsValid
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
