
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import { User as UserIcon, LogOut, Edit } from "lucide-react";

const Profile = () => {
  const { user, loading, signOutUser, updateUserProfile } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setDisplayName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      await updateUserProfile(displayName, photoURL);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile: " + error.message);
    }
    setUpdating(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md space-y-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <UserIcon /> Profile
      </h1>

      {user ? (
        <div className="space-y-4">
          <img
            src={photoURL || user.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />

          <form onSubmit={handleUpdateProfile} className="space-y-2">
            <div>
              <label className="block font-semibold">Name:</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border px-2 py-1 rounded dark:bg-gray-700"
              />
            </div>

            <div>
              <label className="block font-semibold">Photo URL:</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full border px-2 py-1 rounded dark:bg-gray-700"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
            >
              <Edit className="inline mr-2" />
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </form>

          <p className="text-center">
            <strong>Email:</strong> {user.email}
          </p>

          <button
            onClick={handleLogout}
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 w-full"
          >
            <LogOut className="inline mr-2" /> Logout
          </button>
        </div>
      ) : (
        <p>User not logged in.</p>
      )}
    </div>
  );
};

export default Profile;