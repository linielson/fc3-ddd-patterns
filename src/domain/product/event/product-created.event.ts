import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
    // Create a new Product with the event data
  }
}
