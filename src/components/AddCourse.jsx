import React from 'react';

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
        <div className="container card w-25">
            <form id="addCourseForm" className="m-2">
                <div>
                    <input className="input-group input-group-text m-1" id="Title" name="Title" placeholder="Course title"/>
                </div>
                <div>
                    <input className="input-group input-group-text m-1" id="Capacity" name="Capacity" type="number" placeholder="Course capacity"/>
                </div>
                <div>
                    <select id="selectDepartment" name="DepartmentId">
                        {props.departments.map((e,index) =>
                            <option value={e.Id} key={index}>{e.Title}</option>
                        )}
                    </select>
                </div>
                <div>
                <select id="selectInstructor" name="InstructorId">
                        {props.instructors.map((e,index) =>
                            <option value={e.Id} key={index}>{e.LastName}</option>
                        )}
                    </select>
                </div>
                <button id="submit" className="btn btn-outline-success m-1" onClick={submitForm}>Add Course</button>
                <button className="btn btn-outline-danger m-1" onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
    )
}