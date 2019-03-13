import React from 'react'
import { connect } from 'react-redux'
import { setFields, changeField } from '../../store/actions';


class Number extends React.Component {

    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.dispatch(changeField(this.props.internalName, e.target.value))
    }
    render() {
        let { InternalName, value, min, max, step } = this.props.field;
        return this.props.render({ onChange: this.handleChange, internalName: InternalName, value, ...this.props })
    }
}

const mapStateToProps = (state, props) => ({ field: state.fields[props.internalName],
                                             value: state.fields[props.internalName].value,
                                             errorMessage:state.fields[props.internalName].errorMessage})
export default connect(mapStateToProps)(Number)