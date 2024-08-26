module.exports = (req, res, next) => {
    const { username, email, password } = req.body;
  
    //   if (req.path === "/register") {
    //     if (![firstname, lastname,  email, phone, password].every(Boolean)) {
    //       return res.status(400).json({
    //         error: "Missing credentials",
    //       });
    //     }
    //   }
  
    if (req.path === "/register") {
      if (!username || !email || !password) {
        return res.status(400).json({
          error: "Missing credentials",
        });
      }
    }
  
    if (req.path === "/login") {
      if (!username || !password) {
        return res.status(400).json({
          error: "Missing credentials",
        });
      }
    }
    next();
  };