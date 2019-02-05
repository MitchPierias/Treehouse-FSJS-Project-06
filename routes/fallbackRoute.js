const express = require('express');
const router = express.Router();

module.exports = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err)
    }
    res.status(400)
    res.render('error', { error: err });
};