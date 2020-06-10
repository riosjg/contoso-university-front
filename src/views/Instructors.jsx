import React, { useState, useEffect } from 'react';
import '../style/style.css'
import Add from '../components/AddInstructor'
import Edit from '../components/EditInstructor'
import Delete from '../components/DeleteModal'
import edit from '../img/edit.png'
import remove from '../img/remove.png'
import add from '../img/add.png'
import search from '../img/search.png'

export default function(){
    const [instructorsList, setInstructorsList] = useState([]);
    const [actualInstructor, setActualInstructor]  = useState([]);
    const [instructor, setInstructor]  = useState([]);
    const [changed, setChanged] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const filterInstructors = () => {
        let insertedName = document.getElementById("searchInstInput").value;
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
    const manageModal = async (e) => {
        await setInstructor(e);
        setShowModal(!showModal);
    }
    const refreshList = () => {
        setChanged(!changed);
        setActualInstructor([]); //cleans the actual table
    }
    const deleteInstructor = async (id) => {
        let res = await fetch('https://localhost:44340/api/courses');
        let response = await res.json();
        let found;
        console.log(response);
        response.forEach( c => {
            if(c.InstructorId === id){
                alert('This instructor has a course in charge')
                found = true;
            }
        })
        if(!found){
            await fetch (`https://localhost:44340/api/deleteInstructor/${id}`,{
                method: 'DELETE'
            })
        }
        await refreshList();  //loads the new list of departments
        await setShowModal(!showModal);
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
        <div className="bg">
            <h1>Instructor's List</h1>
            <div className="container w-50">
                <label>
                    <input className="card m-1" id="searchInstInput" placeholder="Search by name"></input>
                </label>
                <button onClick={filterInstructors} type="button" className="btn btn-outline-secondary m-1"><span><img src={search} width="25px"/></span></button>
                <button onClick={manageAddWindow} type="button" className="btn btn-outline-success m-1"><span><img src={add} width="25px"/></span></button>
            </div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        <th>Instructor ID</th>
                        <th>Name</th>
                        <th>Hire Date</th>
                        <th colSpan="2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {actualInstructor.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.Id}</td>
                            <td>{`${e.LastName.slice(0, 1).toUpperCase()}${e.LastName.slice(1)}, ${e.Name.slice(0, 1).toUpperCase()}${e.Name.slice(1)}`}</td>
                            <td>{e.HireDate.slice(8, 10)}/{e.HireDate.slice(5, 7)}/{e.HireDate.slice(0, 4)}</td>
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
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} instructor={instructor} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
            {showModal && <Delete closeWindow={() => setShowModal(!showModal)} refresh={() => refreshList()} elDescription={instructor.Name + ' ' + instructor.LastName} elId={instructor.Id} deleteElement={deleteInstructor}/>}

        </div>
     );
}