import React from 'react'
    //  const car = () => <div>This is Component</div>
    //  export default car
    export default (props) =>(
        <div style = {{
            border:"1px solod #ccc",
            marginBottom:'10px'
        }}>
            <h3> Car name: {props.name}</h3>
           <p>Year: <strong>{props.year}</strong></p>
            <input type = 'text' onChange = {props.onChangeName} />
            {/* <button onClick = {props.onChangeTitle}>Click</button> */}
        </div>
    )

    
