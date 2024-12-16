"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    Email: "",
    Password: "",
  });

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    alert("You are logged in");
  };

  // Focus states for both email and password inputs
  const [focus, setFocus] = useState({
    Email: false,
    Password: false,
  });

  const handleFocus = (field: string) => {
    setFocus((prevFocus) => ({
      ...prevFocus,
      [field]: true,
    }));
  };

  const handleBlur = (field: string) => {
    if (form[field] === "") {
      setFocus((prevFocus) => ({
        ...prevFocus,
        [field]: false,
      }));
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handlerScroll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent form submission
    router.push("/demo");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8 sm:px-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Email Field */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-black transition-all duration-300 pointer-events-none ${
                focus.Email || form.Email ? "top-2 text-sm text-blue-600" : ""
              }`}
            >
              Email:
            </label>
            <input
              type="email"
              value={form.Email}
              name="Email"
              onFocus={() => handleFocus("Email")}
              onBlur={() => handleBlur("Email")}
              onChange={changeHandler}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            <label
              htmlFor="password"
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-black transition-all duration-300 pointer-events-none ${
                focus.Password || form.Password ? "top-2 text-sm text-blue-600" : ""
              }`}
            >
              Password:
            </label>
            <input
              type="password"
              name="Password"
              value={form.Password}
              onChange={changeHandler}
              onFocus={() => handleFocus("Password")}
              onBlur={() => handleBlur("Password")}
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 text-black focus:ring-blue-600"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full mt-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Login
            </button>
          </div>
          <div>
            <button
              onClick={handlerScroll}
              className="w-full mt-4 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Scrolling Image
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
