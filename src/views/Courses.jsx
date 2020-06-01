import React, { useState, useEffect } from 'react';
import Add from '../components/AddCourse'
import Edit from '../components/EditCourse'

export default function(){
    const [coursesList, setCoursesList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);
    const [instructorsList, setInstructorsList] = useState([]);
    const [actualCourse, setActualCourse]  = useState([]);
    const [course, setCourse]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const filterCourses = () => {
        let insertedName = document.getElementById("searchInput").value;
        let selectedDepartment = document.getElementById("selectFilter").value;
        //shows every department if the input is empty
        if(insertedName==='' && selectedDepartment===''){
            setActualCourse(coursesList);
        }
        //shows the selected Course according to the input
        else{
            setActualCourse( coursesList.filter( e => {
                let actual =  e.Name.toLowerCase().match(insertedName.toLowerCase());
                return actual.DepartmentTitle.match(selectedDepartment);
            }))
        }
    }
    const manageEditWindow = async (e) => {
        await setCourse(e);
        console.log(actualCourse)
        setShowEdit(!showEdit);
    }
    const manageAddWindow = () => {
        setShowAdd(!showAdd);
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualCourse([]); //cleans the actual table
    }
    const deleteCourse = async (id) => {
        await fetch (`https://localhost:44340/api/deleteCourse/${id}`,{
            method: 'DELETE'
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
            res = await fetch('https://localhost:44340/api/instructors');
            response = await res.json();
            setInstructorsList(response);
            //instructors get
        }) ()
    }, [changed])

    return ( 
        <>
            <h1>Courses' List</h1>
            <label>Department
                {console.log(departmentsList)}
            <select id="selectFilter" name="filterDepartment" onChange={filterCourses}>
                <option value="">All</option>
                {departmentsList.map((e,index) =>
                    <option value={e.Id} key={index}>{e.Title}</option>
                    
                )} 
            </select>
            </label>
            <label>Name:
                <input id="searchInput" placeholder="Search by name"></input>
            </label>
            <button onClick={filterCourses} type="button">Search</button>
            <button onClick={manageAddWindow} type="button">Add Bullshit</button>
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
                            <td>{e.InstructorName}</td>
                            <td><button onClick={() => manageEditWindow(e)} type="button" >Edit</button></td>
                            <td><button onClick={() => deleteCourse(e.Id)} type="button" >Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit ? <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} course={course} /> : null}
            {showAdd ? <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} instructors={instructorsList} departments={departmentsList} /> : null}
        </>
     );
}