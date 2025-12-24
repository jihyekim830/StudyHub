import { API_PATHS, MSW_BASE_URL } from "@/constants";
import { http, HttpResponse } from "msw";

const deleteAccount = http.delete(
  `${MSW_BASE_URL}${API_PATHS.accounts.me}`,
  ({ request }) => {
    const url = new URL(request.url);

    const reason = url.searchParams.get("reason");
    const reasonDetail = url.searchParams.get("reason_detail");

    if (!reason || !reasonDetail) {
      return HttpResponse.json({}, { status: 400 });
    }

    return HttpResponse.json({}, { status: 204 });
  }
);

export const accountHandlers = [deleteAccount];
