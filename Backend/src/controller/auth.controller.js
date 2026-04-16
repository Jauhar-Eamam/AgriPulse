const userModel = require("../models/user.model");
const bycrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

async function userSignup(req, res) {
  const { email, password, language } = req.body;

  const isUserExist = await userModel.findOne({
    email,
  });

  if (isUserExist) {
    return res.status(409).json({
      message: "Email already exists",
      field: "email",
    });
  }

  const hash = await bycrypt.hash(password, 10);

  try {
    const user = await userModel.create({
      email: email,
      password: hash,
      language: language,
    });

    const token = await JWT.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(201).json({
        message: "user created successfully",
        user: {
            email,
            language
        }
    })

  } catch (err) {
    res.status(400).json({
      message: "error in backend",
    });
  }
}


async function userLogin(req, res){
    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(404).json({
            message: "Account not found",
            field: "email",
        })
    }

    const isUSerAuthenticated = await bycrypt.compare(password, user.password);

    if(!isUSerAuthenticated){
        return res.status(401).json({
            message: "Incorrect password",
            field: "password",
        })
    }

    const token = await JWT.sign({
        id: user._id
    }, process.env.JWT_SECRET);

    res.cookie("token", token);


    res.status(201).json({
        message: "user login success fully"
    })
}


async function userLogout(req, res){
    res.clearCookie("token");

    res.status(200).json({
        message: "user logout succefully"
    })

    console.log("user loged out")
}

module.exports = { userSignup, userLogin, userLogout };
