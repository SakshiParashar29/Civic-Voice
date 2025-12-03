"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ComplaintList = () => {
  const [problems, setProblems] = useState<any[]>([]);
  const [loadingUpvote, setLoadingUpvote] = useState<string | null>(null);

  const fetchComplaints = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://civic-voice-tiv6.vercel.app/api/user/complaints/all", {
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

  const getUrgencyColor = (urgency: string) => {
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

  const getStatusColor = (status: string) => {
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

  const handleUpvote = async (complaintId: string) => {
    try {
      setLoadingUpvote(complaintId);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Login required to upvote");
        setLoadingUpvote(null);
        return;
      }
      const response = await fetch(
        `https://civic-voice-tiv6.vercel.app/api/user/complaints/upvote?id=${complaintId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to upvote");
        setLoadingUpvote(null);
        return;
      }

      fetchComplaints();
      setLoadingUpvote(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
      setLoadingUpvote(null);
    }
  };

  return (
    <div id="complaintList" className="w-full p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-4 rounded-md shadow-md">
      <div className="flex text-xl font-semibold p-2 border-b border-gray-500 dark:border-gray-700 justify-between">
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
              <div className="w-20 flex items-center justify-center gap-1">
                <span>{item.upvoteCount || 0}</span>
                <button
                  disabled={loadingUpvote === item.id}
                  onClick={() => handleUpvote(item.id)}
                  className={`focus:outline-none ${
                    loadingUpvote === item.id
                      ? "cursor-not-allowed text-gray-400 dark:text-gray-600"
                      : "cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                  aria-label={`Upvote complaint titled ${item.title}`}
                >
                  <FaArrowUp />
                </button>
              </div>

              <div className="w-24">{item.category}</div>

              <div className={`${getUrgencyColor(item.urgency)} w-24`}>
                {item.urgency}
              </div>

              <div className={`${getStatusColor(item.status)} w-24`}>
                {item.status}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ComplaintList;
