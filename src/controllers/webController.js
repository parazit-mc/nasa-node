const { getMeteors } = require('../services/meteorService');
const { getImage } = require('../services/imageService')

const meteorWebController = async (req, res, next) => {
    try {
        const result = await getMeteors(req);
        res.render('meteor.html', { meteors: result });
    } catch (error) {
        next(error);
    }
}

const imageWebController = async (req, res, next) => {
    try {
        const result = await getImage(req);
        res.render('roverImage.html', { imageUrl: result });
    } catch (error) {
        next(error);
    }
}

module.exports = { meteorWebController, imageWebController };