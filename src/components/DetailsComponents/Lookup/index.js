import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import {changeDetailFieldValue} from '../../../store/actions'
import { getLookupItems } from '../../../api'

class Lookup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            options: [],
        }
    }
    handleChange = (e) => {
        console.log('change', e.target.value)
        console.log('sdfsdfsf', this.props.field)

        if (this.props.multiple) {
            var options = e.target.options;
            var value = "";
            for (var i = 0, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    value += (options[i].value) + ",";
                }
                
            }
            value.slice(0, -1);
            console.log(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value)
            this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, value))
            
        }
        else {
            console.log(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value)
            this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, e.target.value))
            
        }
    }
    componentDidMount() {
        console.log('lookup ddddd:', this.props)
        let field=this.props
        getLookupItems({...field}).then((response) => {
            const options = response.data.d.results
            this.setState({
                options: options // options
            });
        });
    }

    shouldComponentUpdate(){
        return true
    }

    render() {
       // console.log('lookup',this.props.field)
       // let { value } =this.props

       let{InternalName,value,multiple}=this.props.field;
        return this.props.render({internalName:InternalName,options:this.state.options,value:value.substring(0,value.indexOf(';')),multiple,onChange:this.handleChange})
    }
}

// let { masterdetailFieldName, internalName, rowId, value} = action.field
//         let oldMasterField = state[masterdetailFieldName]
//         let oldField1 = state[masterdetailFieldName].rows[rowId][internalName]
//         let newMasterRows = oldMasterField.rows.map((row, index) => rowId == index ? {...row, [internalName]: {...oldField1, value } } : row)
//       return {...state, [masterdetailFieldName]: {...oldMasterField, rows: newMasterRows } }





const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(Lookup)
