"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

interface MyJwtPayload extends JwtPayload {
  role: String;
}

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [identifier, setIdentifier] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("https://civic-voice-tiv6.vercel.app/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.error);
        return;
      }

      localStorage.setItem("token", data.token);

      const decoded = jwtDecode<MyJwtPayload>(data.token);
      const role = decoded.role;

      if (role.toLowerCase() === 'user')
        router.push("/UserDashBoard");
      else if (role.toLowerCase() === 'admin')
        router.push("/AdminDashBoard");

    } catch (error) {
      console.log(error);
      alert("something went wrong!");
    }
  }

  return (
    <div className=" p-4 dark:text-white dark:bg-gray-800 rounded-lg shadow-md md:w-2/6 w-5/6 mx-auto mt-2">
      <h2 className="dark:text-white text-3xl text-center font-semibold">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col mt-4">
        <label htmlFor="username" className="mb-2 text-xl font-semibold
        ">Username or Email</label>
        <input placeholder="Enter your username or email" className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4" type="text" name="username" id="username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />

        <label htmlFor="password" className="mb-2 text-xl font-semibold
        ">Password</label>
        <input placeholder="Enter your Password" className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit" className="bg-orange-500 hover:bg-orange-600 rounded-md cursor-pointer px-4 py-2 font-semibold text-center text-white text-xl shadow-md">Login</button>

        <p className="text-center mt-2">Don't have an account?? <Link href="/SignUp" className="text-blue-600 font-semibold">SignUp!</Link></p>

        {/* Demo credentials */}
        <div className="flex gap-5 content-center text-gray-400 text-sm mt-3 mx-auto">
          <div className="border p-3 rounded">
            <p className="font-semibold">Admin Account</p>
            <p>Username: <span>admin</span></p>
            <p>Password: <span className="italic">12345678</span></p>
          </div>

          <div className="border p-3 rounded">
            <p className="font-semibold">User Account</p>
            <p>Username: <span>user1</span></p>
            <p>Password: <span className="italic">12345678</span></p>
          </div>
        </div>

      </form>
    </div>
  );
};

export default LoginPage;
