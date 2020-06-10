import React from 'react';
import '../style/style.css'

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
            let formElem = document.getElementById("addCourseForm");
            let formData = new FormData(formElem);              
            let object = {};
            formData.forEach((value, key) => {
                  object[key] = value;
            });
            let json = JSON.stringify(object);
            console.log(json);
            await fetch('https://localhost:44340/api/addCourse', {
                method: 'POST',
                headers: {
                  "Content-Type": "application/json"
                },
                body: json
            })
            await props.refresh();
            props.closeWindow();

        }
    return(
        <div className="modal-CSS">
        <div className="container card w-25 mt-5">
            <form id="addCourseForm" className="m-2">
                <div className="text-left">
                <span>Title:</span>
                    <input className="input-group input-group-text m-1" id="Title" name="Title" placeholder="Course title"/>
                </div>
                <div className="text-left">
                <span>Capacity:</span>
                    <input className="input-group input-group-text m-1" id="Capacity" name="Capacity" type="number" placeholder="Course capacity"/>
                </div>
                <div className="d-flex justify-content-center">
                    <span>Department:</span>
                    <select id="selectDepartment" name="DepartmentId" className="card m-1">
                        {props.departments.map((e,index) =>
                            <option value={e.Id} key={index}>{e.Title}</option>
                        )}
                    </select>
                </div>
                <div className="d-flex justify-content-center">
                    <span>Instructor:</span>
                <select id="selectInstructor" name="InstructorId" className="card m-1">
                        {props.instructors.map((e,index) =>
                            <option value={e.Id} key={index}>{e.LastName}</option>
                        )}
                    </select>
                </div>
                <button id="submit" className="btn btn-outline-success m-1" onClick={submitForm}>Add Course</button>
                <button className="btn btn-outline-danger m-1" onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
        </div>
    )
}