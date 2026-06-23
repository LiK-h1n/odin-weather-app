const giphyService = (function createGiphyService() {
  const _key = "cmtrxK4eUcsYI7uTgmZ9tsIjwzitNCUQ";

  const fetchGIF = async (mood) => {
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${_key}&q=${mood}&limit=1`
      );

      if (!response.ok) {
        throw new Error(`GIF not found (Status: ${response.status})`);
      }

      const responseJSON = await response.json();

      return responseJSON;
    } catch (error) {
      console.log("Error fetching weather:", error.message);

      return null;
    }
  };

  const processGIF = (responseJSON) => {
    const url = responseJSON.data[0].images.original.url;

    return { url };
  };

  return { fetchGIF, processGIF };
})();

export { giphyService };
