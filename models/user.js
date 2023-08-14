const getDb = require('../util/database').getDb
const mongodb = require('mongodb')

const ObjectId = mongodb.ObjectId

class User {
  constructor(userName,userEmail,cart,id){
    this.userName = userName
    this.userEmail = userEmail
    this.cart = cart // {items: []}
    this._id = id
  }

  save(){
    const db = getDb()
    return db.collection('users').insertOne(this)
  }

  addToCart(product){

  // Find the Index of the Product
  const cartProductIndex = this.cart.items.findIndex(item => {
    return item.productId.toString() === product._id.toString()
  })

  let newQuantity = 1
  let updatedCartItems = [...this.cart.items]

  if(cartProductIndex >= 0){
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity
  }
  else{
    updatedCartItems.push({
      productId:new ObjectId(product._id),
      quantity:newQuantity
    })
  }

  // Updated Carts
  const updatedCart = {items:updatedCartItems}

  const db = getDb()
  return db.collection('users')
  .updateOne({_id:new ObjectId(this._id)},{$set:{cart:updatedCart}})

  }

 
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(i => {
      return i.productId;
    });
    return db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray()
      .then(products => {
        return products.map(p => {
          return {
            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity
          };
        });
      });
  }

  deleteCartItem(productId){
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString()
    })

  return db.collection('users')
  .updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:updatedCartItems}}})

  }

  getOrder(){
  const db = getDb();
  return this.getCart().then(products => {
    const orders = {
      items: products,
      users:{
        _id: new ObjectId(this._id),
        userName:this.userName
      }
    }
    db.collection('orders')
    .insertOne(orders)
  })
  .then(result => {
    this.cart = {item:[]}
    return  db.collection('users')
    .updateOne({_id:new ObjectId(this._id)},{$set:{cart:{items:[]}}})
  })

  }

  getOrders(){
    const db = getDb();
    return db.collection('orders')
    .find({'users._id':new ObjectId(this._id)})
    .toArray()
  }
  static findById(userId){
    const db = getDb()
    return db.collection('users').find({_id:new ObjectId(userId)})
    .next()
  }
}

module.exports = User