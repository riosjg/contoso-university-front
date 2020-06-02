import React, { useState, useEffect } from 'react';
import Add from '../components/AddInstructor'
import Edit from '../components/EditInstructor'

export default function(){
    const [instructorsList, setInstructorsList] = useState([]);
    const [actualInstructor, setActualInstructor]  = useState([]);
    const [instructor, setInstructor]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const filterInstructors = () => {
        let insertedName = document.getElementById("searchInput").value;
        //if there are any department
        // if(departmentsList == ''){
        //     console.log("there aren't any department on the db");
        //     setActualDepartment(null);
        // }
        //shows every department if the input is empty
        if(insertedName===''){
            setActualInstructor(instructorsList);
        }
        //shows the selected Instructor according to the input
        else{
            setActualInstructor( instructorsList.filter( d => {
                return d.Name.toLowerCase().match(insertedName.toLowerCase());
            }))
        }
        
    }
    const manageEditWindow = async (e) => {
        await setInstructor(e);
        console.log(actualInstructor)
        setShowEdit(!showEdit);
    }
    const manageAddWindow = () => {
        setShowAdd(!showAdd);
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualInstructor([]); //cleans the actual table
    }
    const deleteInstructor = async (id) => {
        await fetch (`https://localhost:44340/api/deleteInstructor/${id}`,{
            method: 'DELETE'
        })
        await refreshList();  //loads the new list of departments
    }
    useEffect( () => {
        ( async () => {
            let response;
            let res = await fetch('https://localhost:44340/api/instructors');
            response = await res.json();
            setInstructorsList(response);
        }) ()
    }, [changed])

    return ( 
        <>
            <h1>Instructor's List</h1>
            <label>Name:
                <input id="searchInput" placeholder="Search by name"></input>
            </label>
            <button onClick={filterInstructors} type="button">Search</button>
            <button onClick={manageAddWindow} type="button">Add Instructor</button>
            <table>
                <thead>
                    <tr>
                        <th>Instructor ID</th>
                        <th>Name</th>
                        <th>Hire Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actualInstructor.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.Id}</td>
                            <td>{`${e.LastName.slice(0, 1).toUpperCase()}${e.LastName.slice(1)}, ${e.Name.slice(0, 1).toUpperCase()}${e.Name.slice(1)}`}</td>
                            <td>{e.HireDate.slice(8, 10)}/{e.HireDate.slice(5, 7)}/{e.HireDate.slice(0, 4)}</td>
                            <td><button onClick={() => manageEditWindow(e)} type="button" >Edit</button></td>
                            <td><button onClick={() => deleteInstructor(e.Id)} type="button" >Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} instructor={instructor} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
        </>
     );
}