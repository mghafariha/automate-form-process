import React from 'react';
import {connect} from 'react-redux'
import {changeDetailFieldValue} from '../../../store/actions'
class CheckBox extends React.Component{

    constructor(props){
        super(props)
    }
 handleChange=(e)=>{
       console.log(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value)
       this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value))
 }
    render(){
        let {InternalName,value}=this.props.field;
    return this.props.render(({onChange:this.handleChange,internalName:InternalName,value,...this.props}))

    }
}

const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(CheckBox)

