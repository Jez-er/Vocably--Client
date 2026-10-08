"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, logout, register } from "@/shared/api/auth/endpoints";
import { sessionQuery } from "@/shared/api/auth/queries";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/api/auth";
import { persistUser, tokenStore } from "@/shared/api/core/tokens";
import { queryKeys } from "@/shared/query/keys";

export function useSession() {
  const query = useQuery(sessionQuery());

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isResolving: query.isEnabled && query.isPending,
    isAuthenticated: Boolean(query.data),
  };
}

function useAuthSuccess() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (data: AuthResponse) => {
    tokenStore.set(data.tokens.accessToken);
    persistUser(data.user);
    queryClient.setQueryData(queryKeys.auth.session(), data.user);
    router.push("/");
  };
}

export function useLogin() {
  const onAuthSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: (params: LoginRequest) => login({ params }),
    onSuccess: onAuthSuccess,
  });
}

export function useRegister() {
  const onAuthSuccess = useAuthSuccess();

  return useMutation({
    mutationFn: (params: RegisterRequest) => register({ params }),
    onSuccess: onAuthSuccess,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => logout(),
    onSettled: () => {
      tokenStore.clear();
      queryClient.clear();
      router.push("/login");
    },
  });
}
