import React, { useState, useEffect } from 'react';
import Add from '../components/AddCourse'
import Edit from '../components/EditCourse'
import Delete from '../components/DeleteModal'
import Enrolls from '../components/EnrollsByCourse'
import edit from '../img/edit.png'
import remove from '../img/remove.png'
import students from '../img/students.png'
import add from '../img/add.png'
import search from '../img/search.png'

export default function(){
    const [coursesList, setCoursesList] = useState([]);
    const [departmentsList, setDepartmentsList] = useState([]);
    const [instructorsList, setInstructorsList] = useState([]);
    const [actualCourse, setActualCourse]  = useState([]);
    const [course, setCourse]  = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEnrolls, setShowEnrolls] = useState(false);
    const filterCourses = () => {
        let insertedTitle = document.getElementById("searchCourseInput").value;
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
    const manageEditWindow = async (e) => {
        await setCourse(e);
        console.log(instructorsList)
        setShowEdit(!showEdit);
    }
    const manageAddWindow = () => {
        setShowAdd(!showAdd);
    }
    const manageModal = async (e) => {
        await setCourse(e);
        setShowModal(!showModal);
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
    const getEnrollments = async (course) => {
        let response;
        let res = await fetch (`https://localhost:44340/api/enrollments/${course.CourseId}`,{
        })
        response = await res.json();
        setEnrollments(response);
        setCourse(course);
        setShowEnrolls(!showEnrolls);
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
        <div className="bg">
            <h1>Courses' List</h1>
            <div className="container w-50">
            Title:
                <label>
                    <select className="card m-1" id="selectDpt" name="filterDepartment" onChange={filterCourses}>
                        <option value="">All</option>
                        {departmentsList.map((e,index) =>
                            <option value={e.Title} key={index}>{e.Title}</option>
                            
                        )} 
                    </select>
                </label>
                <label>
                    <input className="card m-1" id="searchCourseInput" placeholder="Search by name"></input>
                </label>
                <button onClick={filterCourses} type="button" className="btn btn-outline-secondary m-1"><span><img src={search} width="25px"/></span></button>
                <button onClick={manageAddWindow} type="button" className="btn btn-outline-success m-1"><span><img src={add} width="25px"/></span></button>
            </div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Course ID</th>
                        <th>Title</th>
                        <th>Capacity</th>
                        <th>Department title</th>
                        <th>Instructor name</th>
                        <th colSpan="3" className="w-25">Actions</th>
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
                            <td width="7vw"><button className="btn btn-outline-warning" onClick={() => manageEditWindow(e)} >
                                <span><img src={edit} width="25px"/></span>
                                
                                </button></td>
                            <td width="7vw"><button className="btn btn-outline-danger" onClick={() => manageModal(e)} >
                                <span><img src={remove} width="25px"/></span>
                               
                                </button></td>
                            <td width="7vw"><button className="btn btn-outline-primary" onClick={() => getEnrollments(e)} >
                                <span><img src={students} width="25px"/></span>
                               
                                </button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} instructors={instructorsList} course={course} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} instructors={instructorsList} departments={departmentsList} />}
            {showModal && <Delete closeWindow={() => setShowModal(!showModal)} refresh={() => refreshList()} elDescription={course.CourseTitle} elId={course.CourseId} deleteElement={deleteCourse}/>}
            {showEnrolls && <Enrolls closeWindow={() => setShowEnrolls(!showEnrolls)} enrollments={enrollments} course={course} />}
        </div>
     );
}