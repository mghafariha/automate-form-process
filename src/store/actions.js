
  import { SET_FIELDS, CHANGE_FIELD_VALUE,SET_DETAILS_FIELDS, CHANGE_DETAIL_FIELD_VALUE, ADD_MASTER_DETAIL_ROW, DEL_MASTER_DETAIL_ROW,SET_SERVER_ERRORS, SET_FORM_NAME,SET_VALUE_FIELDS,SET_VALUE_DETAIL_FIELDS} from './constants'

  // actions.js
  export const setFields = fields => ({  
    type: SET_FIELDS,
    fields,
  });
  export const setDetailFields = (internalName,fields) => ({  
    type: SET_DETAILS_FIELDS,
    fields,
    internalName
  });
  export const changeField = (internalName, value) => ({
      type: CHANGE_FIELD_VALUE,
      field: { internalName, value }
  });
  export const changeDetailFieldValue =(masterdetailFieldName ,internalName, rowId, value)=>({
    type: CHANGE_DETAIL_FIELD_VALUE,
    field: { masterdetailFieldName, internalName, rowId, value }
  });
  export const addMasterDetailRow = (internalName)=>({
    type: ADD_MASTER_DETAIL_ROW,
    internalName
  });
  export const delMasterDetailRow = (internalName, rowId)=>({
    type: DEL_MASTER_DETAIL_ROW,
    rowSpec: { internalName, rowId }
  });
  export const setServerErrors=(validateArray)=>({
    type:SET_SERVER_ERRORS,
    validateArray

  });
  export const setFormName=(formName)=>({
    type:SET_FORM_NAME,
    formName
  });
   export const setValueFields=(fieldValues)=>({
     type:SET_VALUE_FIELDS,
    fieldValues
  });
  export const setValueDetailFields=(detailValues,field)=>({

    type:SET_VALUE_DETAIL_FIELDS,
    detailValues,
    field
  })
  