import React from 'react';
import { connect } from 'react-redux'
import { changeDetailFieldValue } from '../../../store/actions'

// import './calender.css'

class Date extends React.Component {
    constructor(props)
    {
        super(props); 
    }
    handleChange=(e)=>{
        console.log(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e)
        this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e))
    }
    render() {
        let {InternalName}=this.props.field;
    return this.props.render({internalName:InternalName,onChange:this.handleChange})
   }
}

const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(Date)

