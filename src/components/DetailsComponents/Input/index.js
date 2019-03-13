import React from 'react';
import { connect } from 'react-redux'
import { changeDetailFieldValue } from '../../../store/actions'

class Input extends React.Component {

    constructor(props) {
        super(props);
    }
    // if not arrow function you should bind handleChange in constructor => this.handleChange =  this.handleChange.bind(this)
    handleChange = (e) => {
        console.log(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value)
        this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value))
    }
    render() {
        let { InternalName,value } = this.props.field
        return this.props.render({value, onChange: this.handleChange, internalName: InternalName })
    }
}


const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(Input)

