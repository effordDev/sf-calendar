@isTest
public with sharing class CustomCalendarHelperTest {
    
    @TestSetup
    private static void makeData(){
        
        Account account = new Account();
            account.Name    = 'Efford';
            account.Website = 'https://github.com/effordDev';
        insert account;

        DateTime rightNow = System.now();

        Event event = new Event();
            event.WhatId        = account.Id;
            event.StartDateTime = rightNow;
            event.EndDateTime   = rightNow.addHours(1);
        insert event;
    }

    @isTest
    private static void getEventsTest(){
        CustomCalendarHelper.getEvents(
            [SELECT Id FROM Account LIMIT 1].Id,
            'Event',
            'WhatId',
            'StartDateTime',
            'EndDateTime',
            System.today(),
            System.today().addDays(10)
        );
    }
}
