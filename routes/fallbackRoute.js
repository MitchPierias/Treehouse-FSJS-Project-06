const express = require('express');
const router = express.Router();

router.get('/error', () => {
    throw new Error("This route mimics a thrown error with a stack trace");
});

router.use((req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(404)
    res.render('error', { error: {message: 'Oops... The page your requested can\'t be found'} });
});

module.exports = router;