const express = require('express');
const router = express.Router();

let products = () => {
    return fetch('https://fakestoreapi.com/products/1')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                return json; // Return the product data
            });
};

router.get('/test', (req, res) => {
    products().then(product => {
        // Send the product data in the response
        res.send(`Hello World Route! NodeMon Works here too ${JSON.stringify(product)}`);
    });
});
router.get('/test2', (req, res) => {
res.send('Second test')
})

module.exports = router;

