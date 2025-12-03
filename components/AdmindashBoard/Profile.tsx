"use client";
import React, { useEffect, useState } from "react";
import { Edit3, CheckCircle, Clock, LoaderIcon } from "lucide-react";

interface ProfileType {
    _id: string;
    username: string;
    email: string;
    role: string;
    state: string;
    city: string;
    createdAt: string;
    updatedAt: string;
}

interface StatsType {
    total: number;
    Resolved: number;
    Pending: number;
    "In-Progress": number;
}

const Profile = () => {
    const [profile, setProfile] = useState<ProfileType | null>(null);
    const [stats, setStats] = useState<StatsType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const res = await fetch("http://localhost:3000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                setProfile(data.admin || null);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        const fetchStats = async () => {
          try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const res = await fetch("http://localhost:3000/api/user/complaints/getStats", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setStats(data.data || null);
          } catch (error) {
            console.error("Error fetching stats:", error);
          } finally {
            setLoading(false);
          }
        };

        fetchProfile();
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-lg font-semibold text-gray-600">
                Loading Profile...
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Profile Card */}
            {profile && (
                <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
                    <div className="w-28 h-28 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white text-5xl font-bold select-none">
                        A
                    </div>


                    {/* Profile Info */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{profile.username}</h2>
                            <button className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md transition duration-300">
                                <Edit3 size={18} /> Edit Profile
                            </button>
                        </div>

                        <p className="text-gray-700 dark:text-gray-200 text-lg mb-1 wrap-break-words">{profile.email}</p>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wide mb-1">{profile.role}</p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{profile.city}, {profile.state}</p>
                    </div>
                </div>
            )}

            {/* Stats Section */}
            {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white p-5 dark:bg-gray-900 rounded-2xl shadow flex items-center gap-3">
            <CheckCircle className="text-purple-600" size={28} />
            <div>
              <p className="text-gray-400 text-sm">Total Issues</p>
              <h3 className="text-lg dark:text-gray-100 font-bold">{stats.total}</h3>
            </div>
          </div>

          <div className="bg-white p-5 dark:bg-gray-900 rounded-2xl shadow flex items-center gap-3">
            <CheckCircle className="text-green-600" size={28} />
            <div>
              <p className="dark:text-gray-400 text-gray-500 text-sm">Resolved Issues</p>
              <h3 className="text-lg dark:text-gray-100 font-bold">{stats.Resolved}</h3>
            </div>
          </div>

          <div className="bg-white p-5 dark:bg-gray-900 rounded-2xl shadow flex items-center gap-3">
            <Clock className="text-yellow-500" size={28} />
            <div>
              <p className="dark:text-gray-400 text-gray-500 text-sm">Pending Issues</p>
              <h3 className="text-lg dark:text-gray-100 font-bold">{stats.Pending}</h3>
            </div>
          </div>

          <div className="bg-white p-5 dark:bg-gray-900 rounded-2xl shadow flex items-center gap-3">
            <LoaderIcon className="text-blue-600" size={28} />
            <div>
              <p className="dark:text-gray-400 text-gray-500 text-sm">In Progress</p>
              <h3 className="text-lg dark:text-gray-100 font-bold">{stats["In-Progress"]}</h3>
            </div>
          </div>
        </div>
      )}
        </div>
    );
};

export default Profile;
