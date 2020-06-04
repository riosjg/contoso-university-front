import React, { useState, useEffect } from 'react';
import Add from '../components/AddInstructor'
import Edit from '../components/EditInstructor'
import Delete from '../components/DeleteModal'

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
        <>
            <h1>Instructor's List</h1>
            <div className="container w-50">
                <label>
                    <input className="card m-1" id="searchInstInput" placeholder="Search by name"></input>
                </label>
                <button onClick={filterInstructors} className="btn btn-secondary m-1" type="button">Search</button>
                <button onClick={manageAddWindow} className="btn btn-secondary m-1"type="button">Add Instructor</button>
            </div>
            <table className="table">
                <thead className="thead">
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
                            <td><button onClick={() => manageEditWindow(e)} type="button" className="btn btn-warning">Edit</button></td>
                            <td><button type="button" onClick={() => manageModal(e)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showEdit && <Edit closeWindow={() => setShowEdit(!showEdit)} refresh={() => refreshList()} instructor={instructor} />}
            {showAdd && <Add closeWindow={() => manageAddWindow()} refresh={() => refreshList()} />}
            {showModal && <Delete closeWindow={() => setShowModal(!showModal)} refresh={() => refreshList()} elDescription={instructor.Name + ' ' + instructor.LastName} elId={instructor.Id} deleteElement={deleteInstructor}/>}

        </>
     );
}