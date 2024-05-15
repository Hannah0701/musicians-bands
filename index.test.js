const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')
const { seedBand, seedMusician, seedSong } = require('./seedData');

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Band', async () => {
        // TODO - test creating a band
        const testBand = await Band.create(seedBand[0]);
        expect(testBand.name).toBe("The Beatles");
    });

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create(seedMusician[0]);
        expect(testMusician.name).toBe('John Lennon');
    });

    test('can create a Song', async () => {
        // TODO - test creating a song
        const testSong = await Song.create(seedSong[0]);
        expect(testSong.title).toBe('Hey Jude');
    });

    test('can update a Band', async () => {
        // TODO - test updating a band
        const testBand = await Band.create(seedBand[0]);
        const updatedBand = await testBand.update({ name: 'The Rolling Stones'});
        expect(updatedBand.name).toBe('The Rolling Stones');
    });

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const testMusician = await Musician.create(seedMusician[0]);
        const updatedMusician = await testMusician.update({ name: 'Ringo Starr', instrument: 'Drums'});
        expect(updatedMusician.name).toBe('Ringo Starr');
    })

    test('can update a Song', async () => {
        // TODO - test updating a song
        const testSong = await Song.create(seedSong[0]);
        const updatedSong = await testSong.update({ title: "A Hard Day's Night"});
        expect(updatedSong.title).toBe("A Hard Day's Night");
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const testBand = await Band.create(seedBand[0]);
        testBand.destroy();
        const deletedBand = await Band.findByPk(testBand.id);
        expect(deletedBand).toBeNull();
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const testMusician = await Musician.create(seedMusician[0]);
        testMusician.destroy();
        const deletedMusician = await Musician.findByPk(testMusician.id);
        expect(deletedMusician).toBeNull();
    })

    test('can delete a Song', async () => {
        // TODO - test deleting a song
        const testSong = await Song.create(seedSong[0]);
        testSong.destroy();
        const deletedSong = await Song.findByPk(testSong.id);
        expect(deletedSong).toBeNull();
    })
})