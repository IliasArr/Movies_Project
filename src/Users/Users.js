import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
// import {MDBpagination,} from"mdb-react-ui-kit";
function Users() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios.get("http://localhost:9000/dbusers").then((res) => {
      setUsers(res.data.reverse());
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const quantityPageRef = useRef(8);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endPosition, setEndPosition] = useState(8);
  const handlePagination = (index) => {
    setEndPosition((index + 1) * quantityPageRef.current);
    setCurrentIndex(
      (index + 1) * quantityPageRef.current - quantityPageRef.current
    );
  };
  const handlePrev = () => {
    if (currentIndex) {
      setCurrentIndex(currentIndex - quantityPageRef.current);
      setEndPosition(endPosition - quantityPageRef.current);
    }
  };
  const handleNext = () => {
    if (endPosition < users.length) {
      setCurrentIndex(currentIndex + quantityPageRef.current);
      setEndPosition(endPosition + quantityPageRef.current);
    }
  };

  function Delete(id) {
    axios.delete(`http://localhost:9000/dbusers/${id}`).then(loadUsers());
  }

  return (
    <div>
      <div className="container">
        <center>
          <Link
            type="submit"
            className="btn btn-outline-primary btn-lg btn-block"
            style={{ width: "80%" }}
            to="/home/AddUser"
          >
            Add User
          </Link>
        </center>
      </div>

      <br />
      <center>
        <table className="table" style={{ width: "80%" }}>
          <thead>
            <tr className="bg-primary text-light">
              <th></th>
              <th>Name</th>
              <th>UserName</th>
              <th>Password</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.slice(currentIndex, endPosition).map((data, index) => (
              <tr key={index}>
                <td></td>
                <td>{data.Name} </td>
                <td>{data.Username}</td>
                <td>{data.Password}</td>
                <td>
                  <Link to={`/home/EditUser/${data.id}`}>
                    <img src="/edit.png" alt="edit" style={{ width: "25px" }} />
                  </Link>
                </td>
                <td>
                  <img
                    src="/delete1.png"
                    alt="delete1"
                    style={{ width: "25px" }}
                    onClick={() => Delete(data.id)}
                    type="submit"
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </center>
      <center>
        <div className="bg-primary" style={{ width: "80%" }}>
          <button className="btn btn-primary" onClick={handlePrev}>
            Previous
          </button>
          {Array(Math.ceil(users.length / quantityPageRef.current))
            .fill(null)
            .map((_, index) => (
              <button
                className="btn btn-primary"
                onClick={() => handlePagination(index)}
              >
                {index + 1}
              </button>
            ))}
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
        </div>
      </center>
    </div>
  );
}

export default Users;
