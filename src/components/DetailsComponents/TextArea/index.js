import React from 'react'
import {connect} from 'react-redux'
import {changeDetailFieldValue} from '../../../store/actions'

class TextArea extends React.Component{
constructor(props){
    super(props);
}
handleChange=(e)=>{
    this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value))
    
}
render(){
    let {InternalName,value,cols,rows}=this.props.field
    return this.props.render({internalName:InternalName,value,cols,rows,onChange:this.handleChange})
  }
}


const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(TextArea)