import React from 'react'

const Form = (props) => (
    <div>
        <h2>Lisää uusi</h2>
        <form>
            <div>
                nimi: <input value={props.newName} onChange={props.handleName} />
            </div>
            <div>
                numero: <input value={props.newNumber} onChange={props.handleNumber} />
            </div>
            <div>
                <button type="submit" onClick={props.addContact} >lisää</button>
            </div>
        </form>
    </div>
)

export default Form