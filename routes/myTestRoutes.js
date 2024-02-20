
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
res.send('Hello World Route! NodeMon Works here too')
})
router.get('/test2', (req, res) => {
res.send('Second test')
})

module.exports = router;

