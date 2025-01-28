const jwt = require("jsonwebtoken");
const db = require("../config/db")

module.exports = async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(404).json({ message: "incorrect credential 2" });
  }
  try {
    const jwtToken = token.split(" ").pop();
    const data = jwt.verify(jwtToken, "qwertyuiop");

    if (data === null) {
      return res.status(404).json({ message: "incorrect credential 3" });
    }
    
    // if(req.params.id != data.id){
    //   return res.status(404).json({ message: "incorrect credential 4" });
    // }
    console.log("nih data cuy", data);

    req.akun = data;
    next();
  } catch (error) {
    return res.status(500).json({ message: "incorrect credential 5" });
  }
};
