const AdminAuth = (req, res, next) => {
  // Checking if user is Authorized
  console.log("Admin Middleware checking");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";

  if (!isAdminAuthorized) {
    res.status(401).send("Unauthorized Access");
  } else next();
};

module.exports = AdminAuth;
