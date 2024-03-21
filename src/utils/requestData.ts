import { Request } from 'express';

export function getMeteorRequestData(req: Request) {
    return {
        date: req.query.date as string,
        isHazardous: req.query.isHazardous === 'true',
        count: req.query.count ? parseInt(req.query.count as string) : null,
    };
}

export function getImageRequestData(req: Request) {
    return {
        userId: req.body.userId,
        userName: req.body.userName,
        apiKey: req.body.apiKey
    }
}
