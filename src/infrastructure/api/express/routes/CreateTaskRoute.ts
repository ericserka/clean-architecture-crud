import { Request, Response } from "express";
import { HttpMethod, Route } from "./route";
import status from "http-status";
import { CreateTaskInputDto, CreateTaskOutputDto, CreateTaskUsecase } from "../../../../application/usecases/CreateTaskUsecase";

export type CreateTaskResponseDto = {
  id: string;
};

export class CreateTaskRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly createTaskUsecase: CreateTaskUsecase
  ) { }

  public static create(createTaskUsecase: CreateTaskUsecase) {
    return new CreateTaskRoute('/tasks', HttpMethod.POST, createTaskUsecase);
  }

  public getMethod() {
    return this.method;
  }

  public getPath() {
    return this.path;
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const { steps } = req.body;
      const input: CreateTaskInputDto = { steps };
      const output = await this.createTaskUsecase.execute(input);
      const responseBody = this.present(output);

      res.status(status.CREATED).json(responseBody).send();
    }
  }

  private present(usecaseOutput: CreateTaskOutputDto): CreateTaskResponseDto {
    const response: CreateTaskResponseDto = { id: usecaseOutput.id }

    return response;
  }
}
