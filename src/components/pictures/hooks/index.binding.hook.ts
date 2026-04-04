import { useInfiniteQuery } from "@tanstack/react-query";

type DogApiResponse = {
  message: string[];
  status: string;
};

const DOG_API_URL = "https://dog.ceo/api/breeds/image/random/6";

async function fetchDogs(): Promise<DogApiResponse> {
  const response = await fetch(DOG_API_URL);
  if (!response.ok) throw new Error("강아지 사진 조회에 실패했습니다.");
  return response.json();
}

export function usePicturesBinding() {
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pictures", "dogs"],
      queryFn: fetchDogs,
      getNextPageParam: (_lastPage, allPages) => allPages.length,
      initialPageParam: 0,
      retry: false,
    });

  const dogs = data?.pages.flatMap((page) => page.message) ?? [];

  return { dogs, isLoading, isError, fetchNextPage, isFetchingNextPage };
}
