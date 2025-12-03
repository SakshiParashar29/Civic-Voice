"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SignUp = () => {
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const router = useRouter();

  // Form fields state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  // Fetch states of India once
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "India" }),
    })
      .then((res) => res.json())
      .then((data) => {
        const stateNames = data.data.states.map((s: any) => s.name);
        setStates(stateNames);
      })
      .catch((err) => console.error(err));
  }, []);

  // Fetch cities when selectedState changes
  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      return;
    }

    fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        country: "India",
        state: selectedState,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCities(data.data);
        setSelectedCity(""); 
      })
      .catch((err) => console.error(err));
  }, [selectedState]);

  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !username ||
      !email ||
      !password ||
      !role ||
      !selectedState ||
      !selectedCity
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("https://civic-voice-tiv6.vercel.app/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role,
          state: selectedState,
          city: selectedCity,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "User already Present");
        return;
      }

      alert("Signup successful!");
      localStorage.setItem("token", data.token);
      if(role.toLowerCase() === 'user')
        router.push("/UserDashBoard");
      else if(role.toLowerCase() === 'admin')
        router.push("/AdminDashBoard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 dark:text-white dark:bg-gray-800 rounded-lg shadow-md md:w-2/6 w-5/6 mx-auto mb-4 mt-2">
      <h2 className="text-3xl text-center font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handlesubmit} className="flex flex-col">
        <label htmlFor="username" className="mb-2 text-xl font-semibold">
          Username
        </label>
        <input
          id="username"
          name="username"
          placeholder="Enter your username"
          className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email" className="mb-2 text-xl font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          placeholder="Enter your email"
          className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className="mb-2 text-xl font-semibold">
          Password
        </label>
        <input
          id="password"
          name="password"
          placeholder="Enter your password"
          className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="role" className="mb-2 text-xl font-semibold">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="outline-0 border-2 rounded-md p-2 border-gray-400 dark:bg-gray-800 mb-4"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <label htmlFor="state" className="mb-2 text-xl font-semibold">
          State
        </label>
        <select
          id="state"
          name="state"
          className="outline-0 border-2 rounded-md p-2 border-gray-400 dark:bg-gray-800 mb-4"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Select State</option>
          {states.map((state, idx) => (
            <option key={idx} value={state}>
              {state}
            </option>
          ))}
        </select>

        <label htmlFor="city" className="mb-2 text-xl font-semibold">
          City
        </label>
        <select
          id="city"
          name="city"
          className="outline-0 border-2 rounded-md p-2 border-gray-400 dark:bg-gray-800 mb-4"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!cities.length}
        >
          <option value="">Select City</option>
          {cities.map((city, idx) => (
            <option key={idx} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 rounded-md cursor-pointer px-4 py-2 font-semibold text-white text-xl shadow-md"
        >
          SignUp
        </button>

        <p className="text-center mt-2">
          Already have an account??{" "}
          <Link href="/Login" className="text-blue-600 font-semibold">
            Login!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
