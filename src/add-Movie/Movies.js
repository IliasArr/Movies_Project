import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Movies.css"


const Movies = () => {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9000/dbMovies")
    .then((res) => {
      setMoviesList(res.data.reverse());
    });
  }, []);
  const quantityPageRef = useRef(8);
  const [currentIndex,setCurrentIndex] = useState(0);
  const [endPosition,setEndPosition] =useState(8);
  const handlePagination = (index) =>{
    setEndPosition((index + 1)*quantityPageRef.current);
    setCurrentIndex((index + 1)*quantityPageRef.current - quantityPageRef.current)
  }
  const handlePrev=()=>{
    if(currentIndex){
      setCurrentIndex(currentIndex - quantityPageRef.current);
      setEndPosition(endPosition - quantityPageRef.current);
    }
  } 
  const handleNext =()=>{
    if(endPosition < moviesList.length){
      setCurrentIndex(currentIndex + quantityPageRef.current);
      setEndPosition(endPosition + quantityPageRef.current);
    }
  }

  const loadUsers=()=>{
            axios.get("http://localhost:9000/dbMovies")
            .then((res)=>{
              setMoviesList(res.data.reverse());     
            })}

  // const [users,setUsers] =useState([]);
  function Delete(id){
    axios.delete(`http://localhost:9000/dbMovies/${id}`)
    .then(
        loadUsers()
    )
}

 

  return (
    <>
    <center>
   
      <div>
        <Link
          type="submit"
          className="btn btn-outline-primary btn-lg btn-block"
          style={{ width: "80%" }}
          to="/home/AddMovie"
        >
          Add Movie
        </Link>
      </div>
      </center>
      <br /> 
      <center>
      <table className="table"  style={{ width: "80%" }}>
        <thead>
          <tr className="bg-primary text-light">
            <th></th>
            <th scope="col">Title</th>
            <th scope="col">Duration</th>
            <th scope="col">Country</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {moviesList.slice(currentIndex,endPosition).map((data, index) => (
            <tr key={index}>
              <td></td>
              <td> {data.Title} </td>
              <td>{data.Duration}</td>
              <td>{data.Country}</td>
             <td><Link to={`/home/EditMovie/${data.id}`} ><img src="/edit.png" alt="edit" style={{ width: "25px" }}  /></Link></td>
             <td> <td><img src="/delete1.png" alt="delete1" style={{ width: "25px" }} onClick={()=>Delete(data.id)} type="submit"/></td>  </td>
            </tr>
            
          ))}
        
        </tbody>
    
      </table>
      </center>
      <center> 
      <div className="bg-primary"style={{width: "80%"}} >
            <button className="btn btn-primary" onClick={handlePrev}>Previous</button>
          {Array(Math.ceil(moviesList.length / quantityPageRef.current)).fill(null).map((_,index)=>(
          <button className="btn btn-primary" onClick={()=>handlePagination(index)}>{index + 1}</button>
        ))}
          <button className="btn btn-primary" onClick={handleNext}>Next</button>
          </div>
        </center>
    </>
  );
};
export default Movies;