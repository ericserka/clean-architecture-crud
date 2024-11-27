export interface ExternalService {
  callStepService(step: string): Promise<void>;
}
