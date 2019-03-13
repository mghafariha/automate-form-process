import axios from 'axios';

export let URL = "http://172.16.33.251:50"
const header = {
    headers: {
        "Accept": "application/json;odata=verbose",
        'Content-Type': 'application/json;charset=UTF-8'
    }
}

export const getLookupItems = ( {LookupList, LookupTitleField, LookupValueField,query='' }) => axios.get(

  query!=''? 
   URL + "/_api/web/lists(guid'" + LookupList + "')/items?$filter="+query+"&FSObjType eq 0" + "&$top=999999&$select=" + LookupTitleField + "," + LookupValueField:
   URL + "/_api/web/lists(guid'" + LookupList + "')/items?$filter=FSObjType eq 0 &$top=999999&$select=" + LookupTitleField + "," + LookupValueField,
    header
)
// export const getCusomSelectItems=(LookupList,Query,LookupTitleField,LookupTitleValue)=>axios.get(
//     Query!=""?
//     URL+"_api/web/lists(guid'"+LookupList+"')/items?$filter=FSObjType eq 0 " + "&"+ Query +"&$top=999999&$select="+ LookupTitleField+ ","+ LookupValueField:
//     URL + "_api/web/lists(guid'" + LookupList + "')/items?$filter=FSObjType eq 0&$top=999999&$select=" + LookupTitleField + "," + LookupValueField,
//     header
// )

export const getListFields = ( {listId, contentTypeId,query=''} ) => axios.get(
    contentTypeId!=''?
      URL+"/_api/web/lists(guid'"+listId+"')/contenttypes("+contentTypeId+")/fields/fields?$filter="+query+"&Hidden eq false and ReadOnlyField eq false and FormBaseType eq false":
      URL+ "/_api/web/lists(guid'"+listId+"')/fields?$filter=Hidden eq false and ReadOnlyField eq false and FromBaseType eq false",
    header
)
export const saveData=(listId,fields,deletedItems,addFiles,deleteFiles)=>axios.post(
    URL+"_Layouts/15/AutomateFormProcess/Services.aspx/SaveFieldItems",{
        guid:listId,
        fields:fields,
        deletedItems:deletedItems,
        addFiles:addFiles,
        deleteFiles:deleteFiles
    },header
)
export const getData=(listId,fieldName,value,select)=>axios.get(
  URL+ "/_api/web/lists(guid'"+listId+"')/Items?$filter="+fieldName + " eq "+ value
    ,header

    // URL+"_Layouts/15/AutomateFormProcess/Services.aspx/GetData",{
    //     listId:listId,
    //     fieldName:fieldName,
    //     value:value,
    //     select:select
    // },header
)



// var self = this;
// console.log('Button is clicked!!');
// let listId = '8455C1DE-1BB1-42A8-A7BE-70CA41A8A7E0';


// this.serverRequest = axios.post("http://172.16.33.251:50/_Layouts/15/AutomateFormProcess/Services.aspx/GetDisplayFields", {

//     listId: '8455C1DE-1BB1-42A8-A7BE-70CA41A8A7E0',
//     formType: 'New',
//     contentTypeId: ''
// },

//     {
//         headers: {
//             //  'Access-Control-Allow-Origin': 'http://localhost:3000',
//             'Content-Type': 'application/json',
//         }
//     }


//     // withCredentials: true,
//     // credentials: 'same-origin',
// )
//     .then(function (response) {
//         self.setState({
//             fields: response.data.d.fields
//         })
//         //   self.fillArrayField(response.data.d.fields);

//         console.log(response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
