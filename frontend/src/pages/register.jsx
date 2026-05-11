import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/register",
        formData
      );

      alert("Registration Successful");
      console.log(response.data);

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-10 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Register
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg font-bold"
        >
          Register
        </button>

        <p className="text-white text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;