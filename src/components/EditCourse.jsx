import React from 'react';

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
              let formElem = document.getElementById("editCourseForm");
              let formData = new FormData(formElem);
              let object = {};
              formData.forEach((value, key) => {
                  object[key] = value;
              });
              let json = JSON.stringify(object);
              console.log(json);
              
              await fetch(`https://localhost:44340/api/editCourse/${props.course.CourseId}`, {
                method: 'PUT',
                headers: {
                  "Content-Type" : "application/json"
                },
                body: json
              })
                await props.refresh();
                props.closeWindow();
              

            //   .then(res => {
            //     if(res.
            //     }else{
            //       return new Promise.reject(res.json())ok){
            //       return res.json()
            //     }
            //   })
        }
    return(
        <div className="container card w-25">
            
            <form id="editCourseForm" className="m-2">
                <div>
                    <input className="input-group input-group-text m-1" value={props.course.CourseId} readOnly/>
                </div>
                <div>
                    <input className="input-group input-group-text m-1" id="CourseTitle" name="CourseTitle" value={props.course.CourseTitle} readOnly/>
                </div>
                <div>
                    <input className="input-group input-group-text m-1" id="DepartmentTitle" name="DepartmentTitle" value={props.course.DepartmentTitle} readOnly/>
                </div>
                <div>
                <select id="selectInstructor" name="InstructorId">
                        {props.instructors.map((e,index) =>
                            <option value={e.Id} key={index}>{e.LastName}</option>
                        )}
                    </select>
                </div>
                <div>
                    <input className="input-group input-group-text m-1" id="Capacity" name="Capacity" type="number" placeholder="Course capacity"/>
                </div>
                <button id="submit" className="btn btn-outline-success m-1" onClick={submitForm}>Save Changes</button>
                <button onClick={() => props.closeWindow()} className="btn btn-outline-danger m-1">Cancel</button>
            </form>
        </div>
    )
}