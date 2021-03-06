import React from 'react';

export default function(props){
    const deleteEnrollment = async (cId, sId) => {
        await fetch (`https://localhost:44340/api/deleteEnrollment/${cId}/${sId}`,{
            method: 'DELETE'
        })
        await props.closeWindow();
    }
    return ( 
        <>
            <h1>Students enrolled on {props.course.CourseTitle}</h1>
            <h3>Course ID: {props.course.CourseId}</h3>
    <h3>Remaining capacity: {props.course.CourseCapacity - props.enrollments.length}/{props.course.CourseCapacity}</h3>
            <table className="table">
                <thead className="thead"> 
                    <tr>
                        <th>Student ID</th>
                        <th>Course title</th>
                        <th>Fulname</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.enrollments.map( (e, index) =>
                        <tr key={index}>
                            <td>{e.StudentId}</td>
                            <td>{e.CourseTitle}</td>
                            <td>{e.StudentFullName}</td>
                            <td><button className="btn btn-danger" onClick={() => deleteEnrollment(e.CourseId, e.StudentId)} type="button">Disenroll</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}