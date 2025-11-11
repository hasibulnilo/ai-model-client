import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa6";
import toast from "react-hot-toast";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    const displayName = event.target.displayName.value;
    const photoURL = event.target.photoURL.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || password.length < 6) {
      toast.error("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      return;
    }

    toast.loading("Creating user...", { id: "create-user" });

    createUser(email, password)
      .then((result) => {
        // console.log(result.user);
        return updateUserProfile(displayName, photoURL);
      })
      .then(() => {
        toast.success("User created successfully!", { id: "create-user" });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message || "Registration failed", { id: "create-user" });
      });
  };

  const handleGoogleSignIn = () => {
    toast.loading("Signing in with Google...", { id: "create-user" });
    signInWithGoogle()
      .then((result) => {
        toast.success("Google sign in successful!", { id: "create-user" });
        // console.log(result.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message, { id: "create-user" });
      });
  };

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold text-center">Register for AI Model Inventory Manager</h1>
        <form onSubmit={handleRegister}>
          <fieldset className="fieldset">
           
            <label className="label">Name</label>
            <input
              type="text"
              name="displayName"
              required
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Name"
            />

            <label className="label">PhotoURL</label>
            <input
              type="text"
              name="photoURL"
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Photo URL"
            />
          
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Email"
            />
          
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              required
              className="input rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn text-white mt-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              Register
            </button>
          </fieldset>
        </form>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white rounded-full text-black border-[#e5e5e5] w-full mt-4"
        >
          <FaGoogle />
          Sign in with Google
        </button>
        <p className="text-center">
          Already have an account? Please{" "}
          <Link className="text-blue-500 hover:text-blue-800" to="/auth/login">
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;