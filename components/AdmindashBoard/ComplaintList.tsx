"use client";
import React, { useEffect, useState } from "react";

const ComplaintList = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [editing, setEditing] = useState<string | null>(null); 
  const [newStatus, setNewStatus] = useState<string>("");

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://civic-voice-tiv6.vercel.app/api/user/complaints/sort", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setProblems(data.complaints || []);
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const getUrgencyColor = (urgency: string = "") => {
    switch (urgency.toLowerCase()) {
      case "low":
        return "text-green-600 font-semibold dark:text-green-400";
      case "medium":
        return "text-yellow-500 font-semibold dark:text-yellow-400";
      case "high":
        return "text-orange-600 font-semibold dark:text-orange-400";
      case "critical":
        return "text-red-700 font-bold dark:text-red-500";
      default:
        return "";
    }
  };

  const getStatusColor = (status: string = "") => {
    switch (status.toLowerCase()) {
      case "pending":
        return "text-gray-600 dark:text-gray-400";
      case "in-progress":
        return "text-blue-600 font-semibold dark:text-blue-400";
      case "resolved":
        return "text-green-700 font-semibold dark:text-green-400";
      default:
        return "";
    }
  };

  const handleStatus = async (complaintId: string) => {
    try {
      if (!newStatus.trim()) {
        alert("Please type a status");
        return;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://civic-voice-tiv6.vercel.app/api/user/complaints/change-status?id=${complaintId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to update status");
        return;
      }

      setEditing(null);
      fetchComplaints();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="w-full p-1 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-4 rounded-md shadow-md">
      <div className="flex flex-1 text-xl font-semibold p-2 border-b border-gray-500 dark:border-gray-700 justify-between">
        <div className="flex-1">Title</div>
        <div className="flex flex-1 justify-around">
          <div className="w-20 text-center">Area</div>
          <div className="w-20 text-center">Upvote</div>
          <div className="w-24 text-center">Category</div>
          <div className="w-24 text-center">Urgency</div>
          <div className="w-24 text-center">Status</div>
        </div>
      </div>

      {problems.length === 0 ? (
        <p className="text-center mt-4 text-gray-500 dark:text-gray-400">No complaints</p>
      ) : (
        problems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between p-2 border-b items-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex-1 font-semibold">{item.title}</div>

            <div className="flex flex-1 justify-around text-center items-center">
              <div className="w-24">{item.area}</div>

              <div className="w-20">{item.upvoteCount || 0}</div>

              <div className="w-24">{item.category}</div>

              <div className={`${getUrgencyColor(item.urgency)} w-24`}>
                {item.urgency}
              </div>

              <div className="w-24 flex items-center justify-center">
                {editing === item.id ? (
                  <div className="flex flex-col items-center w-full gap-1">
                    <input
                      className="border px-1 py-1 rounded text-black w-full text-sm"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                    />
                    <button
                      className="bg-blue-600 cursor-pointer text-white px-2 py-1 rounded text-xs w-full"
                      onClick={() => handleStatus(item.id)}
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span
                    className={`${getStatusColor(item.status)} cursor-pointer text-sm`}
                    onClick={() => {
                      setEditing(item.id);
                      setNewStatus(item.status);
                    }}
                  >
                    {item.status}
                  </span>
                )}
              </div>


            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintList;
