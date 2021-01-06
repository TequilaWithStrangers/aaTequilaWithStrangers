# aaTequilaWithStrangers

*By [Benjamin Pu](https://bpu991.github.io./), [Erin Shields](https://erinshields.dev/), [James White](https://github.com/whitejamesthe2nd), and [Jaron Degen](http://jarondegen.com)*

Check out a live version of **Tequila With Strangers** here: [Tequila With Strangers Live](http://tequilawithstrangers.herokuapp.com/)

**Tequila With Strangers** is a clone of the website Tea With Strangers (with a twist!), where users can create and join meetups across their home city, to meet new locals and bond over a shared drink. The backend of setGuru is built with [Express.js](https://expressjs.com/) and connected to a [PostgreSQL](https://www.postgresql.org/) database using [Sequelize](https://sequelize.org/). Frontend rendering is handled with [Pug](https://pugjs.org/api/getting-started.html).

> Curent Status: Ongoing Development

**Table of Contents**
* [Technologies](#technologies)
* [Installation](#installation)
* [Database Schema](#database-schema)
* [MVP Features](#mvp-features)
* [Feature Backlog](#feature-backlog)

## Technologies
* HTML/CSS
* Javascript
* Pug
* Express.js
* Sequelize
* PostgreSQL
* Heroku

## Installation
1. Clone this repository:
    ```bash
    $ git clone https://github.com/TequilaWithStrangers/aaTequilaWithStrangers.git
    ```
2. Install npm dependencies:
    ```bash
    $ npm install
    ```
3. Create a **.env** file based on the **.envexample** with proper settings for your development environment.
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file with CREATEDB privileges.
5. Migrate and seed your database:
    ```bash
    $ npx dotenv sequelize db:migrate
    $ npx dotenv sequelize db:seed:all
    ```
6. Start the server: 
    ```bash
    $ npm run start
    ```

## Database Schema
### Tables
1. Users
    - firstName
    - lastName
    - email
    - password hash
    - cityId (belongsTo to Cities.id)

1. Cities
    - id (hasMany Users, Events)
    - city name
    - constraint: unique (& pre-defined list)

1. Events
    - cityId (belongsTo Cities.id)
    - date & time
    - venue/address
    - name
    - description
    - hostId (belongsTo Users.id)
    - [additional feature] number of people attending
    - [additional feature] limit number of people attending

1. Joint Table
    - userId (belongsToMany Users.id)
    - eventId (belongsToMany Events.id)


## MVP Features
--------------
- [X] Landing page/homepage that includes information about site and link to signup/login. 
- [X] Sign-Up page where users submit their name, email, and home city, and create a password. 
- [X] Log-in page where users provide their email and password to log into the site. 
- [X] Sign-out feature where session cookie is deleted and user is redirected to sign-in page. 
- [X] A viewable table of upcoming Tequila Times
- [X] A viewable Tequila Time details page.  
- [X] A viewable dashboard of joined/hosted Tequila Times. 
- [X] Ability to join and leave a Tequila Time in your city. 
- [X] Ability to create, update, and delete a new Tequila Time. 

## Features Backlog
-------------------
- [ ] Display upcoming Tequila Times as a calendar view, with distinctions between past and upcoming events. 
- [ ] Ability to apply to be a host (host application form & approval process).
- [ ] Google Map API showing events based on location.
- [ ] Suggestions based on event details and user profiles. As a typical user, I want to receive suggestions based on my interest so that I can meet like-minded strangers. 
- [ ] Ability to view profile pages/host pages. 
- [ ] Adjust event details for local time zones. 
- [ ] Limit number of people attending each event. 
- [ ] Search functionality



