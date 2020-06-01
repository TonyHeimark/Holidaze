# Holidaze

## This site includes

- A blazing fast site with [Gatsby.js](https://gatsbyjs.org)
- Structured content using [Sanity.io](https://www.sanity.io)
- Global deployment on [Netlify](https://netlify.com)

## Quick start

1. Clone this repository
2. npm install in the project root folder on local
3. cd studio && npm install
4. cd ../web && npm install We need to install the dependencies for both the studio and the web folder before starting the development server.
5. cd ../ && npm run start to start the studio and frontend locally
   - Your studio should be running on http://localhost:3333
   - Your frontend should be running on http://localhost:8000
6. npm run build to build to production locally

## Deploy changes

Netlify automatically deploys new changes commited to master on GitHub. If you want to change deployment branch, do so in build & deploy settings on Netlify.
Netlify will also deploy every time a change to establishments is detected, (creation, modification or deletion).
