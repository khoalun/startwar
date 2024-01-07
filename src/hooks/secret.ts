import { config } from "@configs";
import { Identity, SecretLocation } from "@models";
import { useQuery, useQueries } from "@tanstack/react-query";
import { axiosInstance } from "@utils";

export function useGetSecret() {
  return useQuery({
    queryKey: ["secret"],
    queryFn: async () => {
      const result = await axiosInstance.get<{ message: string }>(
        `${config.API_VITE_API_SECRET}/secret.json`
      );
      const decode = atob(result.data.message);
      const data = JSON.parse(decode) as SecretLocation[];
      return data;
    },
  });
}

export function useGetIdentity(options?: { enabled?: boolean; id?: number }) {
  const { enabled, id } = options || {};

  return useQuery({
    queryKey: ["identity", id],
    queryFn: async () => {
      const result = await axiosInstance.get<Identity>(
        `${config.API_ENDPOINT}/id/${id}.json`
      );
      return result.data;
    },
    enabled: Boolean(enabled && id),
  });
}

export function useGetIdentities(options?: {
  enabled?: boolean;
  ids?: number[];
}) {
  const { enabled, ids = [] } = options || {};

  return useQueries({
    queries: ids?.map((id) => ({
      queryKey: ["identity", id],
      queryFn: async () => {
        const result = await axiosInstance.get<Identity>(
          `${config.API_ENDPOINT}/id/${id}.json}`
        );
        return result.data;
      },
      enabled: Boolean(enabled && id),
    })),
  });
}
