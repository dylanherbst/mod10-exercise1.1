// console.log('HAS STARTED');


const testRoutes = require('./routes/myTestRoutes');


const express = require('express')

const app = express()
const port = 3000

app.use(express.json());

// const swaggerUi = require('swagger-ui-express');
// swaggerDocument = require('../swagger.json');
// app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



app.get('/E1', (req, res) => {
    res.send('Exercise 1 Example')
    })


app.use('/', express.static('public'))

// app.use('/', express.static('calc'))


app.use('/mytest', testRoutes);



app.listen(port, () => {
    console.log(`SECRET KEY AND ACTIONS ADDED Example app listening
    at http://localhost:${port}`)
    })