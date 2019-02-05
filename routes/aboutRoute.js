const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('about', {
        pitch:'This is my elevator pitch. It is the elevator pitch to end all elevator pitches. Your mind is blown. Your mortal brain can scarcely process how well my prior experience maps to your open dev position. This is my elevator pitch. It is the elevator pitch to end all elevator pitches. Your mind is blown. Your mortal brain can scarcely process how well my prior experience maps to your open dev position. This is my elevator pitch. It is the elevator pitch to end all elevator pitches. Your mind is blown. Your mortal brain can scarcely process how well my prior experience maps to your open dev position.'
    });
});

module.exports = router;