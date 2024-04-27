const User = require("../models/user");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { handle, email, password, category } = req.body;
  console.log(req.body);

  try {
    const defaultLink = { url: " ", title: "typefinance", icon: "https://typefinance.com/favicon.ico " };
    const user = await User.create({
      handle,
      email,
      password,
      role: category,
      links: [defaultLink],
    });
    const token = jwt.sign({ email: email }, process.env.SECRET_JWT);
    console.log('user',token);
    return res.status(200).json({
      message: "user created",
      status: "success",
      token: token,
      id: user._id,
    });

  } catch (error) {

    if(error.code === '11000'){
      return res.json({
    

        message: 'Try different handle or email',
        status: "error",
       
      });
    }


    return res.status(500).json({
    

        message: error.message,
        status: "error",
       
      });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  try{
    const user = User.findOne({ email: email, password: password });
    console.log(user);
    if(!user) {
      return res.json({ status: 'not found', error: 'Invalid Credentials'});
    }
    const token = jwt.sign({email: email }, process.env.SECRET_JWT);
    return res.json({
      message: 'user found',
      status: "success",
      token: token,
      id: user._id
    });
  } catch (error){
    return res.json({
      message: error.message, status: "error"
    });

  }
  
};

module.exports = { registerUser, loginUser };
