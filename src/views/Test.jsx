import React, { useState, useEffect } from 'react';

export default function(){
    const [studentsList, setStudentList] = useState([]);
    useEffect( () => {
        ( async () => {
            let response 
            let res = await fetch('https://localhost:44340/api/students/');
            response = await res.json();
            console.log(response)
            response && response.forEach( r => { r.Name = r.Name.charAt(0).toUpperCase() + r.Name.slice(1) }) //capitalizes first letter
            response && response.forEach( r => { r.LastName = r.LastName.charAt(0).toUpperCase() + r.LastName.slice(1) })
            setStudentList(response);
        }) ()
    }, [])

    return (
        <>
            <h1>Student's List</h1>
            {
                studentsList.length < 1 ? 
                <p>There aren't any students yet</p> :
                <ul>{studentsList.map( (student, index) => 
                    <li key={index}>{student.Id} {student.Name} {student.LastName}</li>
                )}
                </ul>
            }
        </>
     );
}