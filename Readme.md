# What I did in DevTinder?

What I Did.

1. Created repository.
2. Initialize the repository.
3. node_modules, package.json, package-lock.js.
4. what's the diff. between npm i mongodb and npm i mongoose.
5. What is Express.
6. Create a Server.
7. What is nodemon.
8. Diff between caret and tilde ( ^ vs ~)
9. What is the use of '-g' while npm install
10. Sequence/Order of route also matter a lot.
11. Writing Logic to handle GET, POST, PATCH, DELETE API calls and test them in Postman
12. Use of Regex in routes: a+b, a\*b, /.flf$/

```
{
    app.get(/.fly$/,(req, res)=>{
    res.send({
    firstName:"Sankalp",
    lastName:"Haritash"
    })
    })
    }
```

13. Explored routing and the use of ?, +, (), \,\* in the rotes.
14. Reading the query params in the routes.
15. Reading the dynamic routes.
16. Multiple Route Handler - Play with code
17. what is next()
18. next function and error along with res.send()
19. app.use("/route",rH,[rH2,rH3], rH4, rH5);
20. What is Middleware? why do we need it?
21. How express js basically handles request behind the scenes
22. Diff between app.use and app.all?
23. write a dummy middleware for admin.
24. write a dummy middleware for user.
25. Error Handling using app.use('/',(err, req, res, next)=>{}).
26. Create Cluster at MongoDB Cluster.
27. Connect Project to MongoDB Database.
28. Call the connectDB function and connect the database before starting application on 8000
29. Create user Schema and user Model.
30. create /signup API to add data to database.
31. Made API calls from Postman to store them in databases.
32. Diff between JS Object and Json Object
33. Made request from signup API and make dynamic data to store in database
34. User.findOne with duplicate email ids which object will return?
35. API- get user by email.
36. API- feed GET /feed- get all the user from database.
37. API- get user by ID.
38. create delete user- API
39. Diff. between Patch and PUT
40. API- Created Update user API using moongoose model.
41. What r options in Model.findOneAndUpdate method, explore more about it.
42. Created Update user ApI which update User with Email.id
43. Explore schematype options from docs
44. added required, unique, lowercase, enum, minLength, maxLength, min, default, trim, custom validator function in user Schema.
45. Custom check on gender.
46. Improved the DB schema - put all appropriate validation on each field.
47. Added time stamps to the userSchema.
48. Add API level validation on Patch request & signup put API
49. Data Sanitization Add API validation For Each Field.
50. Installed Vlidator function and explore validator libarary function for email, password, photoUrl.
51. Validate data in Signup API.
52. Install Bcrypt pkg.
53. Create Password hash using bcrypt.hash and save user incrypted password.
54. Create login Api.
55. Compare Password and throw error if email or password is invalid.
56. Install Cookie-parser.
57. Send a dummy cookie to user.
58. create Get /ptofile API and check if you get the cookie back.
59. install jsonwebtoken.
60. In login Api created a JWT token.
61. In login Api, after email and password validation, create a JWT token and send it to user.
62. Read cookies inside the profile Api and find the logged in User.
63. Create UserAuth Middleware.
64. Add the userAuth middleware in profile API and to Send connectionRequest.
65. Set the expiry of JWT token and cookies to 7day.
66.
67.
68.
69.
70.
71.
72.
73.
74.
75.
76.
77.
78.
79.
80.
81.
82.
83.
84.
85.
86.
87.
88.
89.
90.

## Todo:

1. Add user image
2.
3.
4.
5.
6.
7.
8.
9.
10.
