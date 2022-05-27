import React from 'react';

//styles
import './Signup.css';

export default function PasswordRequirement({data}) {
    const label = data[0];
    const valid = data[1];

    return (
    <>
        <p className={valid ? 'highlight' : ''}><span></span> {label}</p>
    </>
  )
}
