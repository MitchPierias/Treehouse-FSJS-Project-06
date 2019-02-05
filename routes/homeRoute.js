const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title:"My Awesome portfolio",
        description:"Making the World a Dynamic Place"
    });
});

module.exports = router;