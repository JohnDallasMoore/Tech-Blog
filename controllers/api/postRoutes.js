const postRouter = require('express').Router();
const { Post, User, Comment } = require('../../models');

//render new post view with form
postRouter.get('/new', (req, res) => {
    res.render('new-post'), {
        loggedIn: req.session.loggedIn
    };
}
);

// Post request to add post to database upon form submission
postRouter.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
}
);

module.exports = postRouter;

