import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../services/authService";
import { setUser, setUserId } from "../services/redux/globalSlice";
import apiClient from "../utils/apiClient";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user) || {
    name: "JohnDoe123",
    score: 2450,
    image: "https://via.placeholder.com/150",
  };


  const [name, setName] = useState(user.name);
  const [score, setScore] = useState(user.score);
  const [image, setImage] = useState(user.image);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const updateProfile = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await apiClient.post("/updateProfile", { name, score, image });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setMessage("Profile updated successfully!");
      } else {
        setMessage("Failed to update profile.");
      }
    } catch (err) {
      setMessage("Error updating profile. Try again.");
      console.error("Profile update error:", err);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    removeToken();
    dispatch(setUserId(null));
    dispatch(setUser(null)); 
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6">
       
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-black">
            <img src={image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>

      
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-black mb-2">{user.name}</h1>
          <p className="text-gray-600">Score: <span className="font-semibold">{user.score}</span></p>
        </div>

        <div className="space-y-3">
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter new name"
            className="w-full p-2 border rounded"
          />
          <input 
            type="number" 
            value={score} 
            onChange={(e) => setScore(e.target.value)} 
            placeholder="Enter new score"
            className="w-full p-2 border rounded"
          />
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            placeholder="Enter image URL"
            className="w-full p-2 border rounded"
          />

          {message && <p className="text-center text-sm text-gray-600">{message}</p>}

          <button
            onClick={updateProfile}
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 border-2 border-black rounded-md text-black font-semibold 
            hover:bg-gray-50 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
