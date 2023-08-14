<h1>Installing MongoDb</h1>

<p>Just Install the mongodb with this command 
<code>npm install --save mongodb</code></p>

<h1>Connect a db with client</h1>
<p>First thing we should do is actually related to packages of mongodb besides this, we connect with our client as well.
</p>
<p><b>Note: Now mostly beginner confused with this code that I uploaded to connect I will give you some example of the code as well</b></p>

<h3>This is the code:</h3>

<code>
// Importing mongo Packages
const mongodb = require('mongodb')
// Connect our client (node application) with mongo packages
const mongoClient = mongodb.mongoClient;

// function to execute or connect Database with node app
const mongoConnect = callback => {
  mongoClient.connect('mongodb+srv://wm401238:Nv7XPCYvD0yA0P83@cluster0.7lptiej.mongodb.net/?retryWrites=true&w=majority')
.then((client) => {
  console.log('CONNECTED')
  callback(client)
})
.catch((err) => {
  console.log(err)
})
}

module.exports = mongoConnect
</code>

<p>Now the first question mostly beginner confused when they see a parameter callback is invoke as a function method So here is the detail with some basic code you can understand it in a very convienent way</p>
<code>
// Define a function that takes a callback as a parameter
function doSomethingAsync(callback) {
  setTimeout(() => {
    console.log("Async operation completed");
    callback(); // Invoke the callback function
  }, 2000); // Simulate an asynchronous operation that takes 2 seconds
}

// Define a callback function
function afterAsyncOperation() {
  console.log("Callback executed after async operation");
}

// Call the function and pass the callback
doSomethingAsync(afterAsyncOperation);

</code>
<p>
In this example, we have a function doSomethingAsync that simulates an asynchronous operation using setTimeout. It takes a callback function as a parameter. After the asynchronous operation completes (in this case, after a 2-second delay), it invokes the provided callback function.
</p>

<h2>I am providing difference between Async and Sync as well it will help you to all understand it for those who are not familiar</h2>

<h5>Synchronous (Sync) Operations:</h5>

<p>
In synchronous operations, tasks are executed one after another in a sequential manner. Each task must complete before the next one starts. During the execution of a synchronous task, the program will typically block further execution until that task is finished. This can potentially lead to "blocking" behavior where the program waits for a task to complete, which might not be efficient for tasks that take a long time to finish.

<code>
function syncTask() {
  console.log("Sync Task 1");
  console.log("Sync Task 2");
  console.log("Sync Task 3");
}

console.log("Start");
syncTask();
console.log("End");

</code>

In this example, the output will be:

<code>
Start
Sync Task 1
Sync Task 2
Sync Task 3
End
</code>
</p>

<h5>Asynchronous</h5>

<p>
Asynchronous (Async) Operations:
In asynchronous operations, tasks can be executed independently, and the program doesn't need to wait for a task to complete before moving on to the next one. Asynchronous operations are commonly used for tasks that might take some time, such as making network requests or reading files. Callbacks, promises, and async/await are mechanisms used to handle asynchronous operations in JavaScript.

<code>
function asyncTask(callback) {
  setTimeout(() => {
    console.log("Async Task 1");
    callback();
  }, 2000);
}

console.log("Start");
asyncTask(() => {
  console.log("Async Task 2");
  console.log("Async Task 3");
});
console.log("End");

</code>

Start
End
Async Task 1
Async Task 2
Async Task 3

</p>

<h1>Mongo instructions for doing some CRUD OPS</h1>

<p>
Firstly we create class and besides this we add some functions according to the need

<code>db.collection('products').updateOne({_id:this._id}, {$set:this})</code>
This code refer to this.

db.collection('products'): This part of the code specifies the MongoDB collection named 'products'. It's assumed that db is a reference to your MongoDB database instance.

.updateOne({_id:this._id}, {$set:this}): This is the method call that performs the update operation. Here's what each part does:

updateOne: This is the method used to update a single document in the collection.

{_id:this._id}: This is the filter criteria to find the document that you want to update. It's using the _id field to uniquely identify the document. this._id likely refers to the _id value of the current object/document you're working with.

{$set:this}: This is the update operation. In MongoDB, $set is an update operator that sets the values of specific fields in the document. this is likely referring to the current object/document you're working with, which means that you are updating the document with the same values as the current object.

Putting it all together, this line of code is finding a document in the 'products' collection with a specific _id, and then it's updating that document's fields with the values from the current object. In other words, it's updating a single document's fields to match the fields of the current object.

Please note that this is a simplified explanation, and there might be additional context or logic in your application that influences how this code behaves. It's also important to consider error handling and potential edge cases when working with database operations.


<code>db.collection('products').insertOne(this)</code>

This code refers to

db.collection('products'): This part of the code specifies the MongoDB collection named 'products'. It's assumed that db is a reference to your MongoDB database instance.

.insertOne(this): This is the method call that performs the insertion operation. Here's what each part does:

insertOne: This is the method used to insert a single document into the collection.

this: In this context, this is likely referring to the current object or data that you want to insert into the collection. The entire current object is being inserted as a new document in the collection.

<code>db.collection('products').find().toArray()</code>

db.collection('products'): This part of the code specifies the MongoDB collection named 'products'. It's assumed that db is a reference to your MongoDB database instance.

.find(): This is the method used to query the collection for documents. Calling .find() with no arguments will retrieve all documents from the collection.

.toArray(): This method is used to convert the result of the query (a cursor) into an array of documents. It returns a Promise that resolves with the array of documents.

.then(products => { ... }): This is the .then() block that handles the successful resolution of the Promise returned by toArray(). The products parameter represents the array of documents retrieved from the collection. Inside this block, the code logs the retrieved products array to the console and then returns the array.

.catch(err => { ... }): This is the .catch() block that handles any errors that might occur during the database operation. If an error occurs, it logs the error to the console.

<code>db.collection('products').find({_id:new mongodb.ObjectId(prodId)}).next()</code>

db.collection('products'): This part of the code specifies the MongoDB collection named 'products'. It's assumed that db is a reference to your MongoDB database instance.

.find({_id:new mongodb.ObjectId(prodId)}): This is the method used to query the collection for documents that match a specific criteria. In this case, you're querying for documents with a _id field that matches the value of new mongodb.ObjectId(prodId). This syntax is typically used to search for documents by their unique _id.

_id: The field name used in the query.
new mongodb.ObjectId(prodId): This is creating a new MongoDB ObjectId instance based on the value of prodId. The prodId likely represents the unique identifier of the document you're looking for.
.next(): This method is used to retrieve the next document that matches the query. Since you're querying for a specific document by _id, there should be only one document that matches the query. Calling .next() will retrieve that document.

<code>db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})</code>

db.collection('products'): This part of the code specifies the MongoDB collection named 'products'. It's assumed that db is a reference to your MongoDB database instance.

.deleteOne({_id:new mongodb.ObjectId(prodId)}): This is the method used to delete a single document from the collection that matches a specific criteria. In this case, you're deleting a document with a _id field that matches the value of new mongodb.ObjectId(prodId). This syntax is typically used to delete documents by their unique _id.

_id: The field name used in the query.
new mongodb.ObjectId(prodId): This is creating a new MongoDB ObjectId instance based on the value of prodId. The prodId likely represents the unique identifier of the document you want to delete.
</p>

<h1>Updated Cart</h1>

<p>
Explain this code for the beginners
<code> const updatedCart = {items:[{...product,quantity:1}]}</code>

Demo Code to understand the above line of code.

<code>
const updatedCart = {
  items: [
    {
      // ...product is a spread operator that copies properties from the 'product' object
      // quantity: 1 adds a new property 'quantity' to each item and sets it to 1
    }
  ]
};

// Sample product object
const product = {
  id: 1,
  name: 'Product A',
  price: 10.99
};

// Creating an updatedCart object with a single item
const updatedCart = {
  items: [
    {
      ...product, // Copy properties from the 'product' object
      quantity: 1 // Add a new property 'quantity' and set it to 1
    }
  ]
};

console.log(updatedCart);

{
  items: [
    {
      id: 1,
      name: 'Product A',
      price: 10.99,
      quantity: 1
    }
  ]
}

</code>

If we have multiple products then:

<code>
const product1 = {
  id: 1,
  name: 'Product A',
  price: 10.99
};

const product2 = {
  id: 2,
  name: 'Product B',
  price: 19.99
};

const product3 = {
  id: 3,
  name: 'Product C',
  price: 5.49
};

const updatedCart = {
  items: [
    {
      ...product1,
      quantity: 1
    },
    {
      ...product2,
      quantity: 1
    },
    {
      ...product3,
      quantity: 1
    }
  ]
};

console.log(updatedCart);

{
  items: [
    {
      id: 1,
      name: 'Product A',
      price: 10.99,
      quantity: 1
    },
    {
      id: 2,
      name: 'Product B',
      price: 19.99,
      quantity: 1
    },
    {
      id: 3,
      name: 'Product C',
      price: 5.49,
      quantity: 1
    }
  ]
}



</code>
</p>