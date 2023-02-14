import { Router } from 'express';

import * as controllers from '@api/controllers/health.controllers.api';

const router = Router();

router.route('/health').get(controllers.healthCheck);

export default router;
