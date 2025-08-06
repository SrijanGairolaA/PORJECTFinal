// types/express/index.d.ts
import { Request as Req } from "express";

export interface Request extends Req {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
  user?:any
}
