import React, { useState, useEffect } from 'react';
import Add from '../components/AddDepartment'
import Edit from '../components/EditDepartment'

export default function(){
    const [departmentsList, setDepartmentsList] = useState([]);
    const [actualDepartment, setActualDepartment]  = useState([]);
    const [department, setDepartment]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const filterDepartments = () => {
        let insertedTitle = document.getElementById("searchInput").value;
        //if there are any department
        // if(departmentsList == ''){
        //     console.log("there aren't any department on the db");
        //     setActualDepartment(null);
        // }
        //shows every department if the input is empty
        if(insertedTitle===''){
            setActualDepartment(departmentsList);
        }
        //shows the selected department according to the input
        else{
            setActualDepartment( departmentsList.filter( d => {
                return d.Title.toLowerCase().match(insertedTitle.toLowerCase());
            }))
        }
        
    }
    const manageEditWindow = async (e) => {
        await setDepartment(e);
        console.log(actualDepartment)
        setShowEdit(!showEdit);
    }
    const manageAddWindow = () => {
        setShowAdd(!showAdd);
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualDepartment([]); //cleans the actual table
    }
    const deleteDepartment = async (id) => {
        await fetch (`https://localhost:44340/api/deleteDepartment/${id}`,{
            method: 'DELETE'
        })
        await refreshList();  //loads the new list of departments
    }
    useEffect( () => {
        ( async () => {
            let response;
            let res = await fetch('https://localhost:44340/api/departments');
            response = await res.json();
            setDepartmentsList(response);
        }) ()
    }, [changed])

    return ( 
        <>
            <h1>Departments List</h1>
            <label>Title:
                <input id="searchInput" placeholder="Search by title"></input>
            </label>
            <button onClick={filterDepartments} type="button">Search</button>
            <button onClick={manageAddWindow} type="button">Add Bullshit</button>
            <table>
                <thead>
                    <tr>
                        <th>Department ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actualDepartment.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.Id}</td>
                            <td>{e.Title}</td>
                            <td>{e.Description}</td>
                            <td><button onClick={() => manageEditWindow(e)} type="button" >Edit</button></td>
                            <td><button onClick={() => deleteDepartment(e.Id)} type="button" >Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} department={department} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
        </>
     );
}
