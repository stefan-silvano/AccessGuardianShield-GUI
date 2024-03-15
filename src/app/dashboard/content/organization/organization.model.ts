export class OrganizationModel{
    constructor(
      public id: number,
      public name: string,
      public description: string,
      public phoneNumber: string,
      public addressId: number
    ){

    }
}
