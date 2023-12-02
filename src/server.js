const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const userController = require('./controllers/userController');
const mongoose = require('mongoose');
const User = require('./models/User'); 
const ensureAuthenticated = require('./middlewares/ensureAuthenticated.js');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();
let fetch;

// Immediately Invoked Function Expression (IIFE) to load fetch
(async () => {
  fetch = await import('node-fetch').then(module => module.default);
})();

require('dotenv').config()

const MONGO_URL = process.env.MONGO_DB || '';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    }
);

const app = express();

// app.use(express.static(__dirname + '/src'));

app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Named exports
module.exports = {
    app: app,
    // server: server
};

app.set('view engine', 'ejs');
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views', 'users'), path.join(__dirname, 'views', 'products')]);

app.get('/', (req, res) => {
    res.render('home');  //to home.ejs
});

app.get('/register', userController.getRegister);
app.post('/register', userController.postRegister);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);

app.post('/logout', userController.postLogout);

app.get('/member', userController.getMemberPage);

//Display password reset page
app.get('/reset-password', userController.getResetPassword);

//Process password reset request
app.post('/reset-password', userController.postResetPassword);

//Use token to display password set page
app.get('/reset/:token', userController.getNewPassword);

//set the new password
app.post('/new-password', userController.postNewPassword);

app.get('/items', async (req, res) => {
    try {
        const recommendedItems = items
        res.render('items', { items,recommendedItems });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.get('/item/:itemId', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.itemId));
    if (!item) {
        return res.status(404).send('Item not found');
    }
     // Set the headers
     res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
     res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString()); // 1 hour from now
     res.setHeader('Last-Modified', new Date().toUTCString()); // Current server time
     
    
    res.json(item);
});

app.put('/item/:itemId', ensureAuthenticated, (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.itemId));
    if (!item) {
        return res.status(404).send('Item not found');
    }

    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.image = req.body.image || item.image;

    res.json(item);
});

app.delete('/item/:itemId', ensureAuthenticated, (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.itemId));
    if (itemIndex === -1) {
        return res.status(404).send('Item not found');
    }
    items.splice(itemIndex, 1);
    res.json({ msg: 'Item deleted' });
});

app.post('/item', ensureAuthenticated, (req, res) => {
    const newItem = {
        id: items.length + 1, 
        name: req.body.name,
        description: req.body.description,
        image: req.body.image
    };
    items.push(newItem);
    res.json(newItem);
});

app.post('/purchase/:itemId', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        if (!user.purchaseHistory) {
            user.purchaseHistory = [];
        }
        user.purchaseHistory.push(req.params.itemId);
        await user.save();
        res.json({ msg: 'Item purchased' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

function countPurchases(purchaseHistory) {
    const genreCounts = {};
    for (let itemId of purchaseHistory) {
        const item = items.find(i => i.id === parseInt(itemId));
        if (item) {
            const genre = item.genre;
            if (!genreCounts[genre]) {
                genreCounts[genre] = 0;
            }
            genreCounts[genre]++;
        }
    }
    return genreCounts;
}

function getRandomItemsFromGenre(genre, count) {
    const genreItems = items.filter(item => item.genre === genre);
    const shuffled = genreItems.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

app.get('/recommended-items', ensureAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        
        if (!user.purchaseHistory || user.purchaseHistory.length === 0) {
            return res.render('items', { items: [], recommendedItems: [] }); 
        }

        const genreCounts = countPurchases(user.purchaseHistory);
        
        // Get most purchased genre
        const mostPurchasedGenre = Object.keys(genreCounts).reduce((a, b) => genreCounts[a] > genreCounts[b] ? a : b);

        // Obtain 5 random items from the most purchased genre
        const recommendedItems = getRandomItemsFromGenre(mostPurchasedGenre, 5);

        res.render('items', { items: items, recommendedItems: recommendedItems });

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.use(express.static(path.join(__dirname, 'public')));


app.use(morgan('tiny'));