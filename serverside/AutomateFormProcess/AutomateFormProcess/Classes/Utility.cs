using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint;

namespace AutomateFormProcess.Classes
{
    public static class Utility
    {
        // Methods
        public static List<string> AllIndexesOf(string oldStr, string value, out string str, List<SPFieldValue> item)
        {
            List<string> list = new List<string>();
            str = "";
            if (string.IsNullOrEmpty(value))
            {
                throw new ArgumentException("the string to find may not be empty", "value");
            }
            List<int> list2 = new List<int>();
            int num = 0;
            int startIndex = 0;
            while (true)
            {
                startIndex = oldStr.IndexOf(value, startIndex);
                if (startIndex == -1)
                {
                    str = oldStr;
                    return list;
                }
                int index = oldStr.IndexOf("}}", (int)(startIndex + 1));
                string filter = oldStr.Substring(startIndex + 2, (index - startIndex) - 2);
                SPFieldValue value2 = item.FirstOrDefault<SPFieldValue>(a => a.InternalName == filter);
                oldStr = oldStr.Replace(oldStr.Substring(startIndex, (index - startIndex) + 2), value2.value);
                list.Add(filter);
                num++;
                startIndex += value.Length;
            }
        }

      

       

        public static string DeleteItemFromList(SPList list, int itemId)
        {
            string message = "ok";
            try
            {
                Guid siteID = list.ParentWeb.Site.ID;
                SPSecurity.RunWithElevatedPrivileges(delegate
                {
                    using (SPSite site = new SPSite(siteID))
                    {
                        using (SPWeb web = site.OpenWeb())
                        {
                            web.AllowUnsafeUpdates = true;
                            SPList list1 = web.Lists[list.ID];
                            list1.Items.DeleteItemById(itemId);
                            web.AllowUnsafeUpdates = false;
                        }
                    }
                });
            }
            catch (Exception exception)
            {
                message = exception.Message;
            }
            return message;
        }

      
        


        private static SPListItem setItemFields(List<SPFieldValue> fields, SPListItem item)
        {
            foreach (SPFieldValue value2 in fields)
            {
                string[] strArray;
                SPFieldLookupValueCollection values;
                int num;
                switch (value2.Type)
                {
                    case "Text":
                        {
                            item[value2.InternalName] = value2.value;
                            continue;
                        }
                    case "Note":
                        {
                            item[value2.InternalName] = value2.value;
                            continue;
                        }
                    case "Number":
                        {
                            item[value2.InternalName] = decimal.Parse(value2.value);
                            continue;
                        }
                    case "DateTime":
                        {
                            item[value2.InternalName] = Convert.ToDateTime(value2.value);
                            continue;
                        }
                    case "Lookup":
                        {
                            item[value2.InternalName] = new SPFieldLookupValue(int.Parse(value2.value), "");
                            continue;
                        }
                    case "LookupMulti":
                        strArray = value2.value.Split(new char[] { ',' });
                        values = new SPFieldLookupValueCollection();
                        num = 0;
                        goto Label_0216;

                    case "RelatedCustomLookupQuery":
                        {
                            item[value2.InternalName] = new SPFieldLookupValue(int.Parse(value2.value), "");
                            continue;
                        }
                    case "File":
                        {
                            item[value2.InternalName] = new SPFieldLookupValue(int.Parse(value2.value), "");
                            continue;
                        }
                    case "CustomComputedField":
                        {
                            continue;
                        }
                    case "Choice":
                        {
                            item[value2.InternalName] = value2.value;
                            continue;
                        }
                    case "MultiChoice":
                        {
                            string[] strArray2 = value2.value.Split(new char[] { ',' });
                            SPFieldMultiChoiceValue value3 = new SPFieldMultiChoiceValue();
                            num = 0;
                            while (num < strArray2.Length)
                            {
                                value3.Add(strArray2[num]);
                                num++;
                            }
                            item[value2.InternalName] = value3;
                            continue;
                        }
                    case "Boolean":
                        {
                            item[value2.InternalName] = value2.value;
                            continue;
                        }
                    case "User":
                        {
                            if (value2.value == null)
                            {
                                goto Label_034A;
                            }
                            item[value2.InternalName] = new SPFieldUserValue(SPContext.Current.Web, int.Parse(value2.value), "");
                            continue;
                        }
                    default:
                        {
                            continue;
                        }
                }
            Label_01F7:
                values.Add(new SPFieldLookupValue(int.Parse(strArray[num]), ""));
                num++;
            Label_0216:
                if (num < strArray.Length)
                {
                    goto Label_01F7;
                }
                item[value2.InternalName] = values;
                continue;
            Label_034A:
                item[value2.InternalName] = null;
            }
            return item;
        }

    

        public static string UpdateFiles(SPWeb web,string folderName, List<SPFieldValue> fields, List<Attachment> addFiles, List<Attachment> deleteFiles)
        {
            string message = "ok";
            try
            {
                Guid siteId = web.Site.ID;
                SPSecurity.RunWithElevatedPrivileges(delegate
                {
                    using (SPSite site = new SPSite(siteId))
                    {
                        using (SPWeb Web = site.OpenWeb())
                        {
                            SPList list;
                            foreach (Attachment attachment in deleteFiles)
                            {
                                list = Web.Lists[new Guid(attachment.LookupList)];
                                Web.AllowUnsafeUpdates = true;
                                SPFolder folder = Web.GetFolder(list.RootFolder + folderName);
                                if (!folder.Exists)
                                {
                                    list.RootFolder.Files[attachment.FileName].Delete();
                                }
                                else
                                {
                                    folder.Files[attachment.FileName].Delete();
                                }
                                list.RootFolder.Update();
                                Web.AllowUnsafeUpdates = false;
                            }
                            foreach (Attachment attachment in addFiles)
                            {
                                list = web.Lists[new Guid(attachment.LookupList)];
                                byte[] buffer = Convert.FromBase64String(attachment.Content);
                                if (!string.IsNullOrEmpty(attachment.FileName))
                                {
                                    web.AllowUnsafeUpdates = true;
                                    SPFile file = null;
                                    if (folderName=="")
                                    {
                                        file = list.RootFolder.Files.Add(attachment.FileName, buffer, false);
                                    }
                                    else
                                    {
                                        SPFolder folderWithName = web.GetFolder(list.RootFolder + "/" + folderName);
                                        if (!folderWithName.Exists)
                                        {
                                            SPListItem item = list.Folders.Add(list.RootFolder.ServerRelativeUrl, SPFileSystemObjectType.Folder, folderName);
                                            item.Update();
                                            file = item.Folder.Files.Add(attachment.FileName, buffer, false);
                                        }
                                        else
                                        {
                                            file = folderWithName.Files.Add(attachment.FileName, buffer, false);
                                        }
                                    }
                                    file.Item["Title"] = attachment.Title;
                                    file.Item.Update();
                                    web.AllowUnsafeUpdates = false;
                                    SPFieldValue fileFieldValue = new SPFieldValue
                                    {
                                        InternalName = attachment.InternalName,
                                        Type = "File",
                                        LookupList = attachment.LookupList,
                                        value = file.Item.ID.ToString()
                                    };
                                    fields.Add(fileFieldValue);
                                }
                            }
                        }
                    }
                });
            }
            catch (Exception exception)
            {
                message = exception.Message;
            }
            return message;
        }

        public static List<ErrorMessage> FindValidation(SPWeb web, Guid listId,List<SPFieldValue> fields)
        {
            List<ErrorMessage> errors = new List<ErrorMessage>();
            Guid siteId=web.Site.ID;
            SPSecurity.RunWithElevatedPrivileges(delegate
            {
                using (SPSite site = new SPSite(siteId))
                {
                    using (SPWeb Web = site.OpenWeb())
                    {

                        SPList validationList = Web.GetList("Lists/CheckValidationsList");
                        SPQuery query = new SPQuery();

                        query.Query = string.Format("<Where><Eq><FieldRef Name='SourceList' /><Value Type='Text'>{0}</Value></Eq></Where>", listId);
                        
                        SPListItemCollection validationItems = validationList.GetItems(query);

                        foreach (SPListItem validItem in validationItems)
                        {

                            List<string> fieldNames = validItem["SourceField"].ToString().Split(',').ToList();
                            List<SPFieldValue> checkField = fields.Where(a => fieldNames.Any(b => b == a.InternalName)).ToList();
                            if (checkField.Count > 0)
                                errors.AddRange(CheckValidation(Web, validItem, fields, fieldNames,-1));

                        }

                        List<SPFieldValue> masterDetailFields = fields.Where(a => a.Type == "MasterDetail").ToList();
                        foreach (SPFieldValue detailField in masterDetailFields)
                        {
                            SPList detailList = Web.Lists[new Guid(detailField.LookupList)];
                            SPQuery detailQuery = new SPQuery
                            {
                                Query = string.Format("<Where><Eq><FieldRef Name='SourceList' /><Value Type='Text'>{0}</Value></Eq></Where>", detailList.ID)
                            };
                            SPListItemCollection validationDetailItems = validationList.GetItems(detailQuery);

                            foreach (SPListItem validDetailItem in validationDetailItems)
                            {
                                int index = 0;
                                List<string> fieldNames = validDetailItem["SourceField"].ToString().Split(',').ToList();
                                foreach (List<SPFieldValue> detailFields in detailField.rows)
                                {
                                    List<SPFieldValue> checkField = detailFields.Where(a => fieldNames.Any(b => b == a.InternalName)).ToList();
                                    if (checkField.Count > 0)
                                        errors.AddRange(CheckValidation(Web, validDetailItem, detailFields, fieldNames,index++));             
                                }

                            }
                        }
                    }
                }
               });

            return errors;

        }

      

        public static List<ErrorMessage> CheckValidation(SPWeb web, SPListItem validItem, List<SPFieldValue> fields,List<string> fieldNames,int rowNumber)
        {
            List<ErrorMessage> errors = new List<ErrorMessage>();
            string valueStr = (validItem["value"] != null) ? validItem["value"].ToString() : "";
            string sourceListGUID = validItem["SourceList"].ToString();
            string sourceFieldStr= validItem["SourceField"].ToString();
            string[]  sourceFieldArray = sourceFieldStr.Split(new char[] { ',' });
            string srcFilters = (validItem["SourceFilter"] != null) ? validItem["SourceFilter"].ToString() : "";
            string srcFunc = (validItem["SourceAction"] != null) ? validItem["SourceAction"].ToString() : "";
            string items = (validItem["SourceItems"] != null) ? validItem["SourceItems"].ToString() : "";
           // SPList sourceList = web.Lists[new Guid(sourceListGUID)];
            string  sourceValue = (((srcFilters == "") && ((srcFunc == "") || (srcFunc == "خالی"))) && (((items == "") || (items == "خالی")) && (valueStr != ""))) ? valueStr : CalculateValue(web, fields, sourceListGUID, sourceFieldStr, srcFilters, srcFunc, items);
            string destListGUID = (validItem["DestList"] != null) ? validItem["DestList"].ToString() : "";
            string destFieldStr = (validItem["DestField"] != null) ? validItem["DestField"].ToString() : "";
            string destFilter = (validItem["DestFilter"] != null) ? validItem["DestFilter"].ToString() : "";
            string destFunc = (validItem["DestAction"] != null) ? validItem["DestAction"].ToString() : "";
            string destItems = (validItem["DestItems"] != null) ? validItem["DestItems"].ToString() : "";
            string destValue = (((destListGUID == "") && (destFieldStr == "")) && ((destFilter == "") && (valueStr != ""))) ? valueStr : CalculateValue(web, fields, destListGUID, destFieldStr, destFilter, destFunc, destItems);
            string compareAction = validItem["CompareAction"].ToString();
            if (((destValue != "") && (sourceValue != "")) && !CompareCheck(compareAction, sourceValue, destValue))
            {
                ErrorMessage message = new ErrorMessage
                        {
                            FieldNames = fieldNames,
                            Message = validItem["Message"].ToString(),
                            RowNumber = rowNumber
                        };
                errors.Add(message);
            }
            return errors;
        }
        public static string CalculateValue(SPWeb web, List<SPFieldValue> item, string listName, string fields, string filters, string func, string items)
        {
            SPFieldValue value2;
            SPListItemCollection items2;
            Func<SPFieldValue, bool> predicate = null;
            Func<SPFieldValue, bool> func14 = null;
            Func<SPFieldValue, bool> func15 = null;
            string[] strArray;
            int num5;
            SPList list = web.Lists[new Guid(listName)];
            SPQuery query = new SPQuery();
            string str = "";
            string s = "";
            List<string> list2 = AllIndexesOf(filters, "{{", out str, item);
            string[] fieldArray = fields.Split(new char[] { ',' });
            if (filters != "")
            {
                query.Query = str;
                query.ViewAttributes = "Scope='RecursiveAll'";
            }
            string str4 = func;
            switch (str4)
            {
                case "خالی":
                case "":
                    str4 = items;
                    if ((str4 == null) || (str4 != "Current"))
                    {
                        return s;
                    }
                    if (predicate == null)
                    {
                        predicate = a => a.InternalName == fieldArray[0].ToString();
                    }
                    if (item.FirstOrDefault<SPFieldValue>(predicate) == null)
                    {
                        return s;
                    }
                    if (func14 == null)
                    {
                        func14 = a => a.InternalName == fieldArray[0].ToString();
                    }
                    return item.FirstOrDefault<SPFieldValue>(func14).value;

                case "Max":
                    float num;
                    switch (items)
                    {
                        case "Current":
                            num = 0f;
                            strArray = fieldArray;
                            for (num5 = 0; num5 < strArray.Length; num5++)
                            {
                                Func<SPFieldValue, bool> func2 = null;
                                Func<SPFieldValue, bool> func3 = null;
                                string str2 = strArray[num5];
                                if (func2 == null)
                                {
                                    func2 = a => a.InternalName == str2;
                                }
                                if (item.FirstOrDefault<SPFieldValue>(func2) != null)
                                {
                                    if (func3 == null)
                                    {
                                        func3 = a => a.InternalName == str2;
                                    }
                                    value2 = item.FirstOrDefault<SPFieldValue>(func3);
                                    if (float.Parse(value2.value.ToString()) > num)
                                    {
                                        num = float.Parse(value2.value.ToString());
                                    }
                                }
                            }
                            return num.ToString();

                        case "All":
                            items2 = (filters != "") ? list.GetItems(new string[] { str }) : list.GetItems(new string[0]);
                            return items2[0][fieldArray[0]].ToString();

                        case "Current&All":
                            items2 = (filters != "") ? list.GetItems(new string[] { str }) : list.GetItems(new string[0]);
                            num = float.Parse(items2[0][fieldArray[0]].ToString());
                            strArray = fieldArray;
                            for (num5 = 0; num5 < strArray.Length; num5++)
                            {
                                Func<SPFieldValue, bool> func4 = null;
                                Func<SPFieldValue, bool> func5 = null;
                                string str3 = strArray[num5];
                                if (func4 == null)
                                {
                                    func4 = a => a.InternalName == str3;
                                }
                                if (item.FirstOrDefault<SPFieldValue>(func4) != null)
                                {
                                    if (func5 == null)
                                    {
                                        func5 = a => a.InternalName == str3;
                                    }
                                    value2 = item.FirstOrDefault<SPFieldValue>(func5);
                                    if (float.Parse(value2.value.ToString()) > num)
                                    {
                                        num = float.Parse(value2.value.ToString());
                                    }
                                }
                            }
                            return num.ToString();
                    }
                    return s;

                case "Min":
                    float num2;
                    switch (items)
                    {
                        case "Current":
                            num2 = 0f;
                            strArray = fieldArray;
                            for (num5 = 0; num5 < strArray.Length; num5++)
                            {
                                Func<SPFieldValue, bool> func6 = null;
                                string str5 = strArray[num5];
                                if (func6 == null)
                                {
                                    func6 = a => a.InternalName == str5;
                                }
                                if (item.FirstOrDefault<SPFieldValue>(func6) != null)
                                {
                                    if (func15 == null)
                                    {
                                        func15 = a => a.InternalName == fieldArray[0].ToString();
                                    }
                                    value2 = item.FirstOrDefault<SPFieldValue>(func15);
                                    if (float.Parse(value2.value) > num2)
                                    {
                                        num2 = float.Parse(value2.value);
                                    }
                                }
                            }
                            return num2.ToString();

                        case "All":
                            items2 = (filters != "") ? list.GetItems(query) : list.GetItems(new string[0]);
                            return items2[0][fieldArray[0]].ToString();

                        case "Current&All":
                            num2 = 0f;
                            items2 = (filters != "") ? list.GetItems(new string[] { str }) : list.GetItems(new string[0]);
                            num2 = float.Parse(items2[0][fieldArray[0]].ToString());
                            strArray = fieldArray;
                            for (num5 = 0; num5 < strArray.Length; num5++)
                            {
                                Func<SPFieldValue, bool> func7 = null;
                                Func<SPFieldValue, bool> func8 = null;
                                string str6 = strArray[num5];
                                if (func7 == null)
                                {
                                    func7 = a => a.InternalName == str6;
                                }
                                if (item.FirstOrDefault<SPFieldValue>(func7) != null)
                                {
                                    if (func8 == null)
                                    {
                                        func8 = a => a.InternalName == str6;
                                    }
                                    value2 = item.FirstOrDefault<SPFieldValue>(func8);
                                    if (float.Parse(value2.value.ToString()) < num2)
                                    {
                                        num2 = float.Parse(value2.value.ToString());
                                    }
                                }
                            }
                            return num2.ToString();
                    }
                    return s;

                case "Count":
                    items2 = (filters != "") ? list.GetItems(query) : list.GetItems(new string[0]);
                    value2 = item.FirstOrDefault<SPFieldValue>(a => a.InternalName == "ID");
                    s = items2.Count.ToString();
                    if (((value2.value != "0") && (items2.Count > 0)) && (items2.GetItemById(int.Parse(value2.value)) != null))
                    {
                        if (items2.GetItemById(int.Parse(value2.value)) != null)
                        {
                            s = (items2.Count - 1).ToString();
                        }
                        if (items == "Current&All")
                        {
                            s = (float.Parse(s) + 1f).ToString();
                        }
                    }
                    return s;

                case "First":
                    items2 = (filters != "") ? list.GetItems(query) : list.GetItems(new string[0]);
                    return items2[0][fieldArray[0]].ToString();

                case "Last":
                    items2 = (filters != "") ? list.GetItems(query) : list.GetItems(new string[0]);
                    return items2[items2.Count - 1][fieldArray[0]].ToString();

                case "Sum":
                    float num3;
                    switch (items)
                    {
                        case "Current":
                            num3 = 0f;
                            strArray = fieldArray;
                            for (num5 = 0; num5 < strArray.Length; num5++)
                            {
                                Func<SPFieldValue, bool> func9 = null;
                                Func<SPFieldValue, bool> func10 = null;
                                string str7 = strArray[num5];
                                if (func9 == null)
                                {
                                    func9 = a => a.InternalName == str7;
                                }
                                if (item.FirstOrDefault<SPFieldValue>(func9) != null)
                                {
                                    if (func10 == null)
                                    {
                                        func10 = a => a.InternalName == str7;
                                    }
                                    value2 = item.FirstOrDefault<SPFieldValue>(func10);
                                    num3 += float.Parse(value2.value);
                                }
                            }
                            return num3.ToString();

                        case "All":
                            num3 = 0f;
                            items2 = (filters != "") ? list.GetItems(query) : list.GetItems(new string[0]);
                            foreach (SPListItem item2 in items2)
                            {
                                num3 += float.Parse(item2[fieldArray[0]].ToString());
                            }
                            return num3.ToString();

                        case "Current&All":
                            num3 = 0f;
                            items2 = (filters != "") ? list.GetItems(query) : list.GetItems(new string[0]);
                            foreach (SPListItem item2 in items2)
                            {
                                num3 += float.Parse(item2[fieldArray[0]].ToString());
                            }
                            strArray = fieldArray;
                            for (num5 = 0; num5 < strArray.Length; num5++)
                            {
                                Func<SPFieldValue, bool> func11 = null;
                                Func<SPFieldValue, bool> func12 = null;
                                string str8 = strArray[num5];
                                if (func11 == null)
                                {
                                    func11 = a => a.InternalName == str8;
                                }
                                if (item.FirstOrDefault<SPFieldValue>(func11) != null)
                                {
                                    if (func12 == null)
                                    {
                                        func12 = a => a.InternalName == str8;
                                    }
                                    value2 = item.FirstOrDefault<SPFieldValue>(func12);
                                    num3 += float.Parse(value2.value);
                                }
                            }
                            return num3.ToString();
                    }
                    return s;
            }
            return s;
        }

        public static bool CompareCheck(string compareAction, string sourceValue, string destValue)
        {
            float num = 0f;
            float num2 = 0f;
            string str = "float";
            if(compareAction!="StrCmp")
            try
            {
                num = float.Parse(sourceValue);
                num2 = float.Parse(destValue);
            }
            catch (Exception)
            {
                DateTime time = DateTime.Parse(sourceValue);
                DateTime time2 = DateTime.Parse(destValue);
                str = "DateTime";
            }
            switch (compareAction)
            {
                case "StrCmp":
                    if (sourceValue== destValue)
                    {
                        break;
                    }
                    return true;

                case "Greater":
                    if (str != "DateTime")
                    {
                        if (float.Parse(sourceValue) > float.Parse(destValue))
                        {
                            return true;
                        }
                        break;
                    }
                    if (DateTime.Parse(sourceValue) <= DateTime.Parse(destValue))
                    {
                        break;
                    }
                    return true;

                case "GreaterEqual":
                    if (str != "DateTime")
                    {
                        if (float.Parse(sourceValue) >= float.Parse(destValue))
                        {
                            return true;
                        }
                        break;
                    }
                    if (DateTime.Parse(sourceValue) < DateTime.Parse(destValue))
                    {
                        break;
                    }
                    return true;

                case "Less":
                    if (str != "DateTime")
                    {
                        if (float.Parse(sourceValue) < float.Parse(destValue))
                        {
                            return true;
                        }
                        break;
                    }
                    if (DateTime.Parse(sourceValue) >= DateTime.Parse(destValue))
                    {
                        break;
                    }
                    return true;

                case "LessEqual":
                    if (str != "DateTime")
                    {
                        if (float.Parse(sourceValue) <= float.Parse(destValue))
                        {
                            return true;
                        }
                        break;
                    }
                    if (DateTime.Parse(sourceValue) > DateTime.Parse(destValue))
                    {
                        break;
                    }
                    return true;

                case "Equal":
                    if ((str != "DateTime") || !(DateTime.Parse(sourceValue) == DateTime.Parse(destValue)))
                    {
                        if (float.Parse(sourceValue) == float.Parse(destValue))
                        {
                            return true;
                        }
                        break;
                    }
                    return true;
            }
            return false;
        }

        public static string CreateErrorMsg(SPWeb web, string prCompareAction, string value, string sourceValue, string sourceField, string sourceFilters, string prSourceAction, string sourceList, string destValue, string destField, string destFilters, string prDestAction, string destList)
        {
            SPList list = web.Lists[new Guid(sourceList)];
            string title = list.Title;
            string str2 = list.Fields[sourceField].Title;
            string str3 = prSourceAction + sourceField + " از لیست " + title;
            string str4 = "";
            if (sourceFilters.Length > 0)
            {
                str3 = str3 + " با فیلتر (" + sourceFilters + ")";
            }
            if (destField != "")
            {
                string str7 = str4;
                str4 = str7 + prDestAction + " (" + destField + ") از لیست " + destList;
            }
            else
            {
                str4 = str4 + "مقدار ثابت(" + value + ")";
            }
            if ((destFilters.Length > 0) && (destField != ""))
            {
                str4 = str4 + "با فیلتر (" + destFilters + ")";
            }
            return (str3 + "  در مقایسه با " + str4 + prCompareAction + "نیست");
        }
    }

 
}
