import { http, HttpResponse } from "msw";
import { examHandlers } from "@/mocks/handlers/exam-handlers";
import { authHandlers } from "@/mocks/handlers/auth";

export const handlers = [
  ...authHandlers,

  http.get("/api/hello", () => {
    return HttpResponse.json({ message: "Hello, world!", code: 200 });
  }),
  ...examHandlers,
];
