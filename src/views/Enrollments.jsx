import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext'

export default function(){
    const appContext = useContext(UserContext);
    const { loggedUser } = appContext;
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
    useEffect( () => {
        ( async () => {
            let response;
            let res = await fetch('https://localhost:44340/api/courses');
            response = await res.json();
            //courses get
            setCoursesList(response);
            res = await fetch('https://localhost:44340/api/departments');
            response = await res.json();
            //departments get
            setDepartmentsList(response);
            //instructors get
        }) ()
    }, [changed])

    return ( 
        <>
            <h1>Course Enrollment</h1>
            <label>Department
            <select id="selectDpt" name="filterDepartment" onChange={filterCourses}>
                <option value="">All</option>
                {departmentsList.map((e,index) =>
                    <option value={e.Title} key={index}>{e.Title}</option>
                    
                )} 
            </select>
            </label>
            <label>Name:
                <input id="searchCourse" placeholder="Search by name"></input>
            </label>
            <button onClick={filterCourses} type="button">Search</button>
            <table>
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Capacity</th>
                        <th>Department title</th>
                        <th>Instructor name</th>
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
                            <td><button onClick={() => enrollIntoCourse(e)} type="button" >Enroll</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
     );
}