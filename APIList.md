# Dev Tinder Api

authRouter

1. Post /signup
2. Post /login
3. Post /logout

## profileRouter

- Get /progile/view
- Patch /profile/edit
- Patch /profile/password

status: ignore, interested , accepted, rejected

## connectionRouter

- Post /request/send/interested/:userId
- Post /request/send/ignore/:userId
- Post /request/review/accepted/:requestedId
- Post /request/review/rejected/:requestedId

## userRouter

- Get /user/connections
- Get /user/requests/reject
- Get /user/feed - Gets you profile of other user on platform.
