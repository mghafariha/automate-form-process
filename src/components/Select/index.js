import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {changeField} from '../../store/actions'
import { isArray } from 'util';


class Select extends React.Component {
    
    constructor(props) {
        super(props);
        console.log('select',props);
        this.state={ selectedOption: null, multiValue: [],isDisabled:false}
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        var options=selectedOption;
        if(Array(isArray(options))){
          var value="";
          options.reducer((acc,itm)=>{return result+itm.value+","},'')
          this.props.dispatch(changeField(this.props.internalName,value))
        }
        else {
            this.props.dispatch(changeField(this.props.internalName,selectedOption.value))
        }
    }


    render() {
       
            let { InternalName, value,Choices } = this.props.field;
           return this.props.render({internalName:InternalName,value,multiple:this.props.multiple,options:Choices.results.map(opt=>({value: opt, label: opt})), onChange: this.handleChange })
    }
}
const mapStateToProps=(state,props)=>({field:state.fields[props.internalName],value:state.fields[props.internalName].value})
export default connect(mapStateToProps)(Select)