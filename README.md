# mongoose example
Hello guys! Here we will try to get data from database with the help of mongoose module.

### Installing mongoose
in your project folder

`npm install mongoose`

then, inside your index.js

`const mongoose = require('mongoose');`

### Creating Model 
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
