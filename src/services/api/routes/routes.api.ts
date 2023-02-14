import { Router } from 'express';

import * as health from '@api/controllers/health.controllers.api';
import * as transaction from '@api/controllers/transaction.controllers.api';
import * as flow from '@api/controllers/flow.controller.api';

const router = Router();

// GET /health
router.route('/health').get(health.healthCheck);
// GET /tx
router.route('/tx').get(transaction.getTransactionsByFlowId);
// GET /flows?address=${address_query_param_value}
router.route('/flows').get(flow.getFlowsByAddress);

export default router;
