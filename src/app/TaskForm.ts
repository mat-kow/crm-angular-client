export class TaskForm {
  topic: string;
  projectId: number;
  description: string;
  priorityName: string;
  userId: number;

  constructor(topic: string, projectId: number, description: string, priorityName: string, userId: number) {
    this.topic = topic;
    this.projectId = projectId;
    this.description = description;
    this.priorityName = priorityName;
    this.userId = userId;
  }
}
