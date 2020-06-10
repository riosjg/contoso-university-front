import React from 'react';
import '../style/style.css'

export default function(props){
return(
<>
<div className="modal-CSS">
<div className="container d-flex  justify-content-center mt-5">
    <div className="card w-25 d-flex">
    <p>Are you sure that you want to delete <span>"{props.elDescription}"?</span> </p>
    <button onClick={() => props.deleteElement(props.elId)} type="button" className="btn btn-danger w-50 mx-auto my-1">Confirm</button>
    <button onClick={() => props.closeWindow()} type="button" className="btn btn-secondary w-50 mx-auto my-1">Cancel</button>
    </div>
</div>
</div>
</>
)
}