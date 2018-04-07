## Zappy
A Mean Stack Project which fetch Tweets using Slack Bot

## Technologies
Zappy is a tool developed using _**NodeJS**_ , _**ExpressJS**_ , _**MongoDB**_ as Backend Tools , _**Angular**_ and _**Bootstrap**_ as Frontend Tools 
Moreover I tried somehow to use the _**12 factor app methodology**_ on this app where I use _**git flow**_ and _**docker**_ for the app

## Core
It is a tool which integrate two topnotch technologies such as Twitter and Slack, Where user can utilize it on any slack channel by typing the word ‘go’ , then the magic happens , tweets of a linked accounts will be fetched to the angular client in a real time manner .


## How it works
1. Make sure you have _node_ and _npm_ installed on your machine by typing ```npm --version``` and ```node --version```
 
2. Make sure that you have _docker_ installed on your machine by typing ``` docker --version``` ,also to ensure that docker-compose is working properly you may type ```docker-compose -v```as we use it for starting our app. 

3. The project is being splitted in two folders , first one is _express-zappy_ which is the server side code for the app using _node_ and _express_, the second part is the _ng-zappy_ which contains the frontend code using _angular_

4. The app is _dockerized_ , and they way this project works is that we have 3 docker for each part of the app.

5. Two Docker containers are coming from two docker files are for the express and angular app respectively , and the third docker container is from docker hub image for mongodb
