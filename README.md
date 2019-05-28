# engineeringconferenceapp

> Webapp for Engineering Conference at UCI. Created by Niklas Hammon 2018.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev



# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Getting Started
 + Download nvm (or node/npm)
 + Download Webstorm (Free jetbrains account for students)
 + Clone this repo
 + Install the dependencies
``` bash
# install dependencies
npm install
```
 + **IMPORTANT** Take the following from our team drive and move them into the folders of the EngineeringConferenceApp that they belong to: Gallery (belongs in /static/) and prod.env.js (copy and replace in /config/) [Website Starter Kit](https://drive.google.com/drive/u/0/folders/1j42-VedOFYNG3ispj78a8bmuDZED_WPd) 
 + Run locally
``` bash
# serve with hot reload at localhost:8080
npm run dev
```
## To add files to Cpanel
 + Build for production
```bash 
# build for production with minification
npm run build
```
 + Locate files index.html and /static/ in /dist/ folder
 + Delete /Gallery/ from the /static/ folder (to reduce upload time)
 + Compress these two files and upload them to NameCheap [CPanel](https://server123.web-hosting.com:2083/cpsess7382350696/frontend/paper_lantern/index.html) (public_html of file manager)
 + Move the Gallery page from the old /static/ folder into the home page
 + Delete the existing /static/ and index.html
 + Refresh the page to see the newly uploaded file (then extract the Archive.zip)
 + Move the /Gallery/ folder back into /static/

## Each Year you must
+ Update the content:
  + Use the .json files in /static/ to make easy edits and additions (Meettheteam, schedule, sponsors, papers, projects, etc.)
+ Swap the backend:
  + Change the years on all of the database pushes ('2018-2019 Attendees' -> to whatever year it is) this is so we can save the information 
  of everyone who signs up every year. However, the mailing list is added on each year (this will become annoying for people after a few years so be careful)
+ Control the home page state:
  + Use the vuex store in main.js to switch between (application, recruiting, neutral, etc.)

## All third parties are linked in the secret page
+ All are accessible with the engineeringconferenceuci@gmail.com
+ Except:
  + Stripe
  + SendGrid (you make a free account by using the github student developer pack)

## Switch the backend
> Uses Firebase's Cloud Firestore. 
+ Create a new project or database with the engineering conference gmail
+ To switch backends modify file config/prod.env.js 
+ It is intended that by changing the date for the team interest and application form that a new index may be created each year. Start deleting years when space becomes a problem.

## Webtasks
> Used for completing stripe payments serverless and sending email confirmations through sendGrid
+ Sign into webtask with the engineering conference gmail
+ 2 webtasks are used (stripecharge, attendeeEmailConfirmation)
