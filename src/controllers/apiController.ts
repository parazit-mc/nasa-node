import { Request, Response, NextFunction } from 'express';
import  { getMeteors } from '../services/meteorService';
import  { getImage } from '../services/imageService';

export const meteorApiController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await getMeteors(req);
        res.status(200).json({
            meteors: result
        });
    } catch (error) {
        next(error);
    }
}

export const imageApiController = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const result = await getImage(req);
        res.status(200).send({result});
    }
    catch (error) {
        next(error);
    }
}

export default { meteorApiController, imageApiController };