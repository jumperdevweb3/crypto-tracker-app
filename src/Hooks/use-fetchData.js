export const useFetchData = async (fetchUrl) => {
  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Something got wrong!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
