import jwt from "jsonwebtoken";

// wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const id = req.headers.id;
    // const isCustomAuth = token.length < 500;
    console.log(token);
    let decodedData;
    console.log("TOKEN LENGTH", token.length);
    if (token && !id) {
      console.log("DECODE NON GOOGLE");
      decodedData = jwt.verify(token, "test");
      console.log(decodedData);
      req.userId = decodedData?.id;
    } else {
      console.log("DECODE GOOGLE");
      //decodedData = jwt.decode(token);
      // console.log(decodedData);
      req.userId = id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
