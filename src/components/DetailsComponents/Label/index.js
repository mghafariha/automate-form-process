import React from 'react'

class Label extends React.Component{

    constructor(props){
        super(props)
    }
    render(){

        return(<label htmlFor={this.props.htmlFor}>{this.props.value}</label>)
    }
}
export default Label