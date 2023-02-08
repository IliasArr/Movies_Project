import React,{useState} from 'react';
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios';

function AddMovie() {
  const [Title, setTitle] = useState("");
  const [Duration, setDuration] = useState("");
  const [Country, setCountry] = useState("");
  const [img_url, setImg_url] = useState("");
  const [date, setDate] = useState("");
  const [Rating, setRating] = useState("");
  const [Description, setDescription] = useState("");
  const navigate = useNavigate();
  const data = {
    
    Title: Title,
    Duration: Duration,
    Country: Country,
    img_url:img_url,
    date:date,
    Rating:Rating,
    Description:Description
  };
  function Save(e) {
    e.preventDefault();
    axios.post("http://localhost:9000/dbMovies",data).then(navigate("/home/Movies"));
  }
  return (
    <div style={{marginLeft:"25px"}}>
    <form className="col-8">
        <h3>Add Movie</h3>
      <br />
      <br />
      <br />
      <label htmlFor="titre">Titre :</label> <br />
      <input 
      value={Title}
      type="text" 
      className="form-control"
      onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label htmlFor="Description">Description :</label> <br />
      <textarea rows="5" value={Description} 
       onChange={(e) => setDescription(e.target.value)}
      className="form-control"></textarea>
      <label htmlFor="Duration">Duration :</label> <br />
      <input type="number"
       className="form-control"
       value={Duration}
       onChange={(e) => setDuration(e.target.value)} />
      <br />
      <label htmlFor="Image">Url image :</label> <br />
      <input type="text" className="form-control" value={img_url}  onChange={(e) => setImg_url(e.target.value)}/>
      <br />
      <label htmlFor="date">Releas Date :</label> <br />
      <input type="date" className="form-control"
      onChange={(e) => setDate(e.target.value)}
      value={date}
      />
      <br />
      <label htmlFor="rating">Rating :</label> <br />
      <input type="text"    
          onChange={(e) => setRating(e.target.value)}
           className="form-control" 
           value={Rating}
          />
      <br />
      <label htmlFor="country">Country :</label> <br />
      <input
       type="text"
       onChange={(e) => setCountry(e.target.value)}
        className="form-control" 
        value={Country}
      
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
        to="/home/movies"
        style={{ width: "33%" }}
        className="btn btn-danger"
      > Cancel</Link>
    </form></div>
  );
}
export default AddMovie;
