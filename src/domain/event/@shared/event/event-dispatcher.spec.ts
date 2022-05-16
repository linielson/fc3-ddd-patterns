import Address from "../../../entity/address";
import Customer from "../../../entity/customer";
import CustomerAddressChangedEvent from "../../customer/customer-address-changed";
import CustomerCreatedEvent from "../../customer/customer-created.event";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "../../customer/handler/send-console-log-when-customer-address-is-changed.handler";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../../customer/handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../customer/handler/send-console-log2-when-customer-is-created.handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all product event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify all customer event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerSendConsole1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandlerSendConsole2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
    const eventHandlerChangeAddress = new SendConsoleLogWhenCustomerAddressIsChangedHandler();
    const spyEventHandlerSendConsole1 = jest.spyOn(eventHandlerSendConsole1, "handle");
    const spyEventHandlerSendConsole2 = jest.spyOn(eventHandlerSendConsole2, "handle");
    const spyEventHandlerChangeAddress = jest.spyOn(eventHandlerChangeAddress, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSendConsole1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSendConsole2);
    eventDispatcher.register("CustomerAddressChangedEvent", eventHandlerChangeAddress);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerSendConsole1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerSendConsole2);
    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]).toMatchObject(eventHandlerChangeAddress);

    const customer = new Customer("123", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent(customer);

    // Quando o notify for executado o SendConsoleLog1WhenCustomerIsCreatedHandler.handle() e o SendConsoleLog2WhenCustomerIsCreatedHandler.handle() devem ser chamados
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerSendConsole1).toHaveBeenCalled();
    expect(spyEventHandlerSendConsole2).toHaveBeenCalled();

    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(customer);

    eventDispatcher.notify(customerAddressChangedEvent);

    // Quando o notify for executado o SendConsoleLogWhenCustomerAddressIsChangedHandler.handle() deve ser chamado
    expect(spyEventHandlerChangeAddress).toHaveBeenCalled();
  });

});
