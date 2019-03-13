import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {changeDetailFieldValue} from '../../../store/actions'


class Select extends React.Component {
    
    constructor(props) {
        super(props);
        console.log('select',props);
    }

    handleChange = (e) => {
        if (this.props.multiple) {
            var options = e.target.options;
            var value = "";
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value += (options[i].value) + ",";
                }
            }
            value.slice(0, -1);
            this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, value))
            
        }
        else {
            this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value))
        }
    }


    render() {
       
            let { InternalName, value,options,multiple} = this.props.field;
           return this.props.render({internalName:InternalName,value,multiple,options, onChange: this.handleChange })
    }
}

const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(Select)
