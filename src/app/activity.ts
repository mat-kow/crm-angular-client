export class Activity {
  constructor(
    public username: string,
    public subject: string,
    public action: string,
    public projectName: string,
    public taskTopic: string,
    public created: Date,
    public projectId: number,
    public subjectId: number,
  ) {
  }
}
