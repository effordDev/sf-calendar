import { api, LightningElement } from "lwc"
import { NavigationMixin } from 'lightning/navigation'
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi'
import { encodeDefaultFieldValues } from 'lightning/pageReferenceUtils'
import Id from '@salesforce/user/Id';
import getEvents from "@salesforce/apex/CustomCalendarHelper.getEvents"
import { formatEvents } from "c/calendarUtils"
export default class CustomCalendar extends NavigationMixin(LightningElement) {
     @api recordId
     @api childObject
     @api parentFieldName
     @api startDatetimeField
     @api endDatetimeField
     @api titleField
     @api channelName

     userId = Id

     startDate
     endDate

     connectedCallback() {
          this.addEventListener('fceventclick', this.handleEventClick)
          this.addEventListener('fcdateclick', this.handleDateClick)
          
          if (!!this.channelName) {
               this.handleSubscribe()
          }

          if (!this.recordId) {
               this.recordId = this.userId
          }
     }
          
     async handleSubscribe() {
          
          const messageCallback = (response) => {
               console.log('New message received: ', JSON.stringify(response))
               console.log('refreshing...')
               this.fetchEvents()
          }
     
          const response = await subscribe(this.channel, -1, messageCallback)
               
          console.log(
               'Subscription request sent to: ',
               JSON.stringify(response.channel)
          )
          this.subscription = response
          
     }    

     get channel() {
          return `/event/${this.channelName}`
     }

     get config() {
          return {
               recordId: this.recordId,
               childObject: this.childObject,
               parentFieldName: this.parentFieldName,
               startDatetimeField: this.startDatetimeField,
               endDatetimeField: this.endDatetimeField,
               titleField: this.titleField,
               startDate: this.startDate,
               endDate: this.endDate
          }
     }

     handleDateChange(event) {
          const { startDate, endDate } = event.detail.value

          this.startDate = startDate
          this.endDate = endDate

          this.fetchEvents()
     }

     handleEventClick = (event) => {
          try {
               const { Id } = event.detail.value.event._def.extendedProps
               console.log(Id)

               
               this[NavigationMixin.Navigate]({
                    type: 'standard__objectPage',
                    attributes: {
                         recordId: Id,
                         objectApiName: this.childObject,
                         actionName: 'edit',
                    }
               })
          } catch (error) {
               console.log(error)
          }
     }

     handleDateClick = (event) => {
          try {
               console.log('fcdateclick caught', event.detail.value.date)

               const date = event.detail.value.date 

               console.log({ date })
               
               const defaultFieldValues = encodeDefaultFieldValues({
                    [this.parentFieldName]: this.recordId,
                    [this.startDatetimeField]: date.toISOString(),
                    [this.endDatetimeField]: date.toISOString()
               })

               console.log({ defaultFieldValues })

               this[NavigationMixin.Navigate] ({
                    type: 'standard__objectPage',
                    attributes: {
                         objectApiName: this.childObject, // pass the record id here.
                         actionName: 'new',
                    },
                    state: {
                         defaultFieldValues,
                         navigationLocation: 'RELATED_LIST'
                    }
               })
          } catch (error) {
               console.log(error)
          }    
     }

     async fetchEvents() {
          console.log(this.config)
          const events = formatEvents(await getEvents(this.config), this.config)
          console.log(events)

          this.template.querySelector("c-calendar").setEvents(events)
     }
}