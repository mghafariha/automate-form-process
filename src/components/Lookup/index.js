import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {changeField} from '../../store/actions'
import { getLookupItems } from '../../api'

class Lookup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            options: [],
            value:''
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
            this.props.dispatch(changeField(this.props.internalName,value))
        }
        else {
            this.props.dispatch(changeField(this.props.internalName, e.target.value))
        }
    }
    componentDidMount() {
        let field=this.props.field;
        getLookupItems( {LookupList:field.LookupList.substring(1,field.LookupList.length-1),LookupTitleField: field.LookupField,LookupValueField: 'ID',query:''}).then((response) => {
            const options = response.data.d.results
            this.setState({
                options: options,
                value:this.props.value // options
            });
        });
        console.log('lookup value 2',this.state.value)
    }

    shouldComponentUpdate(){
        return true
    }

    render() {
        console.log('lookup',this.props.field)
       // let { value } =this.props
       
       
       let{InternalName,value}=this.props.field;
        return this.props.render({internalName:InternalName,options:this.state.options,value:value,multiple:this.props.multiple,onChange:this.handleChange})
    }
}
const mapStateToProps = (state, props) => ({ value: state.fields[props.internalName].value,field: state.fields[props.internalName] })


export default connect(mapStateToProps)(Lookup)