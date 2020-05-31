import React, { useState, useEffect } from 'react';
import Add from '../components/AddStudent'
import Edit from '../components/EditStudent'

export default function(){
    const [studentsList, setStudentsList] = useState([]);
    const [actualStudent, setActualStudent]  = useState([]);
    const [student, setStudent]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const filterStudents = () => {
        let insertedTitle = document.getElementById("searchInput").value;
        if(insertedTitle===''){
            setActualStudent(studentsList);
        }
        //shows the selected student according to the input
        else{
            setActualStudent( studentsList.filter( d => {
                return d.Title.toLowerCase().match(insertedTitle.toLowerCase());
            }))
        }
        
    }
    const manageEditWindow = async (e) => {
        await setStudent(e);
        console.log(actualStudent)
        setShowEdit(!showEdit);
    }
    const manageAddWindow = () => {
        setShowAdd(!showAdd);
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualStudent([]); //cleans the actual table
    }
    const deleteStudent = async (id) => {
        await fetch (`https://localhost:44340/api/deleteStudent/${id}`,{
            method: 'DELETE'
        })
        await refreshList();  //loads the new list of students
    }
    useEffect( () => {
        ( async () => {
            let response;
            let res = await fetch('https://localhost:44340/api/students');
            response = await res.json();
            setStudentsList(response);
        }) ()
    }, [changed])

    return ( 
        <>
            <h1>Students List</h1>
            <label>Title:
                <input id="searchInput" placeholder="Search by title"></input>
            </label>
            <button onClick={filterStudents} type="button">Search</button>
            <button onClick={manageAddWindow} type="button">Add Student</button>
            <table>
                <thead>
                    <tr>
                        <th>Student ID</th>
                        <th>Fullname</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actualStudent.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.Id}</td>
                            <td>{`${e.LastName}, ${e.Name}`}</td>
                            <td><button onClick={() => manageEditWindow(e)} type="button" >Edit</button></td>
                            <td><button onClick={() => deleteStudent(e.Id)} type="button" >Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} student={student} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
        </>
     );
}
