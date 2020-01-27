const fetch = require("node-fetch");

module.exports = async function updateMovieBd(url, movieId, apiKey, Model) {
  try {
    const resData = await fetch(`${url}${movieId}?api_key=${apiKey}`);
    const resCredits = await fetch(
      `${url}${movieId}/credits?api_key=${apiKey}`
    );
    const credits = await resCredits.json();
    const data = await resData.json();
    const movie = new Model({
      movieId,
      movie: {
        ...data,
        ...credits
      }
    });
    const movieBd = await Model.findOne({ movieId: data.id });
    if (movieBd) {
      await Model.updateOne({ MovieId: data.id }, movie);
    } else await movie.save();
  } catch (e) {
    console.log(e);
  } finally {
    return movieId;
  }
};
