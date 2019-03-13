
import '../constants/SP.Runtime'
import  '../constants/SP';
import SharePointService from  '../constants/sharepointAccess';
 


export const  getListFields=(listname)=>
{

    var clientContext = new SP.ClientContext.get_current();
    var web = clientContext.get_web();
    var list = web.get_lists().getByTitle('TestLookupMulty');
    var query = SP.CamlQuery.createAllItemsQuery();

    var colListItem = list.getItems(query);
    clientContext.load(colListItem);
  
    SharePointService.executeQuery(clientContext).then(function () {
     return clientContext;
    })
}

    // var clientContext;
    // var web;
    
    // // Make sure the SharePoint script file 'sp.js' is loaded before your
    // // code runs.
    // SP.SOD.executeFunc('../constants/SP.js', sharePointReady);
    
    // // Create an instance of the current context.
    // function sharePointReady() {
    //     clientContext = SP.ClientContext.get_current();
    //     web= clientContext.get_web();
    
    //     clientContext.load(web);
    //     clientContext.executeQueryAsync(onRequestSucceeded, onRequestFailed);
    // }
    // function onRequestSucceeded() {
    //     alert(web.get_url());
    // }
    // function onRequestFailed(sender, args) {
    //     alert('Error: ' + args.get_message());
    // }

    // var list = web.get_lists().getByTitle(listname);
    // this.listFields = list.get_fields();
    // clientContext.load(this.listFields);
    // clientContext.executeQueryAsync(Function.createDelegate(this, 
    //     this.onListFieldsQuerySucceeded), Function.createDelegate(this, 
    //     this.onListFieldsQueryFailed));

    // function onListFieldsQuerySucceeded() {
    //     var fieldEnumerator = listFields.getEnumerator();
    //     while (fieldEnumerator.moveNext()) {
    //         var oField = fieldEnumerator.get_current();
    //         var fType = oField.get_fieldTypeKind();
    //         if(fType === SP.FieldType.choice) {
               
    //         }
    //     }
    //     return fieldEnumerator;
    // }  
  



  