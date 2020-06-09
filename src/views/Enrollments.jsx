import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext'

export default function(){
    const appContext = useContext(UserContext);
    const { loggedUser } = appContext;
    const [studentEnrollments, setStudentEnrollments] = useState([]);
    const [coursesList, setCoursesList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);
    const [actualCourse, setActualCourse]  = useState([]);
    const [changed, setChanged] = useState(false);
    const filterCourses = () => {
        let insertedTitle = document.getElementById("searchCourse").value;
        let selectedDepartment = document.getElementById("selectDpt").value;
        //shows every course if both the input and select are empty
        if(insertedTitle==='' && selectedDepartment===''){
            setActualCourse(coursesList);
        }
        //shows the selected course according to the input and select
        else{
            let filteredCourses = [];
            filteredCourses = coursesList.filter( e => {
                if (insertedTitle !== ''){
                    return e.CourseTitle.toLowerCase().match(insertedTitle.toLowerCase());
                }
                else{
                    return e;
                }
            })
            setActualCourse( filteredCourses.filter( e => {
                return e.DepartmentTitle.match(selectedDepartment);
            }))
        }
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualCourse([]); //cleans the actual table
    }
    const enrollIntoCourse = async (e) => {
        let json = JSON.stringify(loggedUser);
        await fetch(`https://localhost:44340/api/addEnrollment/${e.CourseId}`, {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: json
            })
        await refreshList();  //loads the new list of departments
    }
    const deleteEnrollment = async (cId, sId) => {
        await fetch (`https://localhost:44340/api/deleteEnrollment/${cId}/${sId}`,{
            method: 'DELETE'
        });
        await refreshList();
    }
    useEffect( () => {
        ( async () => {
            let response;
            //courses get
            let res = await fetch('https://localhost:44340/api/courses');
            response = await res.json();
            setCoursesList(response);
            //departments get
            res = await fetch('https://localhost:44340/api/departments');
            response = await res.json();
            setDepartmentsList(response);
            //get enrollments by student
            console.log(loggedUser)
            res = await fetch(`https://localhost:44340/api/studentEnrollments/${loggedUser.Id}`);
            response = await res.json();
            setStudentEnrollments(response);
        }) ()
    }, [changed, loggedUser])

    return ( 
        <>
            <h1>{loggedUser.Name}'s courses</h1>
            {studentEnrollments.length > 0 ?  <table className="table">
                <thead className="thead"> 
                    <tr>
                        <th>Student ID</th>
                        <th>Course title</th>
                        <th>Fulname</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {studentEnrollments.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.StudentId}</td>
                            <td>{e.CourseTitle}</td>
                            <td>{e.StudentFullName}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteEnrollment(e.CourseId, e.StudentId)} type="button">Disenroll</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            : <p>You aren't enrolled in any course yet.</p>
    }

            <h1>Course Enrollment</h1>
            <div className="container w-50">
                <label>
                    <select id="selectDpt" name="filterDepartment" onChange={filterCourses}>
                        <option value="">All</option>
                        {departmentsList.map((e,index) =>
                            <option value={e.Title} key={index}>{e.Title}</option>
                            
                        )} 
                    </select>
                </label>
                <label>
                    <input className="card m-1" id="searchCourse" placeholder="Search by name"></input>
                </label>
                <button onClick={filterCourses} type="button" className="btn btn-secondary">Search</button>
            </div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Capacity</th>
                        <th>Department title</th>
                        <th>Instructor name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {actualCourse.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.CourseId}</td>
                            <td>{e.CourseTitle}</td>
                            <td>{e.CourseCapacity}</td>
                            <td>{e.DepartmentTitle}</td>
                            <td>{e.InstructorFullName}</td>
                            <td><button onClick={() => enrollIntoCourse(e)} type="button" className="btn btn-success" >Enroll</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
     );
}