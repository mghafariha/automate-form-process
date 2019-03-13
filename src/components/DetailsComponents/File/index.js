import React from 'react';
import {connect} from 'react-redux';

import { Upload, message, Button, Icon } from 'antd';
import 'antd/dist/antd.css';
import {changeDetailFieldValue} from '../../../store/actions';
//import Files from 'react-files'
 
import {URL} from '../../../api';

//import ReactUploadFile from 'react-upload-file';

class File extends React.Component{
  
  constructor(props){
        super(props);
        
    }

    handleChange(info) {
       
      }
  
    render(){
      let {InternalName,value}=this.props.field;
        return this.props.render({internalName:InternalName,value,onChange:this.handleChangeChange})
    }

     
}
const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(File)

