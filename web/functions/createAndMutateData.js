import fetch from "node-fetch";

const token =
  "skj7PZDTY7H7i09HdhE3tmtQNHurEWLABgqvzPA5naMxg62seswXv3eJzat62cCVxvURdjLNPyoeMdm8m0UAaGeHIJmT7rkoVEdKQQN7WRJ0kXwKfD3VkD5bLSurDub519SpQdYWC2ydEM0Ijcnhg56pUPY9dvJCChLLMWlKDq4EhL81X1DE";

const retHeaders = {
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json"
};

const allowedOrigins = ["http://localhost:8000"];

exports.handler = (event, context, callback) => {
  const promise = new Promise(async (resolve, reject) => {
    const { origin } = event.headers;
    if (allowedOrigins.indexOf(origin) > -1) {
      retHeaders["Access-Control-Allow-Origin"] = origin;
    }
    if (event.httpMethod !== "POST") {
      return resolve({
        statusCode: 200,
        headers: retHeaders,
        body: ""
      });
    }

    const { body } = event;
    let postBody;

    try {
      postBody = JSON.parse(body);
    } catch (e) {
      console.log(e);
      return resolve({
        statusCode: 200,
        body: JSON.stringify({
          Success: false,
          Error: e
        }),
        headers: retHeaders
      });
    }

    const mutations = postBody.mutations;

    fetch("https://8g6l9b4n.api.sanity.io/v1/data/mutate/production", {
      method: "post",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ mutations })
    })
      .then(response => response.json())
      .then(result => {
        return resolve({
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            data: result
          }),
          headers: retHeaders
        });
      })
      .catch(error => {
        console.log(error);
        return resolve({
          statusCode: 200,
          body: JSON.stringify({
            Success: false,
            Error: error
          }),
          headers: retHeaders
        });
      });
  });

  return promise;
};
