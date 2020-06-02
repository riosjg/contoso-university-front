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
        <div>
            <form id="addCourseForm">
                <div>
                    <input id="Title" name="Title" placeholder="Course title"/>
                </div>
                <div>
                    <input id="Capacity" name="Capacity" type="number" placeholder="Course capacity"/>
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
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Add Course</button>
                <button onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
    )
}