import { Link,useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../hooks/useAuth"
import { ToastContainer, toast } from 'react-toastify';
import axios from "../../api/axios";
import "./Login.css";

export default function Login() {
  const { setAuth } = useAuth()
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  // const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/admin";
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(username === '' || password === '')   return toast("fill in the missing feild/s")
    const admin = {username,password}
    try { 
      const response = await axios.post("/admin/login",admin,
        {
          headers: {'Content-Type': 'Application/json'},
          withCredentials: true
        }
      )
      //console.log(response.data)
        if(response.status === 200){
          const accesstoken = response?.data?.jwttoken;
          console.log(response.data)
          setAuth({username,accesstoken})
          setUsername('')
          setPassword('')
          navigate(from, {replace: true})
          //toast('Admin Created, you will be redirected to login')
        }
        
  
  }
 catch (err) {
   console.log(err)
  if(!err?.response){
    toast("No Server Response")
  } else if(err?.request.status === 404){
    toast("User does not exist")
  }else if(err?.request.status === 400){
    toast("Invalid Password")
  }
  else{
    toast("Regitration Failed")
  }
}
  }
  return (
    <div className="loginpWrapper">
      <h4>Student Result Management System</h4>
      <ToastContainer pauseOnFocusLoss={true}/>
      <div className="loginform">
        <form onSubmit={handleSubmit} className="TheForm" action="">
          <div className="newClassItems">
                  <label >User Name</label>
                  <input type="text"
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                   placeholder="Input Username" />
              </div>
              <div className="newClassItems">
                  <label >Password</label>
                  <input type="password" 
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  placeholder="Input Password" />
              </div>
              <div className="newClassBtn">
                  <button>Login</button>
        
              </div>
              <small>Not Registered? <span><Link to="/register">Register</Link></span></small>
        </form>
      </div>
    </div>
  )
}
