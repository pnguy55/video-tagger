const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const TagList = mongoose.model('tagLists');


module.exports = app => {

    // user is included on cookie

    app.get('/api/tagLists', requireLogin, async (req, res) => {
        // the select recipients removes that from the get request
        const tagList = await TagList.find({ _user: req.user.id });

        res.send(tagList);
    });

    app.get('/api/tagLists/all', async (req, res) => {
        const tagList = await TagList.find({})
        
        res.send(tagList);
    })

    app.delete('/api/tagLists/:tagListId', requireLogin, async (req, res) => {
        const tagList = await TagList.findByIdAndDelete(req.params.tagListId);
        console.log(tagList);

        res.status(200).send()
    })

    app.post('/api/tagLists', requireLogin, async (req, res) => {
        const { title, tags } = req.body;

        const tagList = new TagList({
            title,
            tags: tags,
            _user: req.user.id,
            dateCreated: Date.now()
        });

        try {
            await tagList.save();
            res.send();

        } catch (err) {
            res.status(504);
        }
    });

    // app.get('api/', requireLogin, (req, res) => {

    // });

};