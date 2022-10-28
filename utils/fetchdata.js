import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useFetchData = (url) => {
  const { data, error, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    data: data,
    isLoading: isValidating,
    isError: error,
  };
};

export default useFetchData;
