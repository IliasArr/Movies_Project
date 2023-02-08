import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Home (){
  
  return(
    <>
  
 
    <div >
          <h1 className="bg-primary text-white" style={{ minHeight: "15vh" ,padding: "30px" ,textAlign:"center"}}>
           Admin
          </h1>
        
    
        <div className="row m-0">
            <div className="col-4" >
              <br/>
            
            <Link to="movies" class="btn btn-lg btn-block bg-primary text-white active" style={{width: "60%",background:"white"}} > Movies </Link>
            <br/><br/>
            <Link type="submit" class="btn btn-light btn-lg bg-primary btn-block text-white" style={{width: "60%",background:"white"}} 
             to="Users" >
            Users</Link>
            <br/><br/>
            <Link class="btn btn-light btn-lg btn-block bg-primary text-white" style={{width: "60%",background:"white"}} to="/">Logout</Link>
    
            </div>
            <div className="col-8">
              <Outlet />
            </div>
        
    </div>
   </div>
    </>
    
  
  ) 
}
export default Home;