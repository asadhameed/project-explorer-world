module.exports = (req, res, next) => {
  console.log("Middle ware router");
  next();
};
