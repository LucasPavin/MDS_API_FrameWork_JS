const {Router} = require('express')
const {inscription, connexion} = require('../Controllers/ctrl')
  
const router = Router()


router.post('/inscription', inscription)
router.post('/connexion', connexion)


module.exports = router