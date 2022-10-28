// import * as swaggerJson from '../dist/swagger.json';
import doc from './swagger';
import swaggerUI from 'swagger-ui-express';
import v1 from './modules/v1';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

// SWAGGER DOCS
router.use('/docs', swaggerUI.serve, swaggerUI.setup(doc));
router.use('/v1', v1);

router.use((req: Request, res: Response, _next: NextFunction) => {
  res
    .status(200)
    .send(
      'This endpoint does not exist yet, check back sometime in future and we may have it',
    );
});
export default router;
