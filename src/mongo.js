const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://user1:password123@localhost:27017/admin'

const createProduct = async (req, res, next) => {
    const newProduct = {
        name: req.body.name,
        price: req.body.price
    }
    const client = new MongoClient(url)
    
    let result;
    try {
        await client.connect()
        const db = client.db()
        result = await db.collection('products').insertOne(newProduct)
    } catch(error) {
        console.log(error);
        return res.json({message: 'Could not store data.'})
    }
    client.close()
    res.json({product: newProduct})
}

const getProducts = async (req, res, next) => {
    const client = new MongoClient(url)
    let products
    try {
        await client.connect()
        const db = client.db()
        products = await db.collection('products').find().toArray()
    } catch(error){
        console.log(error);
        return res.json({message: 'Could not retrieve products.'})
    }
    client.close()
    res.json({products})
}

module.exports = { createProduct, getProducts }