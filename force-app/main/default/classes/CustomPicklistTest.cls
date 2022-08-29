@isTest
public with sharing class CustomPicklistTest {
    
    @isTest
    private static void picklistTest() {
        CustomPicklist cp = new CustomPicklist();
        cp.getDefaultValue();
        cp.getValues();
    }
}