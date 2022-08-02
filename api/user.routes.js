const userEndPoint = require('../endPoind/user.endpoint');
const { auth } = require('../middlewear/auth');
const validation = require('../middlewear/validation');
const {signup, signin, profile } = require('../services/user.services');
const { signUpValidator, signInValidator } = require('../validation/user.validation');


const router = require('express').Router()

router.post('/',validation(signUpValidator),signup);
router.post('/signin',validation(signInValidator),signin);
router.get('/profile',auth(userEndPoint.profile),profile);



module.exports = router