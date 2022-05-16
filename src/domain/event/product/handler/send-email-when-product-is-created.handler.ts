import EventHandlerInterface from "../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    // event deve conter informações do produto criado
    console.log(`Sending email to .....`);
  }
}
