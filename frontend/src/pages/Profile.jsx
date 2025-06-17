import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role); // <-- get role from Redux
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      const fetchData = async () => {
        try {
          const res = await axios.get("https://digitial-bookshelf-2.onrender.com/api/v1/getUserData", { headers });
          setProfileData(res.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
          navigate("/login");
        }
      };
      fetchData();
    }
  }, [isLoggedIn, navigate]);

  if (!ProfileData) return <div className="text-white text-center p-8">Loading...</div>;

  return (
    <div className="h-auto bg-zinc-900 px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
      <div className="h-auto lg:h-[80vh] w-full lg:w-1/6 bg-zinc-800 rounded-lg">
        <Sidebar ProfileData={ProfileData} />
      </div>

      <MobileBar />

      <div className="h-[100%] w-full lg:w-5/6 rounded-lg">
        {/* You can route different components based on role here if needed */}
        {role === "admin" ? (
          <Outlet context={{ admin: true, userData: ProfileData }} />
        ) : (
          <Outlet context={{ admin: false, userData: ProfileData }} />
        )}
      </div>
    </div>
  );
};

export default Profile;
