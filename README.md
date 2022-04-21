# Full Calendar(Salesforce) 📅📆
*FullCalendar V4*

Provides a ```<isExposed>false</isExposed>``` that loads the FullCalendar static resources and displays a calendar. This component is capable of rendering events on any custom object along with standard objects like ```event```.

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





