const { getMeteors } = require('../services/meteorService')
const { getImage } = require('../services/imageService')

const meteorApiController = async (req, res, next) => {
    try {
        const result = await getMeteors(req);
        res.status(200).json({
            meteors: result
        });
    } catch (error) {
        next(error);
    }
}

const imageApiController = async (req, res, next)=> {
    try {
        const result = await getImage(req);
        res.status(200).send({result});
    }
    catch (error) {
        next(error);
    }
}

module.exports = { meteorApiController, imageApiController };