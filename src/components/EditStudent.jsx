import React from 'react';

export default function(props){
    const submitForm = async (e) => {
            e.preventDefault();
              let formElem = document.getElementById("editDepForm");
              let formData = new FormData(formElem);              
              let object = {};
              formData.forEach((value, key) => {
                  object[key] = value;
              });
              let json = JSON.stringify(object);
              console.log(json);
              
              await fetch(`https://localhost:44340/api/editStudent/${props.student.Id}`, {
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
            <form id="editDepForm">
                <div>
                    <input id="lastName" name="lastName" placeholder={props.student.LastName}/>
                </div>
                <div>
                    <input id="Name" name="Name" placeholder={props.student.Name}/>
                </div>
                <button id="submit" className="submit btn btn-primary" onClick={submitForm}>Save</button>
                <button onClick={() => props.closeWindow()}>Cancel</button>
            </form>
        </div>
    )
}