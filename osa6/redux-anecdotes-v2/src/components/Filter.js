import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class Filter extends React.Component {
    handleChange = (event) => {
        this.props.filterChange(event.target.value)
    }
    render() {
        const style = {
            marginBottom: 20,
            marginTop: 20
        }

        return (
            <div style={style}>
                filter <input onChange={this.handleChange} />
            </div>
        )
    }
}

const connectedFilter = connect(
    (state) => ({ filter: state.filter }),
    { filterChange }
)(Filter)

export default connectedFilter