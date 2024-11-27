import { ExternalService } from "../../application/interfaces/ExternalService";

export class SomeExternalService implements ExternalService {
  async callStepService(step: string): Promise<void> {
    console.log(`Processing step: ${step}`)
  }
}
