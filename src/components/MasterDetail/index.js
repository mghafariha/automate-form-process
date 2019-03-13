import React from 'react'
import { connect } from 'react-redux'
import { addMasterDetailRow, setDetailFields, delMasterDetailRow,setValueDetailFields } from '../../store/actions'
import { getListFields,getData } from '../../api'
import Field from '../DetailsComponents/Field'


const transformFields = (fields) => {

    let obj = {};
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = fields[i].DefaultValue || "";
        obj[fields[i].InternalName] = fields[i];
    }
    return obj;
}
class MasterDetail extends React.Component {
    constructor(props) {

        super(props);
        this.state = { details: {} ,
        formName:''
    }

    }
    componentDidMount() {
        let field = this.props.fields[this.props.internalName];
        let listId = field.LookupList;
        let fieldValue=93;
        this.setState({formName:this.props.formName})
        console.log('formName',this.state.formName)

        getListFields(listId,'').then((response) => {

            // let date=transformFields(response.data.d.fields);
            //  let dataKeys=Object.keys(data);

            const results = transformFields(response.data.d.fields.filter(itm => field.RelatedFields.indexOf(itm.InternalName) != -1 || itm.InternalName=="ID"))
            this.setState({
                details: results // options
            });
            console.log('res', results)
            this.props.dispatch(setDetailFields(this.props.internalName, results))

           if(this.state.formName!=='New')
            {
               // Object.Values(this.props.fields).filter(a=>a.Type!='MasterDetail').map((itm)=>(itm.InternalName))
                getData(listId,field.MasterLookupName,fieldValue, Object.values(this.props.fields[this.props.internalName].fields).map((itm)=>(itm.InternalName)).toString()).then((res)=>{
                    console.log('data detail',JSON.parse(res.data.d));
                    this.props.dispatch(setValueDetailFields(JSON.parse(res.data.d),field))
                   console.log('detail fields', this.props.fields[field.InternalName].rows)
                  
                }).catch(function(error){
                    console.log(error);
                })

            }
         //   console.log('masterdetail', this.props.fields)
            //  this.props.dispatch(setFields(transformFields(response.data.d.fields)))
        });
    }
    render() {
        let field = this.props.fields[this.props.internalName]
        let headers = Object.keys(field.fields || {});
        let rows = field.rows || []
       // console.log('detail fieldddddd:',field.fields)
        return (
            <table>
                <thead>
                    <tr><th></th>{headers.map((header,index)=>{
                        return(<th key={index}>{header}</th>);
                    })}
                    </tr>
                </thead>
                <tbody>
                {rows.map((row, i) => 
                    <tr key={i}>
                    <td><button onClick={() => this.props.dispatch(delMasterDetailRow(this.props.internalName, i))}>del</button></td>
                    {
                        Object.values(field.fields).map((field, index) => <td key={index}>
                        <Field formName={this.state.formName}
                        masterdetailFieldName={this.props.internalName} 
                        value={this.props.fields[this.props.internalName].rows[i][field.InternalName]['value']}
                        rowId={i} 
                        internalName={field.InternalName}
                        {...field}
                        />
                       
                        </td>)
                    }
                    </tr>
                )}
                <tr><td><button onClick={() => this.props.dispatch(addMasterDetailRow(this.props.internalName))}>add</button></td></tr>
                </tbody>
            </table>

        )


    }
}
const mapStateToProps = state => ({ fields: state.fields })
export default connect(mapStateToProps)(MasterDetail)
