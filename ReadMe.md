<h1>What is Mongoose?</h1>

<p>Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. MongoDB is a popular NoSQL database, and Mongoose provides a higher-level abstraction and structure for working with MongoDB in Node.js applications. It simplifies the interaction with MongoDB databases and allows developers to define schemas, models, and relationships between data.</p>

<h1>Connecting to the MongoDB Server with Mongoose</h1>
<p>Visit mongoosejs.com and install package mongoose like "npm install --save mongoose"
Second thing import it in app.js file to connect Database
</p>

<h1>Connecting to the MongoDB Server with Mongoose</h1>

<p>To connect a mongodb using mongoose we use connect method of mongoose with importing in appJS
file.

<code>
mongoose
  .connect(
    'mongodb+srv://wm401238:vfhLiyIBo5coUHsR@cluster0.7lptiej.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
</code>

</p>

<h1>Creating the Product Schema</h1>

<p>
<code>
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
</code>
</p>

<h2>Understand this code</h2>

<code>
cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
</code>

<p>This code is a part of a "cart" feature for an online shopping website. Imagine you're adding items to your shopping cart.

"cart" is like your virtual shopping basket.
"items" is a list inside the cart where you put the products you want to buy.
Each "item" in the list has two things:
"productId": This is a unique ID of the product you want to buy. It's like a special code for that product.
"quantity": This is the number of that product you want to buy.
The code is making sure that when you add something to your cart:

It records the product's unique ID and how many you want to buy.
This setup helps the website remember what you want to buy and how many of each item you've selected.</p>

<h2>More Important features in Mongoose</h2>

<h3>Populate</h3>

<p>
The populate method is used to retrieve referenced documents from other collections and replace the references with the actual data. This is helpful when you have relationships between documents and you want to fetch related data without making additional queries.
</p>

<code>
 .populate('userId', 'name')
</code>

<h3>Select</h3>

<p>
The select method is used to specify which fields you want to include or exclude when querying the database. It helps in retrieving only the necessary data and improving performance.
</p>

<code>
.select('title price -_id')
</code>