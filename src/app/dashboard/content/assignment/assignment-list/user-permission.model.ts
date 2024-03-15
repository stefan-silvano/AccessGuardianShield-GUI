export class UserPermissionModel{
  constructor(
    public id: number,
    public user: any,
    public permission: any,
    public startDate: string,
    public endDate: string,
    public description: string
  ){}
}
