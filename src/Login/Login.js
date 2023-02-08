import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from "axios";
import "./Login.css"
const Login = () => {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const users = await axios.get("http://localhost:9000/dbusers");
      const user = users.data.find((user) => user.Username === Username && user.Password === Password);
      if (user) {
        // store the user's information in local storage
        localStorage.setItem("user", JSON.stringify(user));
        // redirect the user to a secure page
        navigate("/Home");
      } else {
        alert("Invalid Username or Password");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>

       <h1 className="bg-primary text-white" style={{ minHeight: "15vh" ,padding: "30px",textAlign:"center" }}>
           Admin
       </h1>
        
     <div className="container">
      <div className="row">
        <center>
      <div className="col-6">

       <label>
        Username:
        </label>
        <br />
        
        <input
          className="form-control"
          type="text"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
        />
      <br />
      <label>
        Password:
        </label>
        <br />
        <input
          className="form-control"
          type="Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
      
      <br />
      <button type="submit" className="btn btn-primary form-control" >Login</button>
      </div>
      <br/>
      <Link to="SiteMovies">I'm Not Admin</Link>
      </center>
      </div>
      </div>
    </form>
  );
};

export default Login;

  
