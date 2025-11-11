import { Link, NavLink } from "react-router-dom";
import { IoLogoModelS } from "react-icons/io";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaGear, FaUser } from "react-icons/fa6";
import { LuCpu } from "react-icons/lu";
import { ImBoxAdd } from "react-icons/im";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"; // make sure path is correct

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext); // <-- fixed

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="navbar  py-0 min-h-0 z-1 shadow-sm rounded-full glass-card max-w-7xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className=" menu-sm dropdown-content bg-base-100  z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink 
                to={"/"}
                className={({ isActive }) => 
                  isActive ? 'text-blue-500 font-bold bg-blue-100 rounded-lg px-2 py-1' : ''
                }
              >
                <GoHomeFill />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to={"/models"}
                className={({ isActive }) => 
                  isActive ? 'text-blue-500 font-bold bg-blue-100 rounded-lg px-2 py-1' : ''
                }
              >
                <LuCpu /> View Models
              </NavLink>
            </li>
            
 <li>
            <NavLink 
              to={"/add-model"}
              className={({ isActive }) => 
                isActive ? 'text-blue-500 font-bold bg-blue-100 rounded-lg px-2 py-1' : ''
              }
            >
              <ImBoxAdd /> Add Model
            </NavLink>
          </li>


          </ul>
        </div>
        <Link className="flex items-center gap-1 text-xl font-bold">
          <LuCpu /> AI Model Inventory Manager
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-10">
          <li>
            <NavLink 
              to={"/"}
              className={({ isActive }) => 
                isActive ? 'text-blue-500 font-bold bg-blue-100 rounded-lg px-4 py-2' : ''
              }
            >
              <GoHomeFill />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={"/models"}
              className={({ isActive }) => 
                isActive ? 'text-blue-500 font-bold bg-blue-100 rounded-lg px-4 py-2' : ''
              }
            >
              <LuCpu /> View Models
            </NavLink>
          </li>
          <li>
            <NavLink 
              to={"/add-model"}
              className={({ isActive }) => 
                isActive ? 'text-blue-500 font-bold bg-blue-100 rounded-lg px-4 py-2' : ''
              }
            >
              <ImBoxAdd /> Add Model
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 border-2 border-gray-300 rounded-full">
                <img
                  alt="User avatar"
                  referrerPolicy="no-referrer"
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <div className="pb-3 border-b border-b-gray-200">
                <li className="text-sm font-bold">{user.displayName}</li>
                <li className="text-xs">{user.email}</li>
              </div>
              <li className="mt-3">
                <Link to={"/profile"}>
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <Link to={"/my-models"}>My Models Page</Link>
              </li>
              <li>
                <Link to={"/my-purchases"}>My Purchases</Link>
              </li>
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                type="checkbox"
                defaultChecked={localStorage.getItem("theme") === "dark"}
                className="toggle"
              />
             
              <li>
                <button
                  onClick={signOutUser}
                  className="btn btn-xs text-left bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                >
                  <IoLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to={"/auth/login"}
            className="btn rounded-full border-gray-300 btn-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            <IoLogIn /> Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;