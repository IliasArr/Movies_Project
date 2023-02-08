import {Link,  useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Sitecss.css";

const Site_1 = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:9000/dbMovies/${id}`).then((res) => {
      setMoviesList(res.data);
    });
  }, []);
  const { id } = useParams();

  return (
    <>
      <h2
        className="bg-black text-white"
        style={{ minHeight: "10vh", padding: "20px", textAlign: "left" }}
      >
        Movies Database
      </h2>
      
      <div className="container">
        <div className="row ">
         
            <img
              src={moviesList.img_url}
              style={{ height: "100%",borderRadius:"25px" }}
              className="col-4"
            />
        
          <div className="col-8" style={{color:"white",marginLeft:"",borderRadius:"25px",backgroundColor:"black"}}>
           
              
                <br />
               <h2  className="text-center">{moviesList.Title}</h2> 

                <h4><img src="/countries.png" style={{width:"30px", color:"white"}} /> {moviesList.Country}</h4>
            
                <p>{moviesList.date} - {moviesList.Duration} min</p>
              
            {  moviesList.Rating >= 7 ?
            
            <div class="black-circle" style={{float:"left",backgroundColor: "green"}}>
            <div class="green-circle" style={{backgroundColor: "white"}}>
              <span style={{ color: "black" }}>
                 
              {moviesList.Rating}
                 
                 </span>
            </div>
          </div>
          :
          moviesList.Rating >= 5  ?

           <div class="black-circle" style={{float:"left",backgroundColor: "yellow"}}>
            <div class="green-circle" style={{backgroundColor: "white"}}>
              <span style={{ color: "black" }}>
                 
              {moviesList.Rating}
                 
                 </span>
            </div>
          </div> :
           <div class="black-circle" style={{float:"left",backgroundColor: "red"}}>
           <div class="green-circle" style={{backgroundColor: "white"}}>
             <span style={{ color: "black" }}>
                
             {moviesList.Rating}
                
                </span>
           </div>
         </div>
          
          }
                <br /><br /><br /><br />
                <p>{moviesList.Description}</p>
                <br /><br />
                <button className="btn btn-danger">Watch Now</button>
                <br /><br />
                <Link to="/SiteMovies" style={{fontSize:"20px",color:"white"}}>Back to moviesList</Link>
          </div>
                

        </div>
        
      </div>
    </>
  );
};
export default Site_1;
