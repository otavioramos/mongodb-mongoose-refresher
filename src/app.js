const express = require('express')
const { createProduct, getProducts  } = require('./mongo')

const app = express()
const PORT = 3000

app.use(express.json())

app.post('/products', createProduct)

app.get('/products', getProducts)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))