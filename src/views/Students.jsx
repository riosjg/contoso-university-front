import React, { useState, useEffect } from 'react';
import Add from '../components/AddStudent'
import Edit from '../components/EditStudent'
import Delete from '../components/DeleteModal'
import edit from '../img/edit.png'
import remove from '../img/remove.png'
import add from '../img/add.png'
import search from '../img/search.png'

export default function(){
    const [studentsList, setStudentsList] = useState([]);
    const [actualStudent, setActualStudent]  = useState([]);
    const [student, setStudent]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);

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
        setShowEdit(!showEdit);
    }
    const manageModal = async (e) => {
        await setStudent(e);
        setShowModal(!showModal);
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
        await setShowModal(!showModal);
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
            <div className="container w-50">
                <label>
                    <input className="card m-1" id="searchInput" placeholder="Search by title"></input>
                </label>
                <button onClick={filterStudents} type="button" className="btn btn-outline-secondary m-1"><span><img src={search} width="25px"/></span></button>
                <button onClick={manageAddWindow} type="button" className="btn btn-outline-success m-1"><span><img src={add} width="25px"/></span></button>
            </div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th scope="col">Student ID</th>
                        <th scope="col">DNI</th>
                        <th scope="col">Fullname</th>
                        <th scope="col" colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actualStudent.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.Id}</td>
                            <td>{e.Dni}</td>
                            <td>{`${e.LastName.slice(0, 1).toUpperCase()}${e.LastName.slice(1)}, ${e.Name.slice(0, 1).toUpperCase()}${e.Name.slice(1)}`}</td>
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
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} student={student} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
            {showModal && <Delete closeWindow={() => setShowModal(!showModal)} refresh={() => refreshList()} elDescription={student.Name + ' ' + student.LastName} elId={student.Id} deleteElement={deleteStudent}/>} 
        </>
     );
}
