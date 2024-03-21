import { Request, Response, NextFunction } from 'express';
import  { getMeteors }  from '../services/meteorService';
import { getImage } from '../services/imageService';
import { getMeteorRequestData, getImageRequestData } from "../utils/requestData";

export const meteorWebController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { date, isHazardous, count } = getMeteorRequestData(req);
        const result = await getMeteors(date, isHazardous, count);
        res.render('meteor.html', { meteors: result });
    } catch (error) {
        next(error);
    }
}

export const imageWebController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userId, userName, apiKey} = getImageRequestData(req);
        const result = await getImage(userId, userName, apiKey);
        res.render('roverImage.html', { imageUrl: result });
    } catch (error) {
        next(error);
    }
}

export default { meteorWebController, imageWebController };