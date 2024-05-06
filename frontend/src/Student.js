import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Student() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    //this useeffect hook is used to fetch data from the server when the component is mounted
    axios
      .get("http://localhost:8081")
      .then((res) => setStudent(res.data)) // console.log(res)) // log the response
      .catch((err) => console.log(err)); // log any errors
  }, []); //Empty dependency array, so its runs once on mount

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:8081/student/"+id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-10 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded">
        <Link to="/create" className="btn btn-success">
          Ajouter
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`update/${data.id}`} className="btn btn-primary">
                    Modifier
                  </Link>
                  <button
                    onClick={(e) => handleDelete(data.id)}
                    className="btn btn-danger ms-2"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Student;
