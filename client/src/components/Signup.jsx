import React, { useState } from "react";
import { useUserRegisterMutation } from "./../features/api/apiSlice";
import { useNavigate } from 'react-router-dom';
import "../dist/styles.css";
import Hero from "./Hero";

const Signup = () => {
  const navigate = useNavigate();

  const [registerData, registerResponse] = useUserRegisterMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const submit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const form = new FormData();
    form.append("firstName", firstName);
    form.append("lastName", lastName);
    form.append("email", email);
    form.append("address", address);
    form.append("phone", phone);
    form.append("password", password);
    form.append("confirmPassword", confirmPassword);
    if (profilePic) {
      form.append("profilePic", profilePic);
    }

    try {
      const result = await registerData(form).unwrap();
      console.log("Registration successful:", result);
      navigate('/');
      alert('Account Created Succesfully');
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error here
    }
  };

  return (
    <div className="signup-container">
      <Hero onClick={() => navigate("/")} />
      <div className="signup-card z-30">
        <h2>Your Personal Information</h2>

        <div className="signup-row">
          <input
            onChange={(e) => setFirstName(e.target.value)}
            className="signup-input"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={(e) => setLastName(e.target.value)}
            className="signup-input"
            type="text"
            placeholder="Last Name"
          />
        </div>

        <div className="signup-row">
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input"
            type="text"
            placeholder="Email"
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            className="signup-input"
            type="text"
            placeholder="Address"
          />
        </div>

        <div className="signup-row">
          <input
            onChange={(e) => setPhone(e.target.value)}
            className="signup-input"
            type="text"
            placeholder="Phone Number"
          />
        </div>

        <div className="signup-row">
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input"
            type="password"
            placeholder="Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="signup-input"
            type="password"
            placeholder="Confirm Password"
          />
        </div>

        <label className="signup-profile-pic-label">
          Choose Profile Picture (Optional)
          <input
            onChange={(e) => setProfilePic(e.target.files[0])}
            className="signup-profile-pic-input"
            type="file"
            name="profilePic"
          />
        </label>

        <button onClick={submit} className="signup-button">
          Register
        </button>

        <div className="existing-account">
          <p>Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="login-button"
          >
            Login here
          </button>
        </div>

        {registerResponse?.status === "pending" && (
          <div className="signup-loading">
            <div className="spinner"></div>
          </div>
        )}
      </div>
      {registerResponse?.data?.message && (
        <div className="signup-message success">
          {registerResponse.data.message}
        </div>
      )}
      {registerResponse?.status === "rejected" && (
        <div className="signup-message error">
          {Array.isArray(registerResponse.error?.data) ? (
            registerResponse.error.data.map((e, index) => (
              <p key={index}>{e.msg}</p>
            ))
          ) : (
            <p>Something went wrong</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Signup;
