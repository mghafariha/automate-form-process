import React from 'react'
import { connect } from 'react-redux'

import {  saveData,getData, getListFields } from '../api'
import { setFields, setServerErrors, setFormName,setValueFields } from '../store/actions'

import Field from '../components/Field'
import { access } from 'fs';



const transformFields = (fields) => {

    let obj = {};
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = fields[i].DefaultValue || "";
        obj[fields[i].InternalName] = fields[i];
    }
    return obj;
}
// const transformFields =(fields)=>R.pipe(
//     R.map(R.assoc('value',''),fields),
//     R.reduce((acc, item) => R.assoc(item.InternalName, item, acc), {}, fields));


// { fields: R.pipe(
//     R.assocPath([internalName, 'value'], value),
//     R.assocPath([internalName, 'errorMessge'], validationError)
// }

// const validateField = (value, { IsRequire,MinValue,MaxValue,MaxLength, Type }) => (IsRequire && !value) ? 'این فیلد الزامی است' : ''


class Form extends React.Component {
    constructor(props) {
        super(props);
     //   this.submit = this.submit.bind(this);
        this.state = {
            fields: {},
            formName:'New',
            listId: '',
            fieldId:'',
            fieldValue:''
        };
    }

    componentDidMount = () => {
        // this.loadServerData()

        console.log('Button is clicked!!');

        let listId = 'EB745529-1190-49B6-B5D9-EDDEBED633DB';
        let contentTypeId=''
        let listTitle='frmTest';
        let fieldId='ID';
        let fieldValue='92';

        this.setState({ listId: listId,fieldId:fieldId,fieldValue:fieldValue })
        this.props.dispatch(setFormName(this.state.formName));
       
           getListFields({listId, contentTypeId}).then((response) => {
            let trsFields=transformFields(response.data.d.results);
            console.log('fields',transformFields(response.data.d.results))
           this.props.dispatch(setFields(transformFields(response.data.d.results)))
         
            if(this.state.formName!=='New')
            {
               // Object.Values(this.props.fields).filter(a=>a.Type!='MasterDetail').map((itm)=>(itm.InternalName))
                getData(listId,fieldId,fieldValue, Object.values(this.props.fields).filter(a=>a.Type!='MasterDetail').map((itm)=>(itm.InternalName)).toString()).then((res)=>{
                console.log('getdata',res.data.d.results[0]);
               let data= res.data.d.results[0]
               let data2= Object.keys(trsFields).map((key)=>({[key]:data[key]&&data[key].results?data[key].results:data[key+"Id"]})).reduce((result,item)=>{
                                                                                                                                var key = Object.keys(item)[0]; //first property: a, b, c
                                                                                                                                result[key] = item[key];
                                                                                                                                return result;
                                                                                                                            }, {});
               console.log('data2',data2);
                  // let data=res.data.d.results[0];
                   
                   
                this.props.dispatch(setValueFields(data2))

                   
                }).catch(function(error){
                    console.log(error);
                })

            }

        }).
            catch(function (error) {
                console.log(error);
            });

            

    }

    hasError=(fields)=>{
        let requiredFiels = Object.values(fields).filter(item => item.errorMessge)
        return requiredFiels.length != 0
    }
    checkRequired = () =>{
        let requiredFiels = Object.values(this.props.fields).filter((item)=> item.IsRequire && !item.value).map((item)=> ({...item, errorMessge: 'این فیلد الزامی است'}))
        let newFields = {...this.state.fields, ...transformFields(requiredFiels)}
        this.props.dispatch(setFields(newFields))
        return newFields
    }
    handleSubmit = (e) => {
        console.log('save date',this.props.fields);
        e.preventDefault()
        let fields = this.checkRequired()
        if (this.hasError(fields)) {
            alert('has error')

        } else {
               const saveItems = Object.values(this.props.fields).map(({ InternalName, LookupList = '', Type, rows=[], value,MasterLookupName }) => {
                    value = InternalName==='ID'? "0" :(Type=="MasterDetail")? MasterLookupName:value;
                   
                    rows  =  rows.map((row)=>(Object.values(row).map(({InternalName,LookupList='',Type,row=[],value})=>{
                        value = InternalName==='ID'? "0" : value;
                        LookupList=LookupList?LookupList:'';
                        return { InternalName, LookupList, Type,rows:[], value };
                    }))),
                    
                    LookupList=LookupList?LookupList:''
                    return { InternalName, LookupList, Type, rows, value };
               })
              
               saveData(this.state.listId, saveItems, [], [], []).then((response) => {
               if (isJsonStr(response.data.d))
                {

                    let validateArr=JSON.parse(response.data.d);
                    let res= validateArr.reduce((acc,f)=>[...acc,...f.FieldNames.map(itm=>({internalName:itm,error:f.Message,rowId:f.RowNumber}))],[])
                   
                    this.props.dispatch(setServerErrors(res));
                    console.log('ddddd',this.props.fields)
                }
                else{
                    alert(response.data.d);
                }
               
               }).
                   catch((error) => console.log(error))
        }

      
    }

    render() {
     //   console.log('here', this.props.fields)
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>testttttttt</h1>
                {Object.values(this.props.fields).map((field) =>
                    <Field formName={this.state.formName}
                        key={field.InternalName}
                        internalName={field.InternalName}
                    />

                )
                }
                <button type="submit">Submit</button>
            </form>

        )
    }
}

const mapStateToProps = state => ({ fields: state.fields ,formName:state.formName })

export default connect(mapStateToProps)(Form)


 const isJsonStr=(str) =>{
    var parsedStr = str;
    try {
        parsedStr = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return typeof parsedStr == 'object'
}