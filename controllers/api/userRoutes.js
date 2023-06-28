const userRouter = require('express').Router();
const { User } = require('../../models');


// GET all users
userRouter.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });

        res.status(200).json(userData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// CREATE new user
userRouter.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        console.log(userData);

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// LOGIN user
userRouter.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!', logged_in: req.session.logged_in });
        });
    } catch (err) {
        res.status(400).json(err);
    }
}
);

// LOGOUT user
userRouter.post('/logout', (req, res) => {
    console.log('this is the request--->');
    console.log(req);
    // if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    // }

    // else {
    //     res.status(404).end();
    // }
}
);

module.exports = userRouter;


