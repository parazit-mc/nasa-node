const { getImage } = require('../services/imageService')

const imageController = async (req, res, next)=> {
    try {
        const result = await getImage(req);
        res.status(200).send({result});
    }
    catch (error) {
        next(error);
    }
}

module.exports = { imageController };