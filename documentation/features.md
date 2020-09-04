# FEATURES

User Stories
------------
1. As an unauthorized user, I want to view a landing page that provides me with information about the website, so I can decide whether or not to sign up. 
    - Questions
    - Acceptance Criteria
        - [ ] User can visit the `/` route and will be served a homepage/landing page that tells them more about the Tequila with Strangers app, with a link to sign-up. 

1. As an unauthorized user, I want to be able to sign up for the website via a signup form in order to access this awesome website.
    - Questions
        - How long should session last?
            - 1 Day
        - What information are we collecting from the user?
            - firstName, lastName, email, password, location(city)
        - Whats the UX like? What does the form look like? How simple is it?
            - Form: Input for all info above, submit button
            - MVP: Bootstrap
            - [Additional Feature] Customize CSS/Design
        - Where should the user be redirected after signup?
            - `/events/cityId`
            - Event Table/Calendar Page (default to city filter i.e. select that filters down to city)
        - What happens if the user has signed up previously? (what makes a user unique?)
            - Error message i.e. "User already exists at the Email, Click HERE to log-in"
            - User = email
        - What are the password requirements?
            - Steal regex from project that requires one special char, one num, etc. 
        - What happens if the user’s password isn’t strong enough?
            - Throw error message (array) specific to each requirement they are missing. 
        - Are we allowing sign up via OAuth?
            - MVP: Session-based auth (cookies)
            - [Additional Feature] OAuth 2.0
        - Do we need a confirmation email?
            - [Additional Feature]
        - What routes should we use for sign up? 
            - `/sign-up` (get/post)
    - Acceptance Criteria
        - [ ] User can visit the `/sign-up` route and will be served a form with firstName, lastName, email, password, location(city). 
        - [ ] After user enters valid information for all fields, a new user row is added to the User table, and user is directed to a "success" page and prompted to login. 
        - [ ] If a user enters invalid sign-up information, they receive a message specific to the information that is incorrect. 
        - [ ] If a user enters an email that is already in use for another user, they receive a message indicating such, with a link to `/log-in`

1. As an unauthorized user, I want to be able to login to the website, via a form, in order to access my private information.
    - Questions
        - Will the user enter a username or an email address to login?
            - User will login via email and password
        - What routes should we use for login?
            - `/log-in` w/ GET and POST
        - Where should the user be redirected after login?
            - `/events/cityId`
        - Will we allow oauth authentication via a third party?
            - [Additional Feature]
        - What happens if the user doesn’t exist yet?
            - Display error message.       
        - What happens if the user enters the wrong password?
            - Display error message Invalid Login :( please try again.
        - Should this story include allowing a user to reset their password?
            - [Additional Feature]
        - Should logging in set a session or use token based authentication?
            - We will use session auth for now
    - Acceptance Criteria
        - [ ] User can visit the `/log-in` route and will be served a form requesting email and password, along with link to sign-up page. 
        - [ ] After user enters valid login information, the user is redirected to `/events/cities/:id` route.
        - [ ] After user successfully logs in, a session is created with the necessary cookies/etc. 
        - [ ] If a user enters incorrect log-in information, they receive an error message. 

1. As an authorized user, I want to be able to log out of the application in order to protect my private information. 
    - Questions   
        - Where should you be directed upon signout?
            - `/`
        - Will a user be automatically signed out after a period of time? If so what period?
            - 1 day (session cookie will expire)
        - How can user log out?
            - Log-out link/button will be within navigation bar/available on every page.
    - Acceptance Criteria
        - [ ] From any page on the site, the user can click a "Log out" link, which will manually delete their session cookie (logging them out), and redirecting them to the `/` homepage. 
    
1. As an authorized user, I want to see upcoming tequila-based meetups in my home city so that I can meet and drink with strangers. 
    - Questions
        - Will user see every event in city?
            - All upcoming events. 
        - Can user organize events by time/date/proximity/etc?
            - [Additional Feature]
            - Proximity - Google API
        - Will there be distinct tables/pages for all events vs joined/hosted events?
            - Yes, joined/hosted events will be served on separate user dashboard page. 
        - What will happen when you click on a specific event?
            - User will be directed to individual event page. 
    - Acceptance Criteria
        - [ ] User can visit the `/events` route and will be served a table containing all upcoming events organized by date ascending. 
        - [ ] User can view events specific to a given city by selecting that city in a scrollbox. Route will update to `/events/cities/:id` and serve the corresponding events.
        - [ ] Upon login, will default to user's home city.  
        - [ ] User can filter events by their home city (button to toggle between `all events` and `home city events`).
    - Additional Features
        - [ ] User can select additional sorting and/or filtering methods for events. 

1. As an authorized user, I want to see events that I will be joining or hosting. 
    - Questions
        - Will user see all joined events?
            - Yes, both past and upcoming events
        - Will there be a distinction between events the user is joining vs hosting?
            - Yes, distinction will be visible to user. 
    - Acceptance Criteria
        - [ ] User can visit the `/dashboard` route and will be served a greeting with their username and a table containing all events that they have joined or hosted, including *ADD DETAILS HERE*
        - [ ] User can click into an individual event and be directed to the individual event page. 
        - [ ] User will be able to view the distinction between an event that they are joining vs hosting. 
        - [ ] User will be able to view the distinction between upcoming events and events occuring in the past. 

1. As an authorized user, I want to view the details of a selected event, and join or leave the event if interested/uninterested
    - Questions
        - 
    - Acceptance Criteria
        - [ ] User can visit the `/events/:id` route and will be served a page that includes the following event details: city, venue/address, date/time, name, description, host's name, and names of other users joining event.  
        - [ ] User can join the event by clicking a "Join Event" button, which will add the corresponding user/event pair to the Joint Table. 
        - [ ] User can leave the event by clicking a "Leave Event" button, which will delete the corresponding user/event pair from the Joint Table. 
        - [ ] If a user is the host of an event, a "Edit/Delete" button will be viewable and lead to the `/event/:id/edit` page for the event.  

1. As an authorized user, I want to create new tequila-based events so that I can help organize events to bring people together.
    - Questions
        - Where does the user go to create a new event?
            - Link in Navigation Bar, button on Events and Dashboard pages. 
        - How does a user create a new event?
            - Form with city/location, venue/address, name, description, [additional] # people limit. userId will automatically be assigned as hostId.
        - Will a host be able to edit/cancel their event details?
            - Yes
        - How will a host be able to view the options to edit or cancel an event?
            - Use session cookie to determine if user is host of event, and only serve up option on the events detail page if user *IS* the host. 
        - Is there a limit for the number of events a user can create?
            - No, perhaps an additional feature.
        - Can two events created by the same user overlap?
            - Yes, for the MVP. 
    - Acceptance Criteria
        - [ ] User can visit the `/events/new` route and will be served a form to create a new event, including the following inputs: city, date/time, venue/address, name, description. Their userID will automatically be associated with the hostId. 
        - [ ] After user enters valid information for all fields, a new event row is added to the User table, and user is directed to the `/events/:id` details page of the newly created event. 
        - [ ] If a user enters any invalid information in the new event field, they will receive an error message based on the incorrect fields. 

1. As a user, I want a clear and consistent way to navigate across the site.
    - Acceptance Criteria
        - [ ] Once logged in, every page has a consistent navigation display containing:
            - Sign Out link/button
            - Events Page/Calendar
            - Create New Event
            - My Dashboard/My Events
            - Homepage `/`
            - [Additional Feature] Settings/Edit Profile



Features - MVP
--------------
- [X] Landing page/homepage that includes information about site and link to signup/login. 
- [X] Sign-Up page where users submit their name, email, and home city, and create a password. 
- [X] Log-in page where users provide their email and password to log into the site. 
- [X] Sign-out feature where session cookie is deleted and user is redirected to sign-in page. 
- [X] A viewable table of upcoming Tequila Times, with ability to filter by user's home city.
- [X] A viewable Tequila Time details page.  
- [X] A viewable dashboard of joined/hosted Tequila Times. 
- [X] Ability to join and leave a Tequila Time in your city. 
- [X] Ability to create and cancel a new Tequila Time. 

Additional Features
-------------------
[ ] Display upcoming Tequila Times as a calendar view, with distinctions between past and upcoming events. 
[ ] Ability to apply to be a host (host application form & approval process).
[ ] Google Map API showing events based on location.
[ ] Suggestions based on event details and user profiles. As a typical user, I want to receive suggestions based on my interest so that I can meet like-minded strangers. 
[ ] Ability to view profile pages/host pages. 
[ ] Adjust event details for local time zones. 
[ ] Limit number of people attending each event. 
[ ] Search functionality

Tables
------
1. Users
    - firstName
    - lastName
    - email
    - password hash
    - cityId (belongsTo to Cities.id)

2. Cities
    - id (hasMany Users, Events)
    - city name
    - constraint: unique (& pre-defined list)

3. Events
    - cityId (belongsTo Cities.id)
    - date & time
    - venue/address
    - name
    - description
    - hostId (belongsTo Users.id)
    - [additional feature] number of people attending
    - [additional feature] limit number of people attending

4. Joint Table
    - userId (belongsToMany Users.id)
    - eventId (belongsToMany Events.id)


Pages & Routes
--------------
`/` Home
--------

`/sign-up` Sign-Up
-------
- Form generated with `get` request, submit will `post` name, email, password, home city. 
- Utilize Bcrypt for user authentication & authorization (storing password hash to database).

`/log-in` Log-In
------
- Form generated with `get` request, submit will `post` email & password. 
- Utilize Bcrypt for user authentication & authorization.

`/events` & `/events/cities/:id` Table of Events
------------------
- Table generated with `get` request, pulling data from existing events [add'l = calendar].
- Clicking on event will bring you to event details page. 
- Ability to filter by user's city (user's city is stored upon sign-up).

`/event/new` Host/Create New Event
----------
- Form generated with `get` request, submit will `post` which will create a new Event row/entry (automatically make user an attendee of event). 

`/events/:id` Event Details Page
------------
- Details generated with `get` request (attending users viewable as an additional feature).
- User has the ability to join event (`post` request would generate an entry in the Joint Table).

`/events/:id/edit` Edit/Delete Event Page
-----------------------------------------
- Form generated with pre-populated info corresponding to data on file for specific event (mimicing create form). 
- Host user has the ability to edit an event's details (`patch`) .
- Host user has the ability to cancel an event (`delete` event row/entry).

`/dashboard` Dashboard of joined events/hosted events
----------------------------------------
- Table of joined/hosted events generated with `get` request. Able to tell visually which events have occured in past vs upcoming, hosted vs joined events. 
- Clicking on event will bring you to event details page. 

Bonus: Google Map API showing events based on location
------------------------------------------------------
- Add to "Table of Events" page. 
- Use Event.address with API to display events based on location.

Bonus: Suggestions based on event details and user profiles
-----------------------------------------------------------
- Users to select interests upon signup.
- Hosts to assign interest groups to new events when created. 
- Include on designated "Suggestion" page and/or on Events Dashboard. 


