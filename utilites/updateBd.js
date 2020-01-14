module.exports = function updateBd(req, url, list, apiKey, page, Model, data) {
  req.get(
    `${url}${list}?api_key=${apiKey}&page=${page}`,
    async (err, res, body) => {
      if (err) return console.log(err);
      body = JSON.parse(body);
      data.push(body);
      if (body.total_pages && body.total_pages > page) {
        page += 1;
        return updateBd(req, url, list, apiKey, page, Model, data);
      }
      console.log(data, list);
      const films = new Model({
        listName: list,
        list: data
      });
      await films.save();
    }
  );
};
