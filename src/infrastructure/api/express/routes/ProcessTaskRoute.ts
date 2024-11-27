import { Request, Response } from "express";
import { HttpMethod, Route } from "./route";
import status from "http-status";
import { ProcessTaskInputDto, ProcessTaskUsecase } from "../../../../application/usecases/ProcessTaskUsecase";

export type ProcessTaskResponseDto = {
  id: string;
  message: string;
};

export class ProcessTaskRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly processTaskUsecase: ProcessTaskUsecase
  ) { }

  public static create(ProcessTaskUsecase: ProcessTaskUsecase) {
    return new ProcessTaskRoute('/tasks/:id/process', HttpMethod.POST, ProcessTaskUsecase);
  }

  public getMethod() {
    return this.method;
  }

  public getPath() {
    return this.path;
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const input: ProcessTaskInputDto = { taskId: id };
      await this.processTaskUsecase.execute(input);
      const responseBody = this.present(id);

      res.status(status.CREATED).json(responseBody).send();
    }
  }

  private present(id: string): ProcessTaskResponseDto {
    const response: ProcessTaskResponseDto = { id, message: 'Task processed' }

    return response;
  }
}

