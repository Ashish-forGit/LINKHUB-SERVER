const User = require("../models/user");
const {jwtDecode} = require("jwt-decode");

const dashBoardData= async (req, res)=>{
    const { tokenMail } = req.body;
    console.log(tokenMail);
    try {
      const decodedTokenMail = jwtDecode(tokenMail, process.env.SECRET_JWT);
      const email = decodedTokenMail.email;
      console.log("decoded email", email);
      const user = await User.findOne({ email: email });
      const userData = {
        name: user.name,
        role: user.role,
        bio: user.bio,
        avatar: user.avatar,
        handle: user.handle,
        links: user.links.length
      };
      return res.json({ message: "User loaded", userData, status: "Okay" });
    }catch (err) {
        return res.json({ status: "error", error: err.message });
      }
    };
     
    module.exports = { dashBoardData };