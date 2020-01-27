const fetch = require("node-fetch");

module.exports = async function updateBd(
  url,
  listName,
  apiKey,
  page,
  Model,
  dataDB
) {
  try {
    const res = await fetch(`${url}${listName}?api_key=${apiKey}&page=${page}`);
    const data = await res.json();

    dataDB.push(data);

    if (data.total_pages && data.total_pages > page) {
      page += 1;
      return updateBd(url, listName, apiKey, page, Model, dataDB);
    }
    console.log(dataDB);
    const films = new Model({
      listName,
      list: dataDB
    });
    await films.save();
  } catch (e) {
    console.log(e);
  }
};
