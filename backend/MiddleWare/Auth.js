
export const ensureAuthenticated = (req, res, next) => {
//  // if user is authenticated, pass to next middleware
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");

const auth=req.headers['Authorization'];
if (!auth) {
  return res.status(401).json({msg:"No token provided"});   }
  try {
    const decoder =JsonWebTokenError.verify(auth,process.env.JWT_SECRET);
    req.user=decoder;
    next();
  } catch (error) {
    return res.status(401).json({msg:"Token is not valid"});
  }
}