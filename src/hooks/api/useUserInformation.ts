import { getUserMe } from "@/api/auth";
import type { UserInfoResponse } from "@/types/api-response-type/auth-response-type";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type UserInformationQueryOptions = Omit<
  UseQueryOptions<UserInfoResponse, AxiosError>,
  "queryFn" | "queryKey"
>;

export default function useUserInformation(
  options?: UserInformationQueryOptions
) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUserMe();

      return user;
    },
    ...options,
  });
}
