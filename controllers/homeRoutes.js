const homeRouter = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

homeRouter.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('home', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);


homeRouter.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        console.log(userData);
        // const user = userData.get({ plain: true });
        // console.log(user);
        res.render('profile', {
            userData,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
}
);


homeRouter.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
}
);

homeRouter.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
}
);

// homeRouter.get('/dashboard', withAuth, async (req, res) => {
//     try {
//         const postData = await Post.findAll({
//             where: {
//                 user_id: req.session.user_id,
//             },
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username'],
//                 },
//             ],
//         });

//         const posts = postData.map((post) => post.get({ plain: true }));

//         res.render('dashboard', {
//             posts,
//             logged_in: req.session.logged_in,
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
// );





module.exports = homeRouter;








