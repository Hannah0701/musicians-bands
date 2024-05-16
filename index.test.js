const { DATEONLY } = require('sequelize');
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
        expect(testBand.genre).toBe("Rock");
        expect(testBand).toBeInstanceOf(Band);
    });

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const testMusician = await Musician.create(seedMusician[0]);

        expect(testMusician.name).toBe('John Lennon');
        expect(testMusician.instrument).toBe('Guitar');
        expect(testMusician).toBeInstanceOf(Musician);
    });

    test('can create a Song', async () => {
        // TODO - test creating a song
        const testSong = await Song.create(seedSong[0]);

        expect(testSong.title).toBe('Hey Jude');
        expect(testSong.year).toBe(1968);
        expect(testSong.length).toBe(431);
        expect(testSong).toBeInstanceOf(Song);
    });

    test('can update a Band', async () => {
        // TODO - test updating a band
        const testBand = await Band.create(seedBand[1]);
        const updatedBand = await testBand.update({
            name: 'The Rolling Stones',
            genre: 'Rock'
        });

        expect(updatedBand.name).toBe('The Rolling Stones');
        expect(testBand.genre).toBe("Rock");
    });

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const testMusician = await Musician.create(seedMusician[1]);
        const updatedMusician = await testMusician.update({
            name: 'Ringo Starr',
            instrument: 'Drums'
        });

        expect(updatedMusician.name).toBe('Ringo Starr');
        expect(updatedMusician.instrument).toBe('Drums');
    })

    test('can update a Song', async () => {
        // TODO - test updating a song
        const testSong = await Song.create(seedSong[0]);
        const updatedSong = await testSong.update({
            title: "A Hard Day's Night",
            year: 1964,
            length: 144
        });
    
        expect(updatedSong.title).toBe("A Hard Day's Night");
        expect(updatedSong.year).toBe(1964);
        expect(updatedSong.length).toBe(144);
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const testBand = await Band.create(seedBand[0]);

        expect(testBand.name).toBe("The Beatles");
        expect(testBand.genre).toBe("Rock");

        await testBand.destroy();
        const deletedBand = await Band.findByPk(testBand.id);

        expect(deletedBand).toBeNull();
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const testMusician = await Musician.create(seedMusician[0]);

        expect(testMusician.name).toBe('John Lennon');
        expect(testMusician.instrument).toBe('Guitar');

        await testMusician.destroy();
        const deletedMusician = await Musician.findByPk(testMusician.id);

        expect(deletedMusician).toBeNull();
    })

    test('can delete a Song', async () => {
        // TODO - test deleting a song
        const testSong = await Song.create(seedSong[0]);

        expect(testSong.title).toBe('Hey Jude');
        expect(testSong.year).toBe(1968);
        expect(testSong.length).toBe(431);

        await testSong.destroy();
        const deletedSong = await Song.findByPk(testSong.id);

        expect(deletedSong).toBeNull();
    })

    //     - Use `Band.findAll()` to get the bands (if there aren’t any from the previous tests, you’ll have to `Band.create()` some!)
    //     - For each of the bands, use something like `foundBand.getMusicians()` to check that they have been added correctly!
    // test('can associate a Band with a Musician', async () => {
    //     const testBand = await Band.create(seedBand[0]);
    //     const testMusician = await Musician.create(seedMusician[0]);
    //     await testBand.addMusician(testMusician);
    //     const foundBand = await Band.findByPk(testBand.id, { include: Musician });
    //     expect(foundBand.Musicians[0].name).toBe('John Lennon');
    // });

    // test('can associate a Band with a Musician', async () => {
    //     const testBand = await Band.create({ name: 'Linkin Park', genre: 'Nu Metal'});
    //     const testMusician = await testBand.createMusician({ name: 'Chester Bennington', instrument: 'Vocals'});
    //     const musicians = await band.getMusicians();
    //     expect(musicians).toBe(musician[0]);
        
    //     const
    // });

    test("can associate a Band with a Musician", async () => {
		const band = await Band.create({
			name: "Linkin Park",
			genre: "Nu Metal",
		});

		await band.createMusician({
			name: "Chester Bennington",
			instrument: "Voice",
		});

		await band.createMusician({
			name: "Mike Shinoda",
			instrument: "Keyboard",
		});

		const musicians = await band.getMusicians();

		expect(musicians[0].name).toBe("Chester Bennington");
		expect(musicians[1].name).toBe("Mike Shinoda");
	});
    
    // 4. Write a test to add multiple musicians to a band. In the test:
    //     - Do the same with the bands.

    test('can associate multiple Songs with a Band', async () => {
        //     - `Band.create()` to make some bands. Use the data you’ve added in previous tests you’ve created!
        const testBand = await Band.create({
			name: "Coldplay",
			genre: "Alternative",
		});
        //     - Create at least 2 songs
        await testBand.createSong({
            title: "Yellow",
            year: 2000,
            length: 266,
        });
        await testBand.createSong({
            title: "Fix You",
            year: 2005,
            length: 294,
        });
        //     - For one band, add both songs
        //     - For each of the songs, use something like `foundBand.getSongs()` to check that they have been added correctly!

        const songs = await testBand.getSongs();

        expect(songs[0].title).toBe("Yellow");
        expect(songs[1].title).toBe("Fix You");
    });

    test('can associate multiple Bands with a Song', async () => {
        const testSong = await Song.create({
            title: "Please Mr. Postman",
            year: 1961,
            length: 132,
		});
        await testSong.createBand({
			name: "The Marvelettes",
			genre: "R&B",
        });
        await testSong.createBand({
			name: "The Carpenters",
			genre: "Pop",
        });
        const bands = await testSong.getBands();

        expect(bands[0].name).toBe("The Marvelettes");
        expect(bands[1].name).toBe("The Carpenters");
    });

    // 3. Write a test to add a manager to a band and test the association.
    test('can associate a Manager with a Band', async() => {
        const testBand = await Band.create({
            name: "Queen",
            genre: "Rock"
        });
        await testBand.createManager({
            name: "Jim Beach",
            email: "test@jimbeach.com",
            salary: 1_000_000,
            dateHired: "1978-10-10",
        });
        const manager = await testBand.getManager();

        expect(manager.name).toBe("Jim Beach");
        expect(manager.email).toBe("test@jimbeach.com");
        expect(manager.salary).toBe(1_000_000);
        expect(manager.dateHired).toBe("1978-10-10");
    });
})