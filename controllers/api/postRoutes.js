const postRouter = require('express').Router();
const { Post, User, Comment } = require('../../models');

//render new post view with form
postRouter.get('/new', (req, res) => {
    res.render('post'), {
        logged_in: req.session.logged_in
    };
}
);

// Post request to add post to database upon form submission
postRouter.post('/new', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            // Figure out why this doesnt work
            // user_id: req.session.user_id,
            user_id: 1,
        });
console.log(newPost);
        res.status(200).json(newPost);
        res.render('profile'), {
            logged_in: req.session.logged_in
        };
    } catch (err) {
        res.status(400).json(err);
    }
}



);

module.exports = postRouter;

