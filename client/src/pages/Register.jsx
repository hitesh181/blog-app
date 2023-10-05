import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("File is ", file)
      const res = await axios.post("/api/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    console.log("Image is ", imgUrl)
   
    try{
      const res = await axios.post("/api/auth/register", {...inputs, img: file ? imgUrl : ""})
      const data = res.data;
      console.log("Data is ", data)
      if(res.status === 200){
        window.alert("User has been created Successfully ", data)
        navigate("/login")
      }
      else if(res.status === 409){
        setError(data)
      }
    }
    catch(err){
      console.log("Error is ", err)
    }
  };

  
  
  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
    
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
    
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
        />
        <input
    
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
        />
         <div className="item">
        <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name=""
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          </div>
        
        <button onClick={handleSubmit}>Register</button>
        {err && <p>{err}</p>}
        <span>
          Do you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;