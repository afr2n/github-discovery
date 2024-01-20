import axios from "axios";

export const api = {
  data_source_url: "https://api.github.com/search/repositories",
  getDataSourceUrl: (language, sort = "stars") => {
    const urlToFetch = `${api.data_source_url}?q=language=${language}&per_page=10&sort=${sort}`;
    return urlToFetch;
  },
  get: (url) => {
    return new Promise((resolve, reject) => {
      const info = {
        method: "get",
        url: url,
      };
      axios(info)
        .then((response) => {
          resolve(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(info);
          console.log("error in get ", error);
          reject(error);
        });
    });
  },
  post: (payload, url) => {
    return new Promise((resolve, reject) => {
      const info = {
        method: "post",
        url: url,
        data: payload,
      };
      axios(info)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(info);
          console.log("error in get ", error);
          reject(error);
        });
    });
  },
};
