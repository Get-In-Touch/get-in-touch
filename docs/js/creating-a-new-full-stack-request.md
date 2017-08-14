# Creating a new full-stack request

So you want the frontend to do something with the database?
Here are the steps you’ll need to follow.
You don’t need to do things in this order, of course - this is loosely modeled on the data flow:
1. Create the UI (if relevant) to initiate the request from the server/db.
2. Create an action that should be fired when the user uses the relevant UI
   (e.g., when they click a certain button).
   Make sure to import that action and use mapDispatchToProps to get the action onto the component’s props.
   1. This action should not actually do any ajax calls itself; that’s the job of the saga (see below).
3. Create a reducer that listens for the action.
   You’ll probably want to record somewhere in the Redux state that there’s a pending action.
   That will allow your UI to reflect the pending request - that might cause a spinner to appear,
   for example, to notify the user that their request has been initiated, but that it hasn’t fully saved yet.
   1. You might need to update the top-level structure of our Redux state. See this file: app/reducers.js 
4. Set up a saga.
   1. If you’re not familiar with sagas, talk to someone on the project who does,
      and/or read some of the basic documentation.
      Then check out some of our existing saga files to see it implemented.
      Most of those are almost identical in structure to the structure recommended in the docs.
   2. Create a saga in the component’s saga file.
      It should listen for the request action you created in previous steps,
      and should initiate your AJAX request (or other asynchronous process).
      When that async function resolves, the saga will generate its own action.
      Usually you’ll have it either send a request-succeeded type of action
      (with the data from the async function as the payload), or a request-failed type of action.
      1. Add reducers to listen for the request-succeeded or request-failed actions, and update state accordingly. 
   3. Now you need to make sure the saga you put together is being run by our saga middleware.
      Check out the `// Run sagas` comment in `app/store.js` to see how to do that.
5. If the AJAX request hits our server, you’ll need our server to handle the request correctly.
   First, create an express route here: `server/routes.js`.
   For now, you can leave the controller blank, because you need to create that.
   Come back after creating the controller and make sure the controller is listed in the route you create.
6. Create the appropriate controller to handle the request to the route you specified.
   That controller should probably go in our server/controllers directory.
7. If that controller needs to access the db, it should make use of one of our db models (found here: db directory).
   You’ll probably need to update one of the models there, or even create a whole new model,
   and maybe even a whole new table in our db. Have fun!

Here’s the actual flow of data:
1. The user does something in the UI.
   The react component responds by dispatching an action, indicating that there will be an async request.
2. The reducer hears that action and updates state in some way,
   probably indicating that there’s a request in progress. 
3. The UI may update in some way in response to that change in redux state.
4. The saga (which is active because it was run by our saga middleware) also hears the action
   and kicks off the async function. It listens for that function to resolve (i.e., come back with a response).
5. If the async function is a call to our db, the request is heard by our express server
   Our server matches the request to the correct route, and invokes the corresponding controller.
6. The controller may make its own request to the db, or to some other async service, such as an external API.
   When the controller is ready (e.g., when it hears back from that async service), it responds to the frontend.
7. The saga (on the frontend) hears the response,
   and sends off its own action - hopefully an action indicating that the async function resolved correctly.
   The action may also include the data sent from the server.
8. The corresponding reducer listens for that action, and updates state accordingly.
9. The UI may update in response to the redux state changing.