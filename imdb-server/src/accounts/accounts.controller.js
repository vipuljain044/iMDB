const express = require("express");
const router = express.Router();
const accountService = require("./account.service");
const { registerSchema, authenticateSchema } = require("./account.schema");

function setTokenCookie(res, token) {
  // create cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
}

// routes
router.post("/register", registerSchema, async (req, res, next) => {
  try {
    const accountInfo = await accountService.register(
      req.body,
      req.get("origin")
    );
    if (accountInfo)
      res.json({
        statusCode: 200,
        message: "Registration Successful",
        accountInfo,
      });
    res.status(400).send({
      statusCode: 400,
      message: `${req.body.email} already registered`,
    });
  } catch (err) {
    res.status(500).send({
      statusCode: 500,
      message: err,
    });
  }
});

router.post("/authenticate", authenticateSchema, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip;
    const { refreshToken, ...accountInfo } = await accountService.authenticate({
      email,
      password,
      ipAddress,
    });
    setTokenCookie(res, refreshToken);
    res.json({ statusCode: 200, message: "Login Successful", accountInfo });
  } catch (err) {
    res.status(400).send({
      statusCode: 400,
      message: err,
    });
  }
});

module.exports = router;
