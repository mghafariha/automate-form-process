import React from 'react'
import { connect } from 'react-redux';
import CheckBox from '../CheckBox';
import Select from '../Select';
import Input from '../Input';
import Number from '../Number';
import InputWid from '../Input/widget';
import NumberWid from '../Number/widget';
import CheckBoxWid from '../CheckBox/widget';
import SelectWid from '../Select/widget';

import Radio from '../Radio'
import TextArea from '../TextArea';
import TextAreaWid from '../TextArea/widget';
import Span from '../Span'
import Label from '../Label'
import Lookup from '../Lookup'
import LookupWid from '../Lookup/widget'

import CustomSelect from '../CustomSelect';
import CustomSelectWid from '../CustomSelect/widget';
import ComputedQuery from '../ComputedQuery';
import MasterDetail from '../MasterDetail';
import File from '../File';
import FileWid from '../File/widget';
import Date from '../Date';
import DateWid from '../Date/widget';
import Time from '../Time';
import TimeWid from '../Time/widget';


class Field extends React.Component {

    render() {
        let formName=this.props.formName;
        let { Title, TypeAsString , errorMessge, options,TypeFile,value } = this.props.fields[this.props.internalName]
       // console.log(this.props.internalName, this.props.fields)
        return (
            <fieldset className={this.props.uniqueName} >

                <Label value={Title} htmlFor={this.props.internalName} />
                <div>
                    {(() => {
                        switch (TypeAsString) {

                            case 'Text':
                            return (
                                <div>
                                  {formName!=='Display' ? <Input render={InputWid} internalName={this.props.internalName} /> :
                                  <Span internalName={this.props.internalName} value={value} />}
                                </div>
                              );
                            case 'Number':
                                return (
                                    <div>
                                        {formName!=='Display'?<Input render={NumberWid} internalName={this.props.internalName}  className={'input input-' + this.props.InternalName} />:
                                        <Span internalName={this.props.internalName} value={value}/> }
                                    </div>
                                ) 
                               case 'DateTime':
                               console.log('date', value)
                                return(
                                <div>
                                    {formName!=='Display' ? <Date render={DateWid} internalName={this.props.internalName} className={'input input-' + this.props.InternalName} /> :
                                    <Span internalName={this.props.internalName} value={value}/> } 
                                </div>
                                ) 
                            case 'Lookup':
                            
                           
                                 return(
                                        <div>
                                        {formName!=='Display'?<Lookup render={LookupWid} internalName={this.props.internalName} className={'input input-' + this.props.InternalName}   />:
                                         <Span internalName={this.props.internalName} value={value.substring(value.indexOf('#')+1,value.length)}/> 
                                           }
                                       </div>
                                           ) 
                             case 'LookupMulti':
                                 return(
                                 <div>
                                 {formName!=='Display'? <Lookup 
                                            render={LookupWid}
                                            internalName={this.props.internalName}
                                            className={'input input-' + this.props.InternalName} 
                                            multiple  />:
                                            <Span internalName={this.props.internalName} value={value}/>
                                             } 
                                             </div>
                                             )
                             case 'RelatedCustomLookupQuery':
                                 return(<div>{formName!=='Display'? <CustomSelect  
                                            render={CustomSelectWid}
                                            internalName={this.props.internalName}
                                            containFields={Object.keys(this.props.fields).filter((key)=>(this.props.fields[this.props.internalName].Query.indexOf("{{"+key+"}}")!=-1))}
                                            
                                        />:
                                        <Span internalName={this.props.internalName} value={value}/>
                                 }
                                 </div>)
                             case 'MasterDetail':
                                return <MasterDetail formName={formName}
                                            internalName={this.props.internalName} 
                                            value={value}
                                        />
                             case 'CustomComputedField':
                                 return(
                                 <div>{formName!=='Display'?<ComputedQuery  render={InputWid}
                                 internalName={this.props.internalName}  
                                 containFields={Object.keys(this.props.fields).filter((key)=>(this.props.fields[this.props.internalName].Query.indexOf("{{"+key+"}}")!=-1))}
                                 
                                 /> :
                                 <Span internalName={this.props.internalName} value={value}/>

                                 }</div>
                                ) 
                             case 'Choice':
                                    return ( 
                                    <div>
                                    {formName!=='Display'? <Select
                                    render={SelectWid}
                                        internalName={this.props.internalName}
                                        className={'input input-' + this.props.InternalName}
                                        
                                    />: 
                                    <Span internalName={this.props.internalName} value={value}/>}
                                     </div>
                                )
                             case 'MultiChoice':
                                    return(<div>
                                        {formName!=='Display'?
                                        <Select
                                    render={SelectWid}
                                        internalName={this.props.internalName}
                                        className={'input input-' + this.props.InternalName}
                                        
                                    />:
                                    <Span internalName={this.props.internalName} value={value}/>}

                                    </div>
                                    ) 
                             case 'Note':
                               return(
                               <div>
                               {formName!=='Display' ? <TextArea render={TextAreaWid} internalName={this.props.internalName}  className={'input note' + this.props.InternalName}  /> :
                                <Span internalName={this.props.internalName} value={value} />}
                                </div>)
                               
                             case 'File':
                             return (<div>
                                {formName!=='Display' ?<File render={FileWid}
                             internalName={this.props.internalName}
                             className={'input file'+this.props.InternalName}
                             
                             />:  <Span internalName={this.props.internalName} value={value}/>}
                             </div>) 
                            case 'Boolean':
                                 return(<div>
                                    {formName!=='Display'? <CheckBox render={CheckBoxWid} 
                                 internalName={this.props.internalName}
                                 className={'input input-' + this.props.InternalName}
                                
                                 />:
                                 <Span internalName={this.props.internalName} value={value}/>}
                                 </div>
                                 )

                        }
                    })()}
                    <span style={{color: 'red'}}>{errorMessge || ''}</span>
                </div>


            </fieldset>

        );

    }
}
const mapStateToProps = state => ({ fields: state.fields ,formName:state.formName})

export default connect(mapStateToProps)(Field)
