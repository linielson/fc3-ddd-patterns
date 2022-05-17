import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLog2WhenCustomerIsCreatedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    // event deve conter informações do cliente criado
    console.log(`Esse é o segundo console.log do evento: CustomerCreatedEvent`);
  }
}
