console.log("Server is uuup!!");
/*


const sanityClient = require('@sanity/client');
const nanoid = require('nanoid');
const slugify = require('slugify');
const isBefore = require('date-fns/is_before');

require('dotenv').config();

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_PUBLISH_TOKEN,
});

const retHeaders = {
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};


exports.handler = event => {
  const promise = new Promise(async resolve => {
    if (event.httpMethod !== 'POST') {
      resolve({
        statusCode: 401,
        headers: retHeaders,
        body: '',
      });
    }
    console.log('postBody::');
    const { body } = event;
    console.log(body);
    const postBody = JSON.parse(body);
    console.log(postBody);

    const eventId = postBody.CourseCmsId || null;

    if (!eventId) {
      return resolve({
        statusCode: 400,
        headers: retHeaders,
        body: JSON.stringify({
          CmsId: 0,
          Success: false,
          Error: `eventId not found for 'Arrangement'. 'Gjennomføring' not synced`,
          data: {},
        }),
      });
    }

    const doc = {
      _type: 'eventInstance',
      _id: postBody.Id,
      crmId: postBody.Id,
      title: postBody.Name,
     
    };

    // If the event has passed, delete the eventInstance
    /*
    if (eventHasPassed) {

      await client
      client.delete(postBody.Id).then(res => {
        return resolve({
          statusCode: 200,
          body: JSON.stringify({
            CmsId: res._id,
            Success: true,
            Error: '',
            data: res,
          }),
          headers: retHeaders,
        });
      });
    }
     */

/*
    client
      .createIfNotExists({
        _type: 'eventInstance',
        _id: postBody.Id,
      })
      .then(async res => {
        // First time the event is published, relate it to parent
        if (!isRelated) {
          await client
            .patch(cmsEvent._id)
            // Ensure that the `eventInstances` arrays exists before attempting to add items to it
            .setIfMissing({ eventInstances: [] })
            // Add the items after the last item in the array (append)
            .append('eventInstances', [{ _key: nanoid(), _type: 'reference', _ref: res._id }])
            .commit();
        }

        await client
          .patch(postBody.Id)
          .set(doc)
          .setIfMissing({ activities: [], gatherings: [] })
          .set({ activities, gatherings })
          .commit();

        return resolve({
          statusCode: 200,
          body: JSON.stringify({
            CmsId: res._id,
            Success: true,
            Error: '',
            data: res,
          }),
          headers: retHeaders,
        });
      })
      .catch(e => console.log('ERROORRR::') && console.log(e));
  });
  return promise;
};

*/
