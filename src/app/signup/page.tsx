"use client";


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiVim } from 'react-icons/di';
export default function SignupPage() {
    const router = useRouter();



    const countryCodes = [
        { code: '+91', name: 'India', flag: '🇮🇳', phoneLength: 10 },
        { code: '+1', name: 'United States', flag: '🇺🇸', phoneLength: 10 },
        { code: '+44', name: 'United Kingdom', flag: '🇬🇧', phoneLength: 10 },
        { code: '+61', name: 'Australia', flag: '🇦🇺', phoneLength: 9 },
        { code: '+81', name: 'Japan', flag: '🇯🇵', phoneLength: 11 },
        { code: '+33', name: 'France', flag: '🇫🇷', phoneLength: 10 },
        { code: '+49', name: 'Germany', flag: '🇩🇪', phoneLength: 11 },
        { code: '+55', name: 'Brazil', flag: '🇧🇷', phoneLength: 11 },
        { code: '+34', name: 'Spain', flag: '🇪🇸', phoneLength: 9 },
        { code: '+86', name: 'China', flag: '🇨🇳', phoneLength: 11 },
    ];



    const [users, setUsers] = useState({
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Password: "",
        Compassword: "",
        User: "",
        CountryCode:"+91"
    });

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


    const [dataDisplay, setDataDisplay]= useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(users);
        alert("Your account has been Created")
        setDataDisplay(true);
        // router.push('/login');

    };

    var valid = true;
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


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
            let selectedCountry = countryCodes.find((country) => country.code === users.CountryCode);
            let phoneLength = selectedCountry ? selectedCountry.phoneLength : 10;
            const phoneRegex = new RegExp(`^[0-9]{${phoneLength}}$`);
            if (!phoneRegex.test(value)) {
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


        // setUsers((prevUser) => ({
        //     ...prevUser,
            
        //     [name]: value,
        // }));
        const regex = /^[A-Za-z]*$/;
        const pregex = /^[+]?[0-9]*$/;
        if(name==="FirstName" && regex.test(value)){

            setUsers((prevUser) => ({
                ...prevUser,
                
                FirstName: value,
            }));
        }else if(name==="LastName" && regex.test(value)){

            setUsers((prevUser) => ({
                ...prevUser,
                
                LastName: value,
            }));
        }else if(name==="PhoneNo" && pregex.test(value)){
            setUsers((prevUser) => ({
                ...prevUser,
                
                PhoneNo: value,
            }));

        }else if(name==="Email"  || name==="Compassword" || name==="Password"|| name==="User"){
            setUsers((prevUser) => ({
            ...prevUser,
            
            [name]: value,
        }));
        }
        
    };


    const handleCountryCodeChange =(event: React.ChangeEvent<HTMLSelectElement>)=>{
        const newCountryCode = event.target.value;
        setUsers((prevUser) => ({
            ...prevUser,
            CountryCode: newCountryCode,
        }));
    }
    const selectedCountry = countryCodes.find((country)=> country.code===users.CountryCode);
    const phoneLength = selectedCountry ? selectedCountry.phoneLength :10;

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
                                    required
                                />
                                <label htmlFor="teacher" className="ml-2 text-sm text-black">Teacher</label>
                            </div>
                            {error.User && <p className="text-red-600 text-xs mt-1">{error.User}</p>}
                        </fieldset>



                    </div>
                    {/* first name */}
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
                    {/* last name */}
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
                    {/* email */}
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


                    {/* phone number  */}


                    <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">Phone No</label>
                        <div className='flex '>
                            <div className="flex items-center border border-gray-300 rounded-md bg-white">
                                <select
                                    id="country-code"
                                    name="countryCode"
                                    value={users.CountryCode}
                                    onChange={handleCountryCodeChange}
                                    className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                  {countryCodes.map((data,id)=>(
                                    <option key={id} value={data.code}>{data.flag}   {data.code}</option>
                                  ))}
                                </select>
                            </div>
                            <input
                                type="text"
                                id="phone"
                                name="PhoneNo"
                                value={users.PhoneNo}
                                onChange={changeHandler}
                                placeholder="Enter Phone Number"
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-black"
                                maxLength={phoneLength}
                                minLength={phoneLength}
                                required
                            />
                        </div>
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
                {
                    dataDisplay?
                    (
                        <div className='mt-4'>
                            <div className='text-black'>User Type : {users.User}</div>
                            <div className='text-black'>First Name : {users.FirstName}</div>
                            <div className='text-black'>Last Name : {users.LastName}</div>
                            <div className='text-black'>Email : {users.Email}</div>
                            <div className='text-black'>Country Code : {users.CountryCode}</div>
                            <div className='text-black'>Phone No : {users.PhoneNo}</div>
                            <div className='text-black'>Password : {users.Password}</div>
                            <div className='text-black'>Confirm Password : {users.Compassword}</div>
                        </div>
                    ) : 
                    (
                        <div className='bg-red-800, text-black'>This is space for form Data</div>
                    )
                }
            </div>
        </div>
    );
}
