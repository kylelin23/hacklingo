# Authentication

## Database
The user data is stored in a Supabase table named users. 
Each user has an id, email, and password hash (containing the hashed password). 
The password is hashed using the bcrypt library. 

## APIs
| Endpoint | Method | Description |
| -------- | ------ | ----------- |
| /users | POST | Adds a new user to the users table |
| /auth/login | POST | Authenticates user, checking that the password matches |
| /auth/verify | GET | Verifies JWT, checking for an unexpired token with a valid signature |

## JWT Flow
- The user signs up (new user added to table) or logs in (check for correct password)
- JWT is stored in local storage and user is redirected to the home page
- If the user tries to access the authentication page while they have a valid token (check with /auth/verify), they are instead redirected to the home page
- If an unauthenticated user (check with /auth/verify) tries to access a page only authenticated users can access, they are instead redirected to the authentication page
- The JWT is attached to the header of future API requests to verify the user's identity
- To sign out, the token is removed from local storage
