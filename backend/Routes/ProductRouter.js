const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req,res)=>{
    res.status(200).json([
        {
            name:"Iphone 15",
            price : 84400
        },
        {
            name:"Apple PC",
            price:1600000
        }
    ])
});

module.exports = router;