import React, { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      )

      console.log(response.data)

      localStorage.setItem(
        "token",
        response.data.access_token
      )

      alert("Login Successful")

      navigate("/dashboard")
    } catch (error) {
      console.log(error)

      alert("Invalid Credentials")
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-2xl w-96 shadow-lg">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold"
        >
          Login
        </button>

        <p className="text-white text-center mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login