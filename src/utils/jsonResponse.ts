import { ServerResponse } from "http";
import { ServerError } from "../errors";

export function jsonResponse(
  res: ServerResponse,
  status: number,
  data: unknown
) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(status);
  if (data instanceof ServerError) {
    res.end(
      JSON.stringify({
        message: data.message,
        status: data.status,
      })
    );
  } else {
    res.end(JSON.stringify(data));
  }
}
