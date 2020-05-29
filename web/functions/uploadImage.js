const sanityClient = require("@sanity/client");

const client = sanityClient({
  projectId: "8g6l9b4n",
  dataset: "production",
  token:
    "skj7PZDTY7H7i09HdhE3tmtQNHurEWLABgqvzPA5naMxg62seswXv3eJzat62cCVxvURdjLNPyoeMdm8m0UAaGeHIJmT7rkoVEdKQQN7WRJ0kXwKfD3VkD5bLSurDub519SpQdYWC2ydEM0Ijcnhg56pUPY9dvJCChLLMWlKDq4EhL81X1DE"
});

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
    const { image, name, size, type } = postBody;
    const imageData = new Buffer(image.replace(/^data:image\/[a-z]+;base64,/, ""), "base64");

    client.assets
      .upload("image", imageData, {
        filename: name
      })
      .then(imageAsset => {
        return resolve({
          statusCode: 200,
          body: JSON.stringify({
            success: true,
            data: imageAsset
          }),
          headers: retHeaders
        });
      });
  });

  return promise;
};
