// handlers.ts
import { enrollmentHandlers } from "@/mocks/handlers/enrollment-handlers";
import { http, HttpResponse } from "msw";
import { examHandlers } from "@/mocks/handlers/exam-handlers";
import { authHandlers } from "@/mocks/handlers/auth-handlers";
import { verificationHandlers } from "@/mocks/handlers/verification-handlers";
import { accountHandlers } from "@/mocks/handlers/account-handlers";

export const handlers = [
  http.get("/api/hello", () => {
    return HttpResponse.json({ message: "Hello, world!", code: 200 });
  }),
  ...authHandlers,
  ...examHandlers,
  ...enrollmentHandlers,
  ...verificationHandlers,
  ...accountHandlers,
];
