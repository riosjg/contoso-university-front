import React, { useState, useEffect } from 'react';
import Add from '../components/AddDepartment'
import Edit from '../components/EditDepartment'
import Delete from '../components/DeleteModal'
import edit from '../img/edit.png'
import remove from '../img/remove.png'
import add from '../img/add.png'
import search from '../img/search.png'

export default function(){
    const [departmentsList, setDepartmentsList] = useState([]);
    const [actualDepartment, setActualDepartment]  = useState([]);
    const [department, setDepartment]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const filterDepartments = () => {
        let insertedTitle = document.getElementById("searchDepInput").value;
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
    const manageModal = async (e) => {
        await setDepartment(e);
        setShowModal(!showModal);
    }
    const manageAddWindow = () => {
        setShowAdd(!showAdd);
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualDepartment([]); //cleans the actual table
    }
    const deleteDepartment = async (id) => {
        let res = await fetch('https://localhost:44340/api/courses');
        let response = await res.json();
        let found;
        console.log(response);
        response.forEach( c => {
            if(c.DepartmentId === id){
                alert('This department has a course in charge');
                found = true;
            }
        })
        if(!found){
            console.log("deletean2")
            await fetch (`https://localhost:44340/api/deleteDepartment/${id}`,{
                method: 'DELETE'
            })
        }
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
            <div className="container w-50">
                <label>
                    <input className="card m-1" id="searchDepInput" placeholder="Search by title"></input>
                </label>
                <button onClick={filterDepartments} type="button" className="btn btn-outline-secondary m-1"><span><img src={search} width="25px"/></span></button>
                <button onClick={manageAddWindow} type="button" className="btn btn-outline-success m-1"><span><img src={add} width="25px"/></span></button>
            </div>
            
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th scope="col">Department ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Description</th>
                        <th scope="col" colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actualDepartment.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.Id}</td>
                            <td>{`${e.Title.slice(0, 1).toUpperCase()}${e.Title.slice(1)}`}</td>
                            <td>{e.Description}</td>
                            <td width="7vw"><button className="btn btn-outline-warning" onClick={() => manageEditWindow(e)} >
                                <span><img src={edit} width="25px"/></span>
                                
                                </button></td>
                            <td width="7vw"><button className="btn btn-outline-danger" onClick={() => manageModal(e)} >
                                <span><img src={remove} width="25px"/></span>
                               
                                </button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} department={department} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
            {showModal && <Delete closeWindow={() => setShowModal(!showModal)} refresh={() => refreshList()} elDescription={department.Title} elId={department.Id} deleteElement={deleteDepartment}/>} 
        </>
     );
}
