import * as R from 'ramda'
import { SET_FIELDS, CHANGE_FIELD_VALUE,SET_DETAILS_FIELDS, CHANGE_DETAIL_FIELD_VALUE, ADD_MASTER_DETAIL_ROW, DEL_MASTER_DETAIL_ROW,SET_SERVER_ERRORS,SET_FORM_NAME,SET_VALUE_FIELDS,SET_VALUE_DETAIL_FIELDS} from './constants'

const validateField = (value, { IsRequire,MinValue,MaxValue,MaxLength, Type }) =>{
    var msgErr="";
   msgErr=  (IsRequire && !value) ? msgErr+'این فیلد الزامی است' : msgErr
   msgErr=(Type=="Text" && value.length>MaxLength)? msgErr+'مقدار این فیلد از ماکزیمم طول تعریف شده بیشتر است.':msgErr
   msgErr=(Type=="Number" && value<MinValue )?msgErr+'مقدار فیلد از حداقل مقدار نمیتواند کمتر باشد' :msgErr
   msgErr=(Type=="Number" && value>MaxValue )?msgErr+'مقدار فیلد از حداکثر مقدارنمیتواند بیشتر باشد':msgErr
   return msgErr
}

export const fields = (state = {}, action) => { 
  
    switch (action.type) {
      case SET_FIELDS:
        return {...state, ...action.fields};
      case SET_DETAILS_FIELDS:
        let oldField = state[action.internalName];
        return Object.assign(
          {}, 
          state, 
          {[action.internalName]: Object.assign(
            {}, 
            oldField, 
            { rows: [action.fields], fields: action.fields })
           })
      case CHANGE_FIELD_VALUE:
        const validationError = validateField(action.field.value,  state[action.field.internalName])
        // let newState = R.pipe(
        //     R.assocPath([action.field.internalName, 'value'], action.field.value),
        //     R.assocPath([action.field.internalName, 'errorMessge'], validationError)
        // )(state)
       
        let newState={...state}
        newState[action.field.internalName]['value']=action.field.value;
        newState[action.field.internalName]['errorMessage']=validationError;
        
        return newState;
      case CHANGE_DETAIL_FIELD_VALUE:
      
        let { masterdetailFieldName, internalName, rowId, value} = action.field
        let oldMasterField = state[masterdetailFieldName]
        let oldField1 = state[masterdetailFieldName].rows[rowId][internalName]
        const validationErrorDetail = validateField(state[masterdetailFieldName].rows[rowId][internalName].value,  state[masterdetailFieldName].rows[rowId][internalName])
        let newMasterRows = oldMasterField.rows.map((row, index) => rowId == index ? {...row, [internalName]: {...oldField1, value,errorMessage:validationErrorDetail } } : row)
      return {...state, [masterdetailFieldName]: {...oldMasterField, rows: newMasterRows } }

      case ADD_MASTER_DETAIL_ROW:
        return {...state, [action.internalName]: {...state[action.internalName], rows: [...state[action.internalName].rows, state[action.internalName].fields] } }

      case DEL_MASTER_DETAIL_ROW:
        return {...state, [action.rowSpec.internalName]: {...state[action.rowSpec.internalName], rows: state[action.rowSpec.internalName].rows.filter((row, index) => index != action.rowSpec.rowId) } }
        
        case SET_SERVER_ERRORS:
        let validateArray=action.validateArray;

        let new2State={...state}

        validateArray.map((itm)=>{(itm.rowId==-1)? new2State[itm.internalName]['errorMessage']=itm.error:new2State[itm.internalName].rows[itm.rowId]=itm.error})
        // Object.values(new2State).map(itm=>
        //   ({...itm,['errorMessage']:validateArray.filter
        //   (f=>f.internalName==itm.InternalName)[0].error
        // })
        // )
        return new2State
        case SET_VALUE_FIELDS:
        let new3State={...state}
        let fieldValues=action.fieldValues;
        Object.entries(fieldValues).map(([key,value])=>({key,value})).map((itm)=>{new3State[itm.key]['value']=itm.value})
        return new3State
        case SET_VALUE_DETAIL_FIELDS:
       
      // let detailfield= state[action.field.InternalName].fields[k.key]
        //let rowsDetail=action.detailValues.map((itm,index)=>Object.entries(itm).map(([key,value])=>(Object.assign({}, state[action.field.InternalName].fields[key],{value:value,rowId:index}))))  
       
       let rowsDetail=action.detailValues.map((item,index)=>
         Object.keys(item).reduce((acc,f)=>{acc[f]={...state[action.field.InternalName].fields[f],'value':item[f],'rowId':index}; return acc},{}))
        
        // let new4State= {...state,[action.field.InternalName]:{...state[action.field.InternalName],rows:rowsDetail}}
        
       let new4State= {...state,[action.field.InternalName]:{...state[action.field.InternalName],rows:rowsDetail}};
       return new4State;
      default:
        return state;
    }
  };
  export const formName=(state = '', action)=>{
    switch (action.type) {
      case SET_FORM_NAME:
         
           return action.formName;
           default :
           return state;
  }
};

 