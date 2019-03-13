import React from 'react'
import { connect } from 'react-redux';

import Select from '../Select'
import SelectWid from '../../Select/widget'
import Input from '../Input'
import InputWid from '../../Input/widget'
import Radio from '../../Radio'
import RadioWid from '../../Radio/widget'
import TextArea from '../TextArea'
import TextAreaWid from '../../TextArea/widget'
import CheckBox from '../CheckBox'
import CheckBoxWid from '../../CheckBox/widget'
import Span from '../Span'

import Label from '../Label'
import Lookup from '../Lookup'
import LookupWid from '../../Lookup/widget'
import Number from '../Number'
import NumberWid from '../../Number/widget'
import CustomSelect from '../CustomSelect';
import CustomSelectWid from '../../CustomSelect/widget'
import ComputedQuery from '../ComputedQuery';
import File from '../File';
import FileWid from '../../File/widget';
import Date from '../Date';
import DateWid from '../../Date/widget'
import Time from '../Time';
import TimeWid from '../../Time/widget'



class Field extends React.Component {

    render() {
        let formName=this.props.formName;
        //let value=this.props.value;
        console.log('field details,',this.props)
        let { Title, Type , errorMessge, options,TypeFile,value } = this.props.fields[this.props.masterdetailFieldName].rows[this.props.rowId][this.props.internalName]
        let field=this.props.fields[this.props.masterdetailFieldName].fields[this.props.internalName]
        let detailFields=   this.props.fields[this.props.masterdetailFieldName].fields;
       // console.log(this.props.internalName, this.props.fields)
        return (
            <fieldset className={this.props.uniqueName} >

              {/* <Label value={Title} htmlFor={this.props.internalName} /> */}
                <div>
                    {(() => {
                        switch (Type) {

                            case 'Text':
                                return(
                                    <div>
                                        {
                                            formName!=='Display'? <Input
                                            render={InputWid}
                                                internalName={this.props.internalName}
                                                className={'input input-' + this.props.InternalName}
                                                value={value}
                                                {...this.props}
                                            />:
                                            <Span internalName={this.props.internalName} value={value} />
                                        }
                                    </div>
                                )
                           
                            case 'Number':
                            return(
                                <div>
                                    {
                                        formName!=='Display'? <Number 
                                        render={NumberWid}
                                        internalName={this.props.internalName}
                                        className={'input input-' + this.props.InternalName}
                                        {...this.props}
                                        value={value}
                                       />:
                                        <Span internalName={this.props.internalName} value={value} />
                                    }
                                </div>
                                )
                               case 'DateTime':

                                return(
                                  <div>{ 
                                     formName!=='Display'?<Date
                                        render={DateWid}
                                        internalName={this.props.internalName}
                                        className={'input number-'+ this.props.InternalName}
                                        {...this.props}
                                        value={value}
                                        />:
                                        <Span internalName={this.props.internalName} value={value} />
                                  }
                                  </div>
                                    )

                            case 'Lookup':
                                 return(
                                     <div>{
                                        formName!=='Display'?<Lookup 
                                        render={LookupWid}
                                        internalName={this.props.internalName}
                                        className={'input lookup-' + this.props.InternalName}
                                        {...this.props}
                                        
                                       />:
                                       <Span internalName={this.props.internalName} value={value} />
                                     }</div>
                                 ) 
                             case 'LookupMulti':
                                 return(<div>{
                                     formName!=='Display'? <Lookup 
                                     render={LookupWid}
                                     internalName={this.props.internalName}
                                     className={'input lookup-'+this.props.InternalName}
                                     multiple
                                     {...this.props}  />:
                                     <Span internalName={this.props.internalName} value={value} />
                                     }</div>
                                      ) 
                             case 'RelatedCustomLookupQuery':
                                   return(<div>{
                                        formName!=='Display'?<CustomSelect  
                                        render={CustomSelectWid}
                                         internalName={this.props.internalName}
                                         containFields={Object.keys(detailFields).filter((key)=>field.Query.indexOf("{{"+key+"}}")!=-1)}
                                         masterContainFields={Object.keys(this.props.fields).filter((key)=>(field.Query.indexOf("{{m."+key+"}}")!=-1))}
                                         {...this.props}
                                     />:
                                       <Span internalName={this.props.internalName} value={value} />
                                   }
                                   </div>
                                   )
                               
                             case 'CustomComputedField':
                                   
                                 return (<div>{
                                         formName!=='Display'?<ComputedQuery
                                         render={InputWid}
                                         internalName={this.props.internalName}
                                         containFields={Object.keys(detailFields).filter((key)=>field.Query.indexOf("{{"+key+"}}")!=-1)}
                                         masterContainFields={Object.keys(this.props.fields).filter((key)=>(field.Query.indexOf("{{m."+key+"}}")!=-1))}
                                         {...this.props}
                                         />:
                                         <Span internalName={this.props.internalName} value={value} />
                                 }
                                 </div>
                                 )
                                 
                             case 'Choice':
                                 return (<div>{
                                     formName!=='Display'?<Select 
                                     render={SelectWid}
                                     internalName={this.props.InternalName}
                                     {...this.props}
                                     value={value}
                                     />:
                                     <Span internalName={this.props.internalName} value={value} />
                                     }
                                     </div>
                                  ) 
                             case 'MultiChoice':
                                 return(<div>{
                                     formName!=='Display'?<Select 
                                     render={SelectWid}
                                     internalName={this.props.InternalName}
                                     multiple
                                     {...this.props}
                                     />:
                                     <Span internalName={this.props.internalName} value={value} />
                                     }
                                     </div>)
                             case 'Note':
                               return(<div>{
                                    formName!=='Display'?<TextArea 
                                    render={TextAreaWid}
                                    internalName={this.props.InternalName}
                                    {...this.props}/>:
                                    <Span internalName={this.props.internalName} value={value} />
                               }
                               </div>
                               ) 
                             case 'File':
                             return(<div>{
                                 formName!=='Display'?<File  
                                 render={FileWid}
                                 internalName={this.props.InternalName}
                                 {...this.props}/>:
                                 <Span internalName={this.props.internalName} value={value} />
                                }
                                </div>
                                ) 
                            case 'Boolean':
                                 return(<div>{
                                     formName!=='Display'?<CheckBox 
                                     render={CheckBoxWid}
                                     internalName={this.props.InternalName}
                                     {...this.props}
                                     />:
                                     <Span internalName={this.props.internalName} value={value} />
                                     }</div>
                                     )

                        }
                    })()}
                    <span style={{color: 'red'}}>{errorMessge || ''}</span>
                </div>


            </fieldset>

        );

    }
}

const mapStateToProps = state => ({ fields: state.fields })

export default connect(mapStateToProps)(Field)

