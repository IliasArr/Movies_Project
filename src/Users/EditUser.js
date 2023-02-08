import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams , Link} from "react-router-dom";
import axios from "axios";

function EditUser(){

    const [Name, setName] = useState("");
    const [Username, setUserame] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const {id}= useParams();

    useEffect(()=>{
        axios.get(`http://localhost:9000/dbusers/${id}`).then(
            (res)=>{
           setName(res.data.Name);
           setUserame(res.data.Username);
           setPassword(res.data.Password);
            }
        );
        },[]);
        const data = {
            Name: Name,
            Username: Username,
            Password: Password,
          };
        function Edit(e) {
            e.preventDefault();
            axios.put(`http://localhost:3000/dbusers/${id}`,data).then(navigate("/home/Users"));
          }
        
   

return(
    <>
    <div style={{marginLeft:"25px"}}>
    <h4 style={{float:"left"}}>Edit User</h4>
    <br /><br /><br />
   
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
        onClick={Edit}
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
      
    </form>
    </div>
  </>
)


}
export default EditUser