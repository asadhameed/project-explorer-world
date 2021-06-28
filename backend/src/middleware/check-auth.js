module.exports = (req, res, next) => {
  console.log(req.headers.authorization);
  console.log("Middle ware router");
  next();
};
