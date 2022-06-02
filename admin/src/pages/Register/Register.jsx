import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [ fullname, setFullname ] = useState("");
  const [ username, setusername ] = useState("");
  const [ password, setpassword ] = useState("");
  const [ conpassword, setconpassword ] = useState("");
  const [ success, setsuccess ] = useState(false);
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(fullname === '' || username === '' || password === '')   return toast("fill in the missing feild/s")
    if (password !== conpassword) return toast("password does not match");
    const admin = {fullname,username,password}
    try { 
      const response = await axios.post("/admin/register",admin,
        {
          headers: {'Content-Type': 'Application/json'}
        }
      )
      console.log(response.data)
      if(response.data?.error){
        toast("username already exists")
      } else{
        setsuccess(true)
        toast('Admin Created, you will be redirected to login')
        setTimeout(navigate("/login", { replace: true }), 10000);
      }
     
      //const res = axios.post
    } catch (err) {
      if(!err?.response){
        toast("No Server Response")
      } else{
        toast("Regitration Failed")
      }
    }
  };
  return (
    <section className="loginpWrapper">
      <h4>Student Result Management System</h4>

      <div className="loginform">
      <ToastContainer pauseOnFocusLoss={true}/>
        <form onSubmit={handleSubmit} className="TheForm" action="">
          <div className="newClassItems">
            <label>Full Name</label>
            <input
              type="text"
              value={fullname}
              autoComplete="off"
              onInput={(e) => setFullname(e.target.value)}
              placeholder="Input Fullname"
            />
          </div>
          <div className="newClassItems">
            <label>User Name</label>
            <input type="text" 
            value={username} 
            onInput={(e) => setusername(e.target.value)} 
            placeholder="Input Username" />
          </div>
          <div className="newClassItems">
            <label>Password</label>
            <input type="password"
            value={password}
            onInput = {(e) => setpassword(e.target.value)}
            placeholder="Input Password" />
          </div>
          <div className="newClassItems">
            <label>Confirm Password</label>
            <input type="password" 
            value={conpassword}
            onInput={(e) => setconpassword(e.target.value)}
            placeholder="Confirm Password" />
          </div>
          <div className="newClassBtn">
            
              <button type="submit">Register</button>
         
          </div>
          <small>
            Already Registered{" "}
            <span>
              <Link to="/login">Login</Link>
            </span>
          </small>
        </form>
      </div>
    </section>
  );
}
