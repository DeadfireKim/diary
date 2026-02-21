"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * React Query Provider
 * 서버 상태 관리 및 클라이언트 캐싱 기능 제공
 */
export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState를 사용하여 QueryClient를 생성
  // 이렇게 하면 각 브라우저 요청마다 새로운 QueryClient가 생성됨
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 윈도우가 포커스를 받을 때 자동으로 refetch
            refetchOnWindowFocus: false,
            // 컴포넌트가 마운트될 때 자동으로 refetch
            refetchOnMount: true,
            // 네트워크 재연결 시 자동으로 refetch
            refetchOnReconnect: true,
            // 데이터가 stale 상태로 간주되는 시간 (5분)
            staleTime: 5 * 60 * 1000,
            // 캐시 데이터가 메모리에 유지되는 시간 (10분)
            gcTime: 10 * 60 * 1000,
            // 실패 시 재시도 횟수
            retry: 1,
          },
          mutations: {
            // mutation 실패 시 재시도 횟수
            retry: 0,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 개발 환경에서만 React Query Devtools 표시 */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
