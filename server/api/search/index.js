const router = require('express').Router();
const {getClientNames, getClientById} = require('./google');

module.exports = router;

router.get('/', getClientNames);
router.get('/:id', getClientById);
