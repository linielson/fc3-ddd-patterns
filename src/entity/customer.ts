class Customer {
  _id: string;
  _name: string;
  _address: string;
  _active: boolean = true;

  constructor(id: string, name: string, address: string) {
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get address(): string {
    return this._address;
  }

  changeName(name: string) {
    this._name = name;
    // rule, validation, business logic
  }

  changeAddress(address: string) {
    this._address = address;
    // rule, validation, business logic
  }

  activate() {
    this._active = true;
    // rule, validation, business logic
  }

  desactivate() {
    this._active = false;
    // rule, validation, business logic
    // i.e: customer no pay
  }
}
