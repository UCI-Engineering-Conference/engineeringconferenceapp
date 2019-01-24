# engineeringconferenceapp

> Webapp for Engineering Conference at UCI. Created by Niklas Hammon 2018.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Getting Started
1. Download nvm (or node/npm)
2. Download Webstorm (Free jetbrains account for students)
3. Fork and Clone this repo
4. Hosting: NameCheap [CPanel](https://server123.web-hosting.com:2083/cpsess7382350696/frontend/paper_lantern/index.html)
5. Achieve and upload the files in /dist after npm run build into public_html of file manager

## Each Year you must
1. Set the date in the GeneralContent.json (study the .json files all the easy changes can be make through them)
2. Change the indexes the firebase posts too (it is not necessary to delete the cloud firestore change the dates in the vue components)
3. The application open can be changed in the vuex store (if off people can only sign up for the mailing list)

## All third parties are linked in the secret page
+ All are accessible with the engineeringconferenceuci@gmail.com
+ Except:
+ + Stripe
+ + SendGrid (you make a free account by using the github student developer pack)

## Switch the backend
> Uses Firebase's Cloud Firestore. 
+ Create a new project or database with the engineering conference gmail
+ To switch backends modify file config/prod.env.js 
+ It is intended that by changing the date for the team interest and application form that a new index may be created each year. Start deleting years when space becomes a problem.

## Webtasks
> Used for completing stripe payments serverless and sending email confirmations through sendGrid
+ Sign into webtask with the engineering conference gmail
+ stripecharge is the webtask being used
