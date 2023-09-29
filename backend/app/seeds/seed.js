const User = require('../models/User.js'); // Import your Mongoose model
const Channel = require('../models/Channel.js')
const mongoose = require('../../config/database.js');
const bcrypt = require('bcrypt');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/./../../.env' });

const { SEED_VALUE, USERS_SEED_COUNT, CHANNELS_SEED_COUNT } = process.env
faker.seed(+SEED_VALUE);

async function generateRandomUser() {
    const randomUser = {
        username: faker.internet.userName(),
        password: await bcrypt.hash('password', 10),
    };
    return randomUser;
}

async function generateRandomMembers() {
    const totalUsers = await User.countDocuments();
    const membersCount = faker.datatype.number({ min: 1, max: totalUsers });
    const randomMembers = [];
    const randoUsers = await User.aggregate([
        { $sample: { size: membersCount } },
    ]);
    randoUsers.forEach((elem) => {
        console.log({ username: elem.username, password: elem.password })
        randomMembers.push(elem._id)
    })
    return randomMembers;
}

async function generateRandomChannel() {
    const randomChannel = {
        name: faker.company.catchPhraseNoun(),
        description: faker.lorem.sentence(),
        members: await generateRandomMembers(),
    };
    return randomChannel;
}

async function randomUsers(count) {
    const userArray = [];
    for (let i = 0; i < count; i++) {
        const randomUser = await generateRandomUser();
        userArray.push(randomUser);
    }
    return userArray;
}

async function randomChannels(count) {
    const channelsArray = [];
    for (let i = 0; i < count; i++) {
        const randomChannel = await generateRandomChannel();
        channelsArray.push(randomChannel);
    }
    return channelsArray;
}

// Seed the database
async function seedDatabase() {
    try {
        const seedUsers = await randomUsers(+USERS_SEED_COUNT)
        await User.deleteMany({});
        await User.insertMany(seedUsers);

        const seedChannels = await randomChannels(+CHANNELS_SEED_COUNT)
        await Channel.deleteMany({});
        await Channel.insertMany(seedChannels);
        console.log('Database seeded successfully.');
    } catch (err) {
        console.error('Error seeding the database:', err);
    } finally {
        mongoose.connection.close()
    }
}

seedDatabase();