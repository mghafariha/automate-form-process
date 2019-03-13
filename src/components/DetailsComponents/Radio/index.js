
import React from 'react'
import {connect} from 'react-redux'
import {changeField} from '../../../store/actions'
class Radio extends React.Component{
    constructor(props)
    {
        super(props);
    }
    handleChange=(e)=>{
        this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value))
    }
    render(){
    let {value,InternalName}=this.props.field;
        return this.props.render({internalName:InternalName,value,onChange:this.handleChange,...this.props})
    }
}

const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(Radio)

