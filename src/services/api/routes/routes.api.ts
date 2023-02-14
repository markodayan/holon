import { Router } from 'express';

import * as health from '@api/controllers/health.controllers.api';
import * as transaction from '@api/controllers/transaction.controllers.api';
import * as flow from '@api/controllers/flow.controller.api';
import * as account from '@api/controllers/account.controller.api';

const router = Router();

// GET /health
router.route('/health').get(health.healthCheck);
// GET /tx
router.route('/tx').get(transaction.getTransactionsByFlowId);
// GET /flows?address=${address_query_param_value}
router.route('/flows').get(flow.getFlowsByAddress);
// GET /account?address=${address_value}
// GET /account?label=${label_value}
router.route('/account').get(account.getAccountBy);

export default router;
