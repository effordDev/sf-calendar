# Full Calendar(Salesforce) 📅📆

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/deploy.png">
</a>

*FullCalendar V4*

Provides a ```<isExposed>false</isExposed>``` that loads the FullCalendar static resources and displays a calendar. This component is capable of rendering events on any custom object along with standard objects like ```event```.

## Public Methods
```setEvents``` is a public method that takes in formatted events, and renders them to the calendar. By default the function will remove the current events and render the new ones.
```ruby
 @api setEvents(events)
```
> For event info, see the [Event Object](https://fullcalendar.io/docs/event-object)

## Views
The calendar provides multiple views in order to display the events. 

The initial view is ```dayGridMonth```; views provided are ```['listWeek', 'dayGridMonth', 'timeGridWeek', 'timeGridDay'] ```.

Examples of each view are provided below:

<details>
    <summary>
        listWeek
    </summary>
    <img src="https://user-images.githubusercontent.com/36901822/164520937-594e2119-ac57-421f-b65a-882ac9ad2cbb.png" width="550">
</details>

<details>
    <summary>
        dayGridMonth
    </summary>
    <img src="https://user-images.githubusercontent.com/36901822/164522086-c856aea6-5ea7-4659-9e51-20483b876d67.png">
</details>

<details>
    <summary>
        timeGridWeek
    </summary>
    <img src="https://user-images.githubusercontent.com/36901822/164522656-9b30e1f2-5e25-4a4c-828b-ff5166e92aaa.png">
</details>

<details>
    <summary>
        timeGridDay
    </summary>
    <img src="https://user-images.githubusercontent.com/36901822/164522888-ea92cc49-8b44-4210-b27c-4319a8885cc7.png">
</details>

## Events
### Date Change
As you navigate between dates (months, weeks, days; based on the current view) an event is dispatched everytime the viewed dates change with the start and end of the viewable calender. ```'datechange'```

```ruby 
this.event('datechange', { startDate, endDate })
```
___
### Event Click
When clicking an event on the calendar from any view, an event is dispatched with an ```info``` object with data about the event. ```'fceventclick'```

```ruby 
this.event('fceventclick', info)
```
___
### Date Click
When a date is clicked on the calendar, an event is dispatched with an ```info``` object with data about the date. ```'fcdateclick'```

```ruby 
this.event('fcdateclick', info)
```

### Mouse Enter
Triggered when the user mouses over an event. An event is dispatched with an ```info``` object with data about the event. ```'eventmouseenter'```

```ruby 
this.event('eventmouseenter', info)
```

## Rerendering the Calendar
Having the calendar rerender automatically is handled by using platform events. If you choose not to use platform events, the user will need to click the refresh button at the top right of the calendar to see live changes. Below are instructions for setting up the platform events.

#### 1. Create the Platform Event:
  - Navigate to Setup > Integrations > Platform Events
  - Click New Platform Event
  - Give your Platform Event a Label and API Name
    - I suggest using the name of the object that holds the events on the calendar EG.
    - Be sure the Publish Behavior: ```Publish After Commit```
    ![image](https://user-images.githubusercontent.com/36901822/189163721-b0c35f28-e231-4782-861c-c3feb5c647e4.png)
   
#### 2. Create a Flow to create the Platform Event
  - Navigate to Flows in setup
  - Create a new Record Triggered Flow for the object that holds the events on the calendar EG
  
  ![image](https://user-images.githubusercontent.com/36901822/189165985-c1b9859c-7ea0-4649-bd3a-5422de83c5f6.png)
  - Make sure the flow is an After Trigger / Optimize the Flow for: ```Actions and Related Records```
  
  ![image](https://user-images.githubusercontent.com/36901822/189166387-3305cede-c9a3-4a9d-8433-c1743af50d3f.png)
  - The Flow should have one node that create the Platform Event
  
  ![image](https://user-images.githubusercontent.com/36901822/189166561-4d4eb68d-92d4-4669-b6f0-5d0b842b6366.png)
  
  - Add a Create records node and Select your Platform Event as the record to create.
  - Based on your naming conventino you may see your Platform Event and sObject - Be sure you select your Platform Event
  ![image](https://user-images.githubusercontent.com/36901822/189167019-d924e810-8274-4706-a4d9-275c1086952d.png)
  ![image](https://user-images.githubusercontent.com/36901822/189167103-18ddf332-82f5-4f4a-bab1-85e6d4ca8796.png)

#### 3. Copy the Platform Event API Name. 
  - Navigate to the Lightning Record Page the contains the calendar component.
  - Paste the API Name into the Platform Event Name field
  ![image](https://user-images.githubusercontent.com/36901822/189165307-fde17426-9bf1-4561-8bc7-1a9b6d913e69.png)






