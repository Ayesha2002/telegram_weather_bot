


"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { auth, provider, signInWithPopup, signOut } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const api = import.meta.env.VITE_API_URL;
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({
    weatherApiKey: "",
    telegramBotToken: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        localStorage.setItem("adminToken", user.uid);
        fetchUsers();
        fetchSettings();
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("adminToken");
      }
    });
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${api}/users`);
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users");
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${api}/admin/settings`);
      if (response.data) {
        setSettings({
          weatherApiKey: response.data.weatherApiKey || "",
          telegramBotToken: response.data.telegramBotToken || "",
        });
      }
    } catch (err) {
      setError("Failed to fetch settings");
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axios.put(`${api}/admin/settings`, settings);
      setSuccessMessage("Settings updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to save settings");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
    } catch (error) {
      setError("Logout failed.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-[400px] bg-white rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
          <button
            onClick={() => signInWithPopup(auth, provider)}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-800"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <button
          onClick={() => setActiveTab("users")}
          className={`flex items-center p-3 mb-2 rounded-lg ${
            activeTab === "users" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <FaUsers className="mr-2" /> Users
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center p-3 mb-2 rounded-lg ${
            activeTab === "settings" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
        >
          <FaCog className="mr-2" /> Settings
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center p-3 mt-auto bg-red-500 hover:bg-red-600 rounded-lg"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
        {successMessage && (
          <div className="bg-green-500 text-white p-2 mb-4">{successMessage}</div>
        )}

        {activeTab === "users" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Users</h2>
            <div className="space-y-4">
              {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
              ) : (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between p-4 rounded-lg border bg-gray-50"
                  >
                    <p className="font-medium">{user.chatId}</p>
                    <p className="text-sm">{user.location}</p>
                    <p
                      className={
                        user.isActive ? "text-green-500" : "text-red-500"
                      }
                    >
                      {user.isActive ? "Active" : "Blocked"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            <label className="block mb-2">Weather API Key</label>
            <input
              type="text"
              value={settings.weatherApiKey}
              onChange={(e) =>
                setSettings({ ...settings, weatherApiKey: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <label className="block mb-2">Telegram Bot Token</label>
            <input
              type="text"
              value={settings.telegramBotToken}
              onChange={(e) =>
                setSettings({ ...settings, telegramBotToken: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleSaveSettings}
              className="bg-gray-700 text-white px-4 py-2 rounded"
            >
              Save Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
