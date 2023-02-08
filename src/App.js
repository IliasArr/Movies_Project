
import './App.css';
import SiteMovies from "./Site/SiteMovies"
import Home from './home/Home';
import AddMovie from './add-Movie/AddMovie';
import Movies from './add-Movie/Movies';
import Users from './Users/Users';
import AddUser from './Users/AddUser';
import EditUser from './Users/EditUser';
import EditMovie from './add-Movie/EditMovie';
import Site_1 from "./Site/Site_1"

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login/Login';
function App() {
  return (
   
    <div className="App">
 
 
 
            <Router>       
               <Routes>
                <Route path="/" element={<Login />} />
                 <Route path="SiteMovies" element={<SiteMovies /> } />
                  <Route path="Site_1/:id" element={<Site_1 />}/>
                <Route path="/Home" element={<Home />}>

                 

                  <Route path="users" element={<Users />} />
                  <Route path="movies" element={<Movies />} />
                  <Route path="addMovie" element={<AddMovie />} />
                  <Route path="AddUser" element={<AddUser />}/>
                  <Route path="EditUser/:id" element={<EditUser />}/>
                  <Route path="EditMovie/:id" element={<EditMovie />}/>
                </Route>
              </Routes>
            </Router>  


 {/* <Router>
               <Routes>
                
                <Route path="/Site_1/:id" element={<Site_1 />}/>
              </Routes>
            </Router>  */}







    </div>


 
  );
}

export default App;
