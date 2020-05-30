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
              
              await fetch(`https://localhost:44340/api/editCourse/${props.course.Id}`, {
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
        <div>
            <form id="editCourseForm">
                <div>
                    <input id="Title" name="Title" placeholder="Course title"/>
                </div>
                <div>
                    <input id="Capacity" name="Capacity" placeholder="Course capacity"/>
                </div>
                <div>
                    <input id="Department" name="Department" type="select"/>
                </div>
                <div>
                    <input id="Instructor" name="Instructor" type="select"/>
                </div>
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Save Changes</button>
                <button onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
    )
}