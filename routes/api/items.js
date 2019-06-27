const express = require('express');
//creating a router variable from the express.Router object
const router = express.Router();

//bring in our item module ../outside of the api folder ../outside of the routes folder
const Item = require('../../models/Item');
const auth = require('../../middleware/auth');

//@route Get api/items
//@desc get all items
//@access public

router.get('/', (req, res) => {
    //take the model(Item) and find(.find) and sort by date
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items));
});

//@route POST api/items
//@desc post new items
//@access private

router.post('/', auth, (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
});

//@route DELETE api/items/:id
//@desc DELETE EXISTING item
//@access private

router.delete('/:id', auth, (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});



module.exports = router;