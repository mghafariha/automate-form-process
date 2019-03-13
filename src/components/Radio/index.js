
import React from 'react'
import {connect} from 'react-redux'
import {changeField} from '../../store/actions'
class Radio extends React.Component{
    constructor(props)
    {
        super(props);
    }
    handleChange=(e)=>{
        this.props.dispatch(changeField(this.props.internalName,e.target.value));
    }
    render(){
    let {value,InternalName}=this.props.field;
        return this.props.render({internalName:InternalName,value,onChange:this.handleChange,...this.props})
    }
}
const mapStateToProps=(state,props)=>({field:state.fields[props.internalName],value:state.fields[props.internalName].value})
export default connect(mapStateToProps)(Radio)

