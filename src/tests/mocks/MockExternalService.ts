import { ExternalService } from "../../application/interfaces/ExternalService";

export class MockExternalService implements ExternalService {
  async callStepService(step: string): Promise<void> {
    console.log(`Processing Mock step: ${step}`)
  }
}
