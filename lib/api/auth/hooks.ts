"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, logout, register } from "@/lib/api/auth/endpoints";
import { sessionQuery } from "@/lib/api/auth/queries";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/lib/api/auth/types";
import { persistUser, tokenStore } from "@/lib/api/core/tokens";
import { queryKeys } from "@/lib/query/keys";

/** The logged-in user, or null. `isPending` is false for a visitor who has never logged in. */
export function useSession() {
  const query = useQuery(sessionQuery());

  return {
    user: query.data ?? null,
    isLoading: query.isLoading,
    isAuthenticated: Boolean(query.data),
  };
}

function useAuthSuccess() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return (data: AuthResponse) => {
    tokenStore.set(data.tokens.accessToken);
    persistUser(data.user);
    // Seed the cache so nothing refetches the session we were just handed.
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
    // Clear locally either way: a failed logout request must not leave the UI logged in.
    onSettled: () => {
      tokenStore.clear();
      queryClient.setQueryData(queryKeys.auth.session(), null);
      queryClient.removeQueries({ queryKey: queryKeys.auth.root });
      router.push("/login");
    },
  });
}
