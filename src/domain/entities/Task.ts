export enum TaskStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export type TaskProps = {
  id: string;
  status: TaskStatus;
  steps: string[];
  currentStep: number;
}

export class Task {
  private constructor(private props: TaskProps) { }

  public static create(steps: string[]) {
    return new Task({ id: crypto.randomUUID().toString(), status: TaskStatus.PENDING, steps, currentStep: 0 });
  }

  public static with(props: TaskProps) {
    return new Task(props);
  }

  public get id() {
    return this.props.id;
  }

  public get status() {
    return this.props.status;
  }

  public get steps() {
    return this.props.steps;
  }

  public get currentStep() {
    return this.props.currentStep;
  }

  public set status(status: TaskStatus) {
    this.props.status = status;
  }

  public set currentStep(currentStep: number) {
    this.props.currentStep = currentStep;
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    } else {
      this.status = TaskStatus.COMPLETED;
    }
  }

  fail(): void {
    this.status = TaskStatus.FAILED;
  }
}
