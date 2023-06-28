// Initialize refreshed database with User seed

const User = require('../models/User');
const Post = require('../models/Post');
const sequelize = require('../config/connection');

const userSeed = require('./userSeed.json');
const postSeed = require('./postSeed.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    await User.bulkCreate(userSeed, {
        individualHooks: true,
        returning: true,
    });

    await Post.bulkCreate(postSeed, {
        individualHooks: true,
        returning: true,
    });
    
    process.exit(0);
    }



seedDatabase();
