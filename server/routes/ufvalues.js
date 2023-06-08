const express = require('express');

const router = express.Router();

const { getAll, store, downloadExcel } = require('../controllers/UFValues');
const auth = require('../middleware/auth');

router.get('/', getAll);
router.post('/', store);
router.get('/generate/excel', downloadExcel);

module.exports = router;
