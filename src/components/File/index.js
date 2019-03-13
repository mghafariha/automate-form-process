import React from 'react';
import {connect} from 'react-redux';



import {changeField} from '../../store/actions';
//import Files from 'react-files'
 
import {URL} from '../../api';

//import ReactUploadFile from 'react-upload-file';

class File extends React.Component{
  
  constructor(props){
        super(props);   
    }
    handleChange(info) {
      const reader = new FileReader();
      reader.onloadend = (obj) => {
        this.imageDataAsURL = obj.srcElement.result;
        const fileAsBinaryString = reader.result;
      };
      reader.readAsDataURL(info.file.originFileObj);
  
      }
  
    render(){
      let {InternalName,value,maxSize,format}=this.props.field;
        return this.props.render({internalName:InternalName,value,maxSize,format,onChange:this.handleChange})
    }

     
}
const mapStateToProps=(state,props)=>({field:state.fields[props.internalName],value:state.fields[props.internalName].value})
export default connect(mapStateToProps)(File);

