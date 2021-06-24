const Axios = require("axios");
const API_KEY = "API_KEY";
async function getCoordsForAddress(address) {
  try {
    const response = await Axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${API_KEY}`
    );
    const data = response.data;
    if (
      !data ||
      data.status === "ZERO_RESULTS" ||
      data.status === "REQUEST_DENIED"
    ) {
      return {
        lat: 59.8333776,
        lng: 17.5183639,
      };
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
  } catch (error) {
    return {
      lat: 59.8333776,
      lng: 17.5183639,
    };
  }
}

module.exports = getCoordsForAddress;
