global with sharing class CustomPicklist extends VisualEditor.DynamicPickList {
    
    global override VisualEditor.DataRow getDefaultValue(){
        VisualEditor.DataRow defaultValue = new VisualEditor.DataRow('Account', 'Account');
        return defaultValue;
    }

    global override VisualEditor.DynamicPickListRows getValues() {
        VisualEditor.DynamicPickListRows myValues = new VisualEditor.DynamicPickListRows();
    
        for (Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()) {
            String apiName = objTyp.getDescribe().getName();
            String label = objTyp.getDescribe().getLabel();
            
            //Exclude all the unwanted Sobjects e.g. History, Share etc
            if (apiName.toLowerCase().right(3) ==  '__c') {
                VisualEditor.DataRow val = new VisualEditor.DataRow(label, apiName);
                myValues.addRow(val);

                System.debug( 'label : ' + label);
                System.debug( 'apiName : ' + apiName);

                continue;
            }
            if (!apiName.containsignorecase('history') && 
                !apiName.containsignorecase('tag') &&
                !apiName.containsignorecase('share') && 
                !apiName.containsignorecase('feed')) {      
                    
                VisualEditor.DataRow val = new VisualEditor.DataRow(label, apiName);
                myValues.addRow(val);
            }
         
        }
        return myValues;
    }
}