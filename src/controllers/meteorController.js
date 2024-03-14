const { getMeteors } = require('../services/meteorService')

const meteorController = async (req, res, next) => {
    try {
        const result = await getMeteors(req);
        res.status(200).json({
            meteors: result
        });
    } catch (error) {
       next(error);
    }
}

module.exports = {meteorController};