import React, { Component } from "react";
import axios from "axios";

class Students extends Component {
  state = {
    students: []
  };

  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:3001/userReport").then(response => {
      //update the state with the response data
      this.setState({
        students: this.state.students.concat(response.data)
      });
    });
  }

  handleDelete(student) {
    axios.post("http://localhost:3001/userReport").then(response => {
      //update the state with the response data
      this.setState({
        students: this.state.students.concat(response.data)
      });
      const students = this.state.students.filter(
        s => s.studentId !== student.studentId
      );
      this.setState({ students });
    });
  }

  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Name</th>
              <th>Department</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.students.map(student => (
              <tr key={student.StudentID}>
                <td>{student.StudentID}</td>
                <td>{student.Name}</td>
                <td>{student.Department}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(student)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Students;
