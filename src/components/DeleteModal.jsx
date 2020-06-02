import React from 'react';


export default function(props){
return(
<>
<div>
    <p>¿Esta seguro? </p>
    <button onClick={() => props.deleteStudent(props.element.Id)} type="button">Eliminar</button>
    <button onClick={() => props.closeWindow()} type="button">Cancel</button>
</div>
</>
)
}