import React from 'react'
import {connect} from 'react-redux'
import {changeField} from '../../store/actions'

class TextArea extends React.Component{
constructor(props){
    super(props);
}
handleChange=(e)=>{
    this.props.dispatch(changeField(this.props.internalName,e.target.value))
}
render(){
    let {InternalName,value,cols,rows}=this.props.field
    return this.props.render({internalName:InternalName,value,cols,rows,onChange:this.handleChange})
  }
}

const mapStateToProps=(state,props)=>({field:state.fields[props.internalName],value:state.fields[props.internalName].value})
export default connect(mapStateToProps)(TextArea)