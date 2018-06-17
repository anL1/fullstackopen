import React from 'react'

const Contact = ({ person, remove }) => (
    <div>
        {person.name} {person.number} <button onClick={remove} >poista</button>
    </div>
)

export default Contact