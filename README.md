pot-management serves api's for pot game

STEPS -

1. create a session with request body as below
   ENDPOINT - POST http://localhost:3000/session
   {
   "startTime":"2024-03-05T12:00:00.000Z", // timestamp at which you want to start a session
   "sessionDuration": 3, // duration for which you want the session 3 -> resemble 3 hour
   "potSize": 2 // how many pots you want for that session
   }

   api response -
   {
   "\_id": "65e6f1163fc73d52ca6d4cad", // session tunique id
   "startTime": "2024-03-05T12:00:00.000Z", // session start time
   "endTime": "2024-03-05T15:00:00.000Z", // session end time
   "sessionDuration": 3, // session duration
   "potSize": 2, // total pots associated with session
   "pots": [
   "65e6f1173fc73d52ca6d4caf", // each pot unique id
   "65e6f1173fc73d52ca6d4cb0"
   ],
   "\_v": 0
   }

2. once session is created we need to add user
   ENDPOINT - POST http://localhost:3000/user
   request body
   {
   "email": "user1@gmail.com",
   "userName": "user1"
   }
   api response
   {
   "userName": "user1",
   "email": "user1@gmail.com",
   "balance": 2000,
   "\_id": "65e6f3eeabb8b8cf78e11ada",
   "\_\_v": 0
   }

3. once user is created we need to associate user with a session and pot for them to play
   NOTE - with current implementation user can only be associated to one session and one pot of that session only
   ENDPOINT - PATCH http://localhost:3000/user
   request body
   {
   "sessionId": "65e6f1163fc73d52ca6d4cad",
   "potId": "65e6f1173fc73d52ca6d4caf"
   }
   response body
   {
   "\_id": "65e6f3eeabb8b8cf78e11ada",
   "userName": "user1",
   "email": "user1@gmail.com",
   "balance": 4000,
   "\_\_v": 0,
   "potId": "65e6f1173fc73d52ca6d4caf",
   "sessionId": "65e6f1163fc73d52ca6d4cad"
   }

4. play game
   ENDPOINT - GET http://localhost:3000/game
   money won will be automatically updated in user account
