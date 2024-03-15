export class AddressModel {
  constructor(
    public id: number,
    public city: string,
    public country: string,
    public number: number,
    public postalCode: number,
    public street: string
  ) {}
}
