import * as express from 'express';
const router = express.Router();
import {
  meteorApiController,
  imageApiController
} from '../controllers/apiController';
import {
  meteorWebController,
  imageWebController
} from '../controllers/webController';
import { validateRequest } from '../validators/validator';
import { imageSchema, meteorSchema } from '../schemas/schema';

router.get(
  '/meteors',
  validateRequest(meteorSchema, 'query'),
  meteorWebController
);
router.get(
  '/api/v1/meteors',
  validateRequest(meteorSchema, 'query'),
  meteorApiController
);

router.post(
  '/api/v1/rover-image',
  validateRequest(imageSchema, 'body'),
  imageApiController
);
router.post(
  '/rover-image',
  validateRequest(imageSchema, 'body'),
  imageWebController
);

export default router;
