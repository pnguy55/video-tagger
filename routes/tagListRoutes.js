const _ = require('lodash');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const axios = require('axios')

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

    app.get('/api/tagLists/gatherVideoList/:videoTitle', async (req, res) => {
        axios.get(`https://www.googleapis.com/youtube/v3/search?maxResults=12&part=snippet&order=viewCount&q=${req.params.videoTitle}+&type=video+&videoDefinition=high&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`)
            .then(function (googleRes) {
                const { items } = googleRes.data;
                const videoList = _.map(items, ({snippet, id }) => {
                    return ({
                        title: snippet.title,
                        videoId: id.videoId,
                        videoURL: `https://www.youtube.com/watch?v=${id.videoId}`,
                        thumbnail: snippet.thumbnails.medium,
                        channelTitle: snippet.channelTitle,
                        channelURL: `https://www.youtube.com/channel/${snippet.channelId}`
                    });
                })
                res.send(videoList);
            })
            .catch(function (error) {
                console.log(error);
            })
    })
    // app.get('api/', requireLogin, (req, res) => {

    // });

};