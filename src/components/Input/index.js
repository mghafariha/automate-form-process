import React from 'react';
import { connect } from 'react-redux'
import { changeField } from '../../store/actions'

class Input extends React.Component {

    constructor(props) {

        super(props);
    }
    // if not arrow function you should bind handleChange in constructor => this.handleChange =  this.handleChange.bind(this)
    handleChange = (e) => {
        this.props.dispatch(changeField(this.props.internalName, e.target.value))
    }
    render() {
        let { InternalName, defaultValue, value } = this.props.field
       return this.props.render({ onChange: this.handleChange, internalName: InternalName, defaultValue, value, ...this.props })
    }
}

const mapStateToProps = (state,props) => ({ field: state.fields[props.internalName],value:state.fields[props.internalName].value})

export default connect(mapStateToProps)(Input)
