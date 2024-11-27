import { CreateTaskUsecase } from "./application/usecases/CreateTaskUsecase";
import { ProcessTaskUsecase } from "./application/usecases/ProcessTaskUsecase";
import { ApiExpress } from "./infrastructure/api/express/ApiExpress";
import { CreateTaskRoute } from "./infrastructure/api/express/routes/CreateTaskRoute";
import { ProcessTaskRoute } from "./infrastructure/api/express/routes/ProcessTaskRoute";
import { TaskRepositoryInMemory } from "./infrastructure/repositories/TaskRepositoryInMemory";
import { SomeExternalService } from "./infrastructure/implementations/SomeExternalService";

function main() {
  const repository = TaskRepositoryInMemory.create();

  const createTaskUsecase = CreateTaskUsecase.create(repository);

  const externalService = new SomeExternalService();
  const processTaskUsecase = ProcessTaskUsecase.create(repository, externalService);

  const createTaskRoute = CreateTaskRoute.create(createTaskUsecase);
  const processTaskRoute = ProcessTaskRoute.create(processTaskUsecase);

  const api = ApiExpress.create([createTaskRoute, processTaskRoute]);
  const port = 8000;
  api.start(port);
}

main();
