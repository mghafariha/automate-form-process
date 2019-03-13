import React from 'react';
import {connect} from 'react-redux'
import {changeField} from '../../store/actions'
class CheckBox extends React.Component{

    constructor(props){
        super(props)
    }
 handleChange=(e)=>{
       this.props.dispatch(changeField(this.props.internalName,e.target.value));
 }
    render(){
        let {InternalName,value}=this.props.field;

    return this.props.render(({onChange:this.handleChange,internalName:InternalName,value,...this.props}))

    }
}
const mapStateToProps = (state, props) => ({ value: state.fields[props.internalName].value,field: state.fields[props.internalName] })


export default connect(mapStateToProps)(CheckBox)