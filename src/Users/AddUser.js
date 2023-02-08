import axios from "axios";
import React, { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
function AddMovie() {
  const [Name, setName] = useState("");
  const [Username, setUserame] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
 
  const data = {
    Name: Name,
    Username: Username,
    Password: Password,
  };
  function Save(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/dbusers", data).then(navigate("/home/Users"));
  }

  return (
    <>
    <div style={{marginLeft:"25px"}}>
      <h3>Add User</h3>
      <br />
      <br />
      <br />
      <form className="col-8">
        <label htmlFor="titre">Name :</label> <br />
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
        />
        <br />
        <label htmlFor="titre">UserName :</label> <br />
        <input
          value={Username}
          onChange={(e) => setUserame(e.target.value)}
          type="text"
          className="form-control"
        />
        <br />
        <label htmlFor="Duration">Password :</label> <br />
        <input
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          type="Password"
          className="form-control"
        />
        <br />
        <input
          onClick={Save}
          type="submit"
          value="Save"
          style={{ width: "33%" }}
          className="btn btn-primary"
        />
         <Link
        to="/home/Users"
        style={{ width: "33%" }}
        className="btn btn-danger"
      > Cancel</Link>
      </form></div>
    </>
  );
}
export default AddMovie;
