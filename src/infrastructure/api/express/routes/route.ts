import { Request, Response } from "express";

export enum HttpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}

export interface Route {
  getHandler(): (request: Request, response: Response) => Promise<void>
  getPath(): string
  getMethod(): HttpMethod
}
