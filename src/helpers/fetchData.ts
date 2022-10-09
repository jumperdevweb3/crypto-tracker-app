interface Props {
  url: string;
  message: string;
}

export const useFetchData = async ({ url, message }: Props) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request ${message} failed!`);
  }
  const data = await response.json();
  return data;
};
