import React from 'react';

export default ({input, label, meta: { error, touched }}) => {
    return (
        <div>
            <label>{label}</label>
            <input style={{marginBottom:'.2em'}}{...input}/>
            <div className="red-text" style={{marginBottom:'1em'}}>{touched && error}</div>
            
        </div>
    );
}