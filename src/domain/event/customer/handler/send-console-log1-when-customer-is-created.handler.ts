import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLog1WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    // event deve conter informações do cliente criado
    console.log(`Esse é o primeiro console.log do evento: CustomerCreatedEvent`);
  }
}
