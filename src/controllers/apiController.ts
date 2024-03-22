import { Request, Response, NextFunction } from 'express';
import {
  getMeteorRequestData,
  getImageRequestData
} from '../utils/requestData';
import { getMeteors } from '../services/meteorService';
import { getImage } from '../services/imageService';

export const meteorApiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { date, isHazardous, count } = getMeteorRequestData(req);
    const result = await getMeteors(date, isHazardous, count);
    res.status(200).json({
      meteors: result
    });
  } catch (error) {
    next(error);
  }
};

export const imageApiController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, userName, apiKey } = getImageRequestData(req);
    const result = await getImage(userId, userName, apiKey);
    res.status(200).send({ result });
  } catch (error) {
    next(error);
  }
};

export default { meteorApiController, imageApiController };
