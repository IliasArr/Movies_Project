import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Sitecss.css";
import { Link, useLoaderData } from "react-router-dom";
function SiteMovies() {
  const [moviesList, setMoviesList] = useState([]);
  const [Value, setValue] = useState("");
  const [startDateValue, setStartDateValue] = useState("");
  const [endDateValue, setEndDateValue] = useState("");
  const [minRating, setMinRating] = useState("");
  const [maxRating, setMaxRating] = useState("");

  const loadMovies = () => {
    axios.get("http://localhost:9000/dbMovies").then((res) => {
      setMoviesList(res.data.reverse());
    });
  };
  const handleReset = () => {
    loadMovies();
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   return await axios
  //   .get(`http://localhost:9000/dbMovies?Title_like=${Value}&date_gte=${startDateValue}&date_lte=${endDateValue}`)
  //     .then((res) => {
  //       setMoviesList(res.data);
  //       setValue("");
  //       setStartDateValue("");
  //       setEndDateValue("");
  //     })
  //     .catch((err) => console.log(err));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let endpoint = "http://localhost:9000/dbMovies";
  
    if (Value && (startDateValue || endDateValue) && (minRating || maxRating)) {
      endpoint += `?Title_like=${Value}`;
      if (startDateValue && endDateValue) {
        endpoint += `&date_gte=${startDateValue}&date_lte=${endDateValue}`;
      } else if (startDateValue) {
        endpoint += `&date_gte=${startDateValue}`;
      } else if (endDateValue) {
        endpoint += `&date_lte=${endDateValue}`;
      }
      if (minRating && maxRating) {
        endpoint += `&Rating_gte=${minRating}&Rating_lte=${maxRating}`;
      } else if (minRating) {
        endpoint += `&Rating_gte=${minRating}`;
      } else if (maxRating) {
        endpoint += `&Rating_lte=${maxRating}`;
      }
    } else if (Value) {
      endpoint += `?Title_like=${Value}`;
    } else if (startDateValue || endDateValue) {
      if (startDateValue && endDateValue) {
        endpoint += `?date_gte=${startDateValue}&date_lte=${endDateValue}`;
      } else if (startDateValue) {
        endpoint += `?date_gte=${startDateValue}`;
      } else if (endDateValue) {
        endpoint += `?date_lte=${endDateValue}`;
      }
    } else if (minRating || maxRating) {
      if (minRating && maxRating) {
        endpoint += `?Rating_gte=${minRating}&Rating_lte=${maxRating}`;
      } else if (minRating) {
        endpoint += `?Rating_gte=${minRating}`;
      } else if (maxRating) {
        endpoint += `?Rating_lte=${maxRating}`;
      }
    }
    return await axios
      .get(endpoint)
      .then((res) => {
        setMoviesList(res.data);
        setValue("");
        setStartDateValue("");
        setEndDateValue("");
        setMinRating("");
        setMaxRating("");
      })
      .catch((err) => console.log(err));
  };
  

  useEffect(() => {
    axios.get("http://localhost:9000/dbMovies").then((res) => {
      setMoviesList(res.data);
    });
  }, []);

  const quantityPageRef = useRef(10);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [endPosition, setEndPosition] = useState(10);
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
    if (endPosition < moviesList.length) {
      setCurrentIndex(currentIndex + quantityPageRef.current);
      setEndPosition(endPosition + quantityPageRef.current);
    }
  };
  return (
    <>
      <h2
        className="bg-black text-white"
        style={{ minHeight: "10vh", padding: "20px", textAlign: "left" }}
      >
        Movies Database
        <Link
          to="/"
          style={{ fontSize: "20px", float: "right", color: "white" }}
        >
          I'm Admin
        </Link>
      </h2>
      <div>
        <div className="row m-0">
          <div className="col-3">
            <form
              onSubmit={handleSubmit}
              style={{
                borderStyle: "outset",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <center>
                <br />
                <label style={{ marginLeft: "35px" }}> Keyword </label>
                <input
                  type="text"
                  className="form-control center"
                  style={{ width: "80%" }}
                  value={Value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <br />
                <label style={{ marginLeft: "35px" }}> Year from </label>
                <input
                  type="date"
                  style={{ width: "80%" }}
                  className="form-control"
                  value={startDateValue}
                  onChange={(e) => setStartDateValue(e.target.value)}
                />
                <br />
                <label style={{ marginLeft: "35px" }}> Year To </label>
                <input
                  type="date"
                  style={{ width: "80%" }}
                  className="form-control"
                  value={endDateValue}
                  onChange={(e) => setEndDateValue(e.target.value)}
                />
                <br />
                <label style={{ marginLeft: "35px" }}> Rating from </label>
                <input
                  type="text"
                  style={{ width: "80%" }}
                  className="form-control"
                  value={minRating}
                  onChange={(e) => setMinRating(e.target.value)}
                />
                <br />
                <label style={{ marginLeft: "35px" }}> Rating To </label>
                <input
                  type="text"
                  style={{ width: "80%" }}
                  className="form-control"
                  value={maxRating}
                  onChange={(e) => setMaxRating(e.target.value)}
                />
              </center>
              <br />
              <button
                className="form-control btn btn-primary"
                type="submit"
                style={{ width: "80%", display: "inline-block", borderRadius:"10px", marginBottom:"10px"}}
              >
                Searsh
              </button>
              <button
                className="form-control btn-secondary w-5"
                type="submit"
                style={{ width: "80%", display: "inline-block",borderRadius:"10px" }}
                onClick={() => handleReset()}
              >
                Reset
              </button>
              <br />
              <br />
            </form>
          </div>
          <div className="col-9" style={{ textAlign: "left" }}>
            {Array(Math.ceil(moviesList.length / quantityPageRef.current))
              .fill(null)
              .map((_, index) => (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handlePagination(index)}
                >
                  {index + 1}
                </button>
              ))}

            <br />
            {moviesList.length === 0 ? (
              <h4 className="noData">No Data Found</h4>
            ) : (
              moviesList.slice(currentIndex, endPosition).map((data, index) => (
                <Link to={`/Site_1/${data.id}`}>
                  {" "}
                  <div
                    class="image-tile"
                    key={index}
                    style={{
                      width: "18%",
                      display: "inline-block",
                      margin: "5px 5px",
                      textAlign: "left",
                      borderStyle: "outset",
                    }}
                  >
                    <img
                      src={data.img_url}
                      style={{ height: "100%" }}
                      alt="Image"
                    />
                    <div class="data">
                      <h4>{data.Title}</h4>
                      {data.Rating >= 7 ? (
                        <div
                          class="black-circle"
                          style={{ background: "green" }}
                        >
                          <div class="green-circle">
                            <span style={{ color: "white" }}>
                              {" "}
                              {data.Rating}
                            </span>
                          </div>
                        </div>
                      ) : data.Rating >= 5 ? (
                        <div
                          class="black-circle"
                          style={{ background: "yellow" }}
                        >
                          <div class="green-circle">
                            <span style={{ color: "white" }}>
                              {" "}
                              {data.Rating}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="black-circle"
                          style={{ background: "red" }}
                        >
                          <div class="green-circle">
                            <span style={{ color: "white" }}>
                              {" "}
                              {data.Rating}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            )}
            <center>
              <button
                className="btn btn-outline-primary"
                style={{ width: "250px" }}
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                className="btn btn-outline-primary"
                style={{ width: "250px" }}
                onClick={handleNext}
              >
                Next
              </button>
            </center>
          </div>
        </div>
      </div>
    </>
  );
}
export default SiteMovies

