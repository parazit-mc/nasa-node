const axios = require('axios');
const { buildImageUri } = require('../../helpers/helpers');

async function roverImageController(req, res) {
    try {
        console.log("Authenticating user " + req.body.userId + " " + req.body.userName + ", api key " + req.body.apiKey);
        const uri = buildImageUri(req.body.apiKey);
        const response = await axios.get(uri);
        const imageUrl = response.data.latest_photos[0].img_src;
        res.status(200).send({imageUrl});
    }
     catch (error) {
            console.error(error);
            res.status(500).json({ error: error, status: 500 });
        }
};

module.exports = {roverImageController};