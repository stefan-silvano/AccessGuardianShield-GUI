export class PermissionModel{
  constructor(
    public id: number,
    public description: string,
    public name: string,
    public riskLevel: string,
    public containerId: number
  ){}
}
