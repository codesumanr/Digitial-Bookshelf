import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history("/");
  }

  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "user", 
  });

  const [error, setError] = useState({});

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    const { username, email, password, address, role } = Data;
    let newError = {};

    if (!username) newError.username = true;
    if (!email) newError.email = true;
    if (!password) newError.password = true;
    if (!address) newError.address = true;

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    try {
      const response = await axios.post(
        "https://digitial-bookshelf-2.onrender.com/api/v1/sign-up",
        Data
      );

      setData({
        username: "",
        email: "",
        password: "",
        address: "",
        role: "user",
      });

      alert(response.data.message);
      history("/login");
    } catch (error) {
      alert(error?.response?.data?.message || "Signup failed.");
    }
  };

  return (
    <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-50 text-xl">Sign Up</p>
        <div className="mt-4">
          <div>
            <label className="text-zinc-50">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              value={Data.username}
              onChange={change}
            />
            {error.username && (
              <p className="text-red-500 text-sm mt-1">* Information is missing</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-zinc-50">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              value={Data.email}
              onChange={change}
            />
            {error.email && (
              <p className="text-red-500 text-sm mt-1">* Information is missing</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-zinc-50">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              value={Data.password}
              onChange={change}
            />
            {error.password && (
              <p className="text-red-500 text-sm mt-1">* Information is missing</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-zinc-50">Address</label>
            <textarea
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              rows="4"
              placeholder="address"
              name="address"
              value={Data.address}
              onChange={change}
            />
            {error.address && (
              <p className="text-red-500 text-sm mt-1">* Information is missing</p>
            )}
          </div>

          <div className="mt-4">
            <label className="text-zinc-50">Select Role</label>
            <select
              name="role"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              value={Data.role}
              onChange={change}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="text-green-500">
              <u>Log In</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
