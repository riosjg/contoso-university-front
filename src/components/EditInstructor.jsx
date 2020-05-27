import React from 'react';

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
              let formElem = document.getElementById("editInsForm");
              let formData = new FormData(formElem);
              let object = {};
              formData.forEach((value, key) => {
                  object[key] = value;
              });
              let json = JSON.stringify(object);
              console.log(json);
              
              await fetch(`https://localhost:44340/api/editInstructor/${props.instructor.Id}`, {
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
            <form id="editInsForm">
                <div>
                    <input id="Id" name="Id" value={props.instructor.Id} readOnly/>
                </div>
                <div>
                    <input id="Name" name="Name" placeholder={props.instructor.Name}/>
                </div>
                <div>
                    <input id="LastName" name="LastName" placeholder={props.instructor.LastName}/>
                </div>
                <div>
                    <input id="HireDate" name="HireDate" type="date"/>
                </div>
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Save</button>
                <button onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
    )
}