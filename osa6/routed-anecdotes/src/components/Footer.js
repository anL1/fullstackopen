import React from 'react'
import { Panel } from 'react-bootstrap'

const Footer = () => {
    const footerStyle = {
        fontStyle: 'italic'
    }
    return (
        <Panel bsStyle="primary" >
            <Panel.Body>
                <div style={footerStyle}>
                    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
                </div>
            </Panel.Body>
            <Panel.Footer>
                <div style={footerStyle} >
                    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
                </div>
            </Panel.Footer>
        </Panel>
    )
}

export default Footer