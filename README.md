# Mongoose example
Hello guys! Here we will try to get data from database with the help of mongoose module.

### The whole principle is like this:
    1. Install mongoose, connect with it to database.
    2. Create model and export it.
    3. Use model inside route handler.
    5. Render PUG template with data from model.
    4. Use variable inside PUG template.

## Installing mongoose and connecting to your database
in your project folder

`npm install mongoose`

then, inside your index.js

`const mongoose = require('mongoose');`

then, connect to database

My database is called **iagencies**, so you will have to change it for **your database name**.

```javascript
const dbUrl = 'mongodb://localhost:27017/iagencies';
mongoose.connect(dbUrl);
```

## Creating Model 
In the project folder lets create folder **model** and inside it, create file `agency.js`. This model will be representing collection in your database.

`agency.js` is just in my case. If you have products in your application, then it will be `product.js`.

so you will have following structure
```
/yourproject
|- models
    |- agency.js
index.js
```
**agency.js**
```javascript
const mongoose = require('mongoose');

const agencySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    address: String,
    website: String
});

module.exports = mongoose.model('Agency', agencySchema);
```
In the following line, inside .model() method, 'Agency' argument represents collection in your database. Mongoose takes this argument and create reference to the collection with **same name but in plural form** in your database.

So if you have **products** collection, here you would specify **'Product'**. If you have **cars** collection, you would specify **'Car'**. Be careful with that. If you specify wrong name, reference to your collection will not work.
In my case I have **`agencies`** collection in my database. So I specify **'Agency'**.
`module.exports = mongoose.model('Agency', agencySchema);`

**Also notice** that we are exporting our model, to be able to use it in other files.

## Getting data from collection
To get data from collection iside database we need to use our previously created model. We need to **require** it inside our **index.js** file or inside file which is using **router**. In my case I'm using separate file that uses **router**.

`const Agency = require('./models/agency');`

Then we can use this model inside the **route handling method** like `app.get('/' function(req, res){})`.

In my case it will be like this:
```javascript
const express = require('express');

const router = express.Router();

const Agency = require('./models/agency');

router.get('/', function(req, res){
    
    
    Agency.find().exec().then(function(docs){
        console.log(docs);
        res.render('agencies', {agencies: docs});    
    });

    

});

module.exports = router;
```

In your case instead of **router.get()** it will be like **app.get()**:

**index.js**
```javascript

const Agency = require('./models/agency');

app.get('/', function(req, res){
    
    Agency.find().exec().then(function(docs){
        console.log(docs);
        res.render('agencies', {agencies: docs});    
    });
    

});
```
The following code will get data from **agencies** collection and contain it inside the **docs** parameter(you can name it differently).
```javascript
Agency.find().exec().then(function(docs){
        console.log(docs);
        res.render('agencies', {agencies: docs});    
    });
```
**Take a good look** that if we want to render `.pug` template with our data, we have to do it inside `.then()` method.

Here `docs` parameter contains our data from database, and `res.render('agencies', {agencies: docs});` renders `agencies.pug` template and gives it variable, that receives value from docs.

## Accessing data in PUG template
Now when I've rendered `agencies.pug` template with agencies variable in it, I can loop through it and dynamicaly display it's agency properties inside pug.

```javascript
.agencies-list.border
              each agency in agencies
                .agency-item
                  h4.agency-title= agency.name
                  address
                    | #{agency.address}
                    br
                    | Winnipeg, Manitoba
                    br
                    a(href=agency.website) #{agency.website}
```
Here **each agency in agencies** loops through agencies and for each of them creates following html elements.

To render agency propety I'm using forlowing ways of assigning:
```
.agency-item
    h4.agency-title= agency.name
    address
    | #{agency.address}
    br
    | Winnipeg, Manitoba
    br
    a(href=agency.website) #{agency.website}
```    

which will transform in the following:
```html
<div class="agency-item">
    <h4 class="agency-title">Manitoba Start</h4>
    <address>
        1643 Henderson hwy.
        <br>
        Winnipeg, Manitoba
        <br>
        <a href="manitobastart.ca">www.manitobastart.ca</a>
    </address>
```
You can create some simmilar **pug** code to render dynamicaly your data, like `products` or anything.

