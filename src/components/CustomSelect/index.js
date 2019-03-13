import React from 'react'
import {connect} from 'react-redux'
import {changeField} from '../../store/actions'
import {getLookupItems} from '../../api'


class CustomSelect extends React.Component{
constructor(props){
    super(props);
   this.state={
       options:[]
    }

}
shouldComponentUpdate(nextProps, nextState){
    return (JSON.stringify(this.props) != JSON.stringify(nextProps) || JSON.stringify(nextState) != JSON.stringify(this.state))
}
componentWillReceiveProps(nextProps)
{
 if(JSON.stringify(this.props.reduxContainFields) != JSON.stringify(nextProps.reduxContainFields)){
    this.loadPosts(nextProps)
 }
}

loadPosts(){
    // do something with props
    let field= this.props.field;
    let query=field.Query;

    let { containFields } = this.props
    let fieldsStr=new RegExp(Object.keys(this.props.reduxContainFields).map((key)=>("{{"+key+"}}")).join("|"),"gi")
    query= query.replace(fieldsStr,matched=>(this.props.reduxContainFields[matched.substring(2,matched.length-2)]));

    getLookupItems({...field,query:query}).then((response) => {
        const options = response.data.d.results
            this.setState({
                 options: options // options
             });
             this.props.dispatch(changeField(this.props.internalName, ''))
          }).
         catch((error) => console.log(error));
  }
componentDidMount(){
        this.loadPosts()
     }
render(){ 
    let {InternalName,value,multiple}=this.props.field;
    return this.props.render({internalName:InternalName,value,multiple,options:this.state.options})
}
    
}

const mapStateToProps = (state, props) => ({
     field: state.fields[props.internalName], 
     reduxContainFields: props.containFields.reduce(
         (acc, internalName) => Object.assign(acc, {[internalName]: state.fields[internalName].value}),
         {}
        ) 
        })

export default connect(mapStateToProps)(CustomSelect)