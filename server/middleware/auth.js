import jwt from "jsonwebtoken";
import Axios from "axios";
// wants to like a post
// click the like button => auth middleware (next) => like controller...

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isGoog = req.headers.isgoog;
    // const isCustomAuth = token.length < 500;
    let decodedData;
    console.log("TOKEN LENGTH", token.length);
    if (token && !isGoog) {
      console.log("DECODE NON GOOGLE");
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      console.log("DECODE GOOGLE");
      const user_info = await Axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      req.userId = user_info.data.id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
