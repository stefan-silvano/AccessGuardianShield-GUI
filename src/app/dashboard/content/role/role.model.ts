export class RoleModel{
  constructor(
    public id: number,
    public description: string,
    public name: string,
    public riskLevel: string,
    public type: string,
    public containerId: number
  ){}
}
