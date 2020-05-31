import React, { useState, useEffect } from 'react';
import Add from '../components/AddCourse'
import Edit from '../components/EditCourse'

export default function(){
    const [coursesList, setCoursesList] = useState([]);
    const [actualCourse, setActualCourse]  = useState([]);
    const [course, setCourse]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const filterCourses = () => {
        let insertedName = document.getElementById("searchInput").value;
        //if there are any department
        // if(departmentsList == ''){
        //     console.log("there aren't any department on the db");
        //     setActualDepartment(null);
        // }
        //shows every department if the input is empty
        if(insertedName===''){
            setActualCourse(coursesList);
        }
        //shows the selected Course according to the input
        else{
            setActualCourse( coursesList.filter( d => {
                return d.Name.toLowerCase().match(insertedName.toLowerCase());
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
            setCoursesList(response);
        }) ()
    }, [changed])

    return ( 
        <>
            <h1>Courses' List</h1>
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
                    </tr>
                </thead>
                <tbody>
                    {actualCourse.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.CourseId}</td>
                            <td>{e.CourseTitle}</td>
                            <td>{e.CourseCapacity}</td>
                            <td>{e.DepartmentTitle}</td>
                            <td><button onClick={() => manageEditWindow(e)} type="button" >Edit</button></td>
                            <td><button onClick={() => deleteCourse(e.Id)} type="button" >Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit ? <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} course={course} /> : null}
            {showAdd ? <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} /> : null}
        </>
     );
}