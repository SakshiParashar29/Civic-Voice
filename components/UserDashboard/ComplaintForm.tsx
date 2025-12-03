"use client";

import React, { useState } from "react";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Login required to submit a complaint");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/complaints/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            area,
            category,
            urgency,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Could not submit complaint");
        return;
      }

      setMessage("Complaint submitted successfully!");

      setTitle("");
      setDescription("");
      setArea("");
      setCategory("");
      setUrgency("");

      setTimeout(() => setMessage(""), 3000);

      setTimeout(() => {
        window.location.reload();
      }, 1000);


    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="p-4 dark:text-gray-100 dark:bg-gray-900 rounded-lg shadow-md md:w-2/6 w-5/6 mx-auto mb-4 mt-2">
      <h2 className="dark:text-white text-3xl text-center font-semibold">
        Complaint Form
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col mt-4">

        <label className="mb-2 text-xl font-semibold">Title</label>
        <input
          className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4"
          placeholder="Short title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="mb-2 text-xl font-semibold">Description</label>
        <textarea
          className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4"
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="mb-2 text-xl font-semibold">Location (Area/Landmark)</label>
        <textarea
          className="outline-0 border-2 rounded-md p-2 border-gray-400 mb-4"
          placeholder="Area or landmark"
          value={area}
          onChange={(e) => setArea(e.target.value)}
        />

        <label className="mb-2 text-xl font-semibold">Category</label>
        <select
          className="outline-0 border-2 rounded-md p-2 border-gray-400 dark:bg-gray-800 mb-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="roads">Roads</option>
          <option value="electricity">Electricity</option>
          <option value="waterSupply">Water Supply</option>
          <option value="waste">Garbage/Waste</option>
          <option value="drainage">Drainage</option>
          <option value="safety">Public Safety</option>
          <option value="traffic">Traffic Issues</option>
          <option value="noise">Noise Pollution</option>
          <option value="animals">Stray Animals</option>
          <option value="others">Others</option>
        </select>

        <label className="mb-2 text-xl font-semibold">Urgency</label>
        <select
          className="outline-0 border-2 rounded-md p-2 border-gray-400 dark:bg-gray-800 mb-4"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option value="">Choose</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 rounded-md px-4 py-2 font-semibold text-white text-xl cursor-pointer shadow-md"
        >
          Submit
        </button>

        {message && (
          <p className="text-green-500 text-center mt-2 font-semibold">
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ComplaintForm;
