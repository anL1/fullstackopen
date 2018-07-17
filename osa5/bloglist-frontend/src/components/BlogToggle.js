import React from 'react'

class BlogToggle extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
    }

    toggleVisibility = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        const showWhenVisible = { display: this.state.visible ? '' : 'none' }

        return (
            <div>
                <div style={blogStyle} onClick={this.toggleVisibility}>
                    {this.props.Label}
                </div>
                <div style={showWhenVisible}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

export default BlogToggle