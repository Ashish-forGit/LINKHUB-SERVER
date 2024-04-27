const User = require("../models/user");
const {jwtDecode} = require("jwt-decode");
 
const loadSocials = async (req, res) => {
  const { tokenMail } = req.body;
  try {
    const decodedTokenMail = jwtDecode(tokenMail, process.env.SECRET_JWT);
    const email = decodedTokenMail.email;
    console.log(email);
    const user = await User.findOne({ email: email });
    const socials = user.socialMedia;
    return res.json({ message: "found", socials, status: "success" });
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};

const loadLinks = async (req, res) => {
    const { tokenMail } = req.body;
    try {
      const decodedTokenMail = jwtDecode(tokenMail, process.env.SECRET_JWT);
      const email = decodedTokenMail.email;
      console.log(email);
      const user = await User.findOne({ email: email });
      const links = user.links;
      return res.json({ message: "found", links, status: "success" });
    } catch (error) {
      return res.json({ status: "error", error: error.message });
    }
  };
   
  module.exports = { loadSocials, loadLinks };
