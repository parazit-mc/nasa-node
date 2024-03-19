import { Request, Response, NextFunction } from 'express';
import  { getMeteors }  from '../services/meteorService';
import { getImage } from '../services/imageService';

export const meteorWebController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getMeteors(req);
        res.render('meteor.html', { meteors: result });
    } catch (error) {
        next(error);
    }
}

export const imageWebController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getImage(req);
        res.render('roverImage.html', { imageUrl: result });
    } catch (error) {
        next(error);
    }
}

export default { meteorWebController, imageWebController };