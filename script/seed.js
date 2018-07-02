const db = require('../server/db');
const {User} = require('../server/db/models');

async function seed() {
    await db.sync({force: true});
    const users = await Promise.all([
        User.create({
            email: 'raj@email.com',
            password: '123',
        }),
        User.create({
            email: 'kad@email.com',
            password: '123',
        }),
    ]);
    console.log(`seeded ${users.length} users`);
    console.log('seeded successfully');
}

async function runSeed() {
    console.log('seeding...');
    try {
        await seed();
    } catch (err) {
        console.error(err);
        process.exitCode = 1;
    } finally {
        console.log('closing db connection');
        await db.close();
        console.log('db connection closed');
    }
}

if (module === require.main) {
    runSeed();
}

module.exports = seed;
