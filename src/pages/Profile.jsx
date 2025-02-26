import React, { useState } from 'react';
import Progress from '../components/Progress'
import { getUserID } from '../services/authService';
const Profile = () => {
  const userData = {
    name: getUserID()
  };
  const [showProgress,setShowProgress]=useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  

  const handleSaveChanges = () => {
  
    setIsEditing(false);
    alert('Profile updated!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">Your Profile</h1>
        <div className="flex flex-col items-center mb-6">
          
         
        </div>

    
        <div className="mb-4">
          <label htmlFor="name" className="text-lg text-gray-800">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className="w-full mt-2 p-3 border-2 border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          
        </div>

        <div className="mb-6">
          
          <p className="text-lg text-gray-800"><strong>score:0</strong></p>
        </div>

        {/* Edit and Save Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      
         {showProgress ? <Progress  setShowProgress={setShowProgress} showProgress={showProgress}/> :<button className="h-14 w-80 bg-green-600 rounded-lg" onClick={()=>setShowProgress(!showProgress)}>Progress Show</button>}
    </div>
  );
};

export default Profile;
