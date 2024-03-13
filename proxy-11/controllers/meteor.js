const axios = require('axios');
const getMeteorsInfo = require('../../helpers/utils');
const { buildMeteorUri } = require('../../helpers/helpers');

async function meteorController(req, res) {
    try {
        const uri = buildMeteorUri();
        const response = await axios.get(uri);
        const meteorsNearby = response.data.near_earth_objects;
        const queryDate = req.query.date ? new Date(req.query.date).toISOString().split('T')[0] : null;
        const isHazardous = req.query.isHazardous === 'true';
        const count = req.query.count ? parseInt(req.query.count) : null;
        const result = getMeteorsInfo(meteorsNearby, queryDate, isHazardous, count);
        
        res.status(200).json({
            meteors: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message, status: 500});
    }
};

module.exports = {meteorController};