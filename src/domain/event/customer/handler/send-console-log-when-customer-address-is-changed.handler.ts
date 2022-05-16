

import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed";

export default class SendConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.id} - ${event.eventData.name} alterado para: ${event.eventData.Address.toString()}`);
  }
}
