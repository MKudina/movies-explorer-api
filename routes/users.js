const router = require('express').Router();
const { updateUserValidate } = require('../utils/Validators');
const { getUserMe, updateUser } = require('../controllers/users');

router.get('/me', getUserMe);
router.patch('/me', updateUserValidate, updateUser);

module.exports = router;
