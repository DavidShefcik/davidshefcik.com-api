# davidshefcik.com API

The API for my portfolio website, [davidshefcik.com](https://www.davidshefcik.com/).<br/>
The API is available at [api.davidshefcik.com](https://api.davidshefcik.com/).

Table of contents:
- [Technology](#Technology)
- [Deployment](#Deployment)

## Technology
This was built using:
- Node.js
- MongoDB
- GraphQL
- Express
- Axios

## Deployment
This project is deployed on Amazon Web Services.
Using CodePipeline and CodeBuild to deploy to an Elastic Beanstalk instance.
CodePipeline watches this GitHub repository for changes and if any changes are detected it starts to deployment process.
Elastic Beanstalk is using all-at-once deployment since this project can afford to have down time.
