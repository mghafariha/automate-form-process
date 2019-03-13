import React from 'react'
class Span extends React.Component{

    constructor(props){

        super(props);
    }
    render(){
        return(<span>{this.props.value}</span>)
    }
}
export default Span