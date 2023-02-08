import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function EditMovie(){

    const [Title, setTitle] = useState("");
    const [Duration, setDuration] = useState("");
    const [Country, setCountry] = useState("");
    const navigate = useNavigate();

    const [moviesList,setmoviesList] =useState([]);
    const {id}= useParams();

    useEffect(()=>{
        axios.get(`http://localhost:9000/dbMovies/${id}`).then(
            (res)=>{
           setTitle(res.data.Title);
           setDuration(res.data.Duration);
           setCountry(res.data.Country);
            }
        );
        },[]);
        const data = {
            Title: Title,
            Duration: Duration,
            Country: Country,
          };
        function Edit(e) {
            e.preventDefault();
            axios.put(`http://localhost:3000/dbMovies/${id}`,data).then(navigate("/home/Movies"));
          }
        

        

return(
    <>
    <div style={{marginLeft:"25px"}}>
    <h4 style={{float:"left"}}>Edit Movie</h4>
    <br /><br /><br />
   
    <form className="col-8">
      <label htmlFor="titre">Title :</label> <br />
      <input
        value={Title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        className="form-control"
      />
      <br />
      <label htmlFor="Duration">Duration :</label> <br />
      <input
        value={Duration}
        onChange={(e) => setDuration(e.target.value)}
        type="text"
        className="form-control"
      />
      <br />
      <label htmlFor="Duration">Country :</label> <br />
      <input
        value={Country}
        onChange={(e) => setCountry(e.target.value)}
        type="text"
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
        to="/home/movies"
        style={{ width: "33%" }}
        className="btn btn-danger"
      > Cancel</Link>
    </form>
    
    </div>
  </>
)


}
export default EditMovie