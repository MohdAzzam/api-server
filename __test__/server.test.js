'use strict';
//for testing ci/cd
const server = require('../src/server');
const superTest = require('supertest');
const serverRequest = superTest(server.app);
require('@code-fellows/supergoose');

const Collection = require('../src/models/data-collection-class');
const bookModel = require('../src/models/books');
const actorModel = require('../src/models/actors')
const book = new Collection(bookModel);
const actor = new Collection(actorModel);

describe('Testing Server Moudle', () => {
    it('Handel not Found Route',
        async () => {
            let response = await serverRequest.get('/not-found-route');
            expect(response.status).toEqual(404);
        });

    it('Handels Home Route', async () => {
        let response = await serverRequest.get('/');
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Welcom to Our Home Page');
    });

    //book 

    it('return 201 if the book create', async () => {
        let obj = {
            name: 'The Song of Ice and Fire',
            title: 'fantazy and Action',
            moviesBasedOn: 'Game of thrones'
        };
        let newTestedRecord = await book.create(obj);
        console.log(newTestedRecord);
        Object.keys(obj).forEach(key => {
            expect(newTestedRecord[key]).toEqual(obj[key]);
        })
    });
    it('return 200 if all books return', async () => {
        let allBook = await book.get();
        expect(allBook.length).toBeGreaterThan(0);

    });
    it('return 200 if the book return ', async () => {
        let obj = {
            name: 'The Song of Ice and Fire',
            title: 'fantazy and Action',
            moviesBasedOn: 'Game of thrones'
        };
        let newRecorde = await book.create(obj)
        let oneBook = await book.get(newRecorde._id);
        Object.keys(obj).forEach(key => {
            expect(oneBook[key]).toEqual(obj[key]);
        })
    });
    it('return 204 if the book updated', async () => {
        let obj = {
            name: 'The Song of Ice and Fire',
            title: 'fantazy and Action',
            moviesBasedOn: 'Game of thrones'
        };
        let newRecorde = await book.create(obj);
        let updatedobj={
            name: 'The Song of Ice and Fire',
            title: 'Action and bloody',
            moviesBasedOn: 'Game of thrones'
        };
        let updateBook=await book.update(newRecorde._id,updatedobj);
        Object.keys(updatedobj).forEach(key => {
            expect(updateBook[key]).toEqual(updatedobj[key]);
        })
    });
    it('return 202 if the book deleted', async () => {
        let obj = {
            name: 'I have no idea',
            title: 'comedy',
            moviesBasedOn: 'lalalal'
        };
        let newRecorde = await book.create(obj);
        let deletedItem= await book.delete(newRecorde._id);
        Object.keys(obj).forEach(key => {
            expect(deletedItem[key]).toEqual(obj[key]);
          });
    });

    // actor
    it('return 201 if the actor add', async () => {
        let obj = {
            name: 'Azzam',
            age: 28,
            movies: 'Game of thrones'
        };
        let newTestedRecord = await actor.create(obj);
        console.log(newTestedRecord);
        Object.keys(obj).forEach(key => {
            expect(newTestedRecord[key]).toEqual(obj[key]);
        })
    });
    it('return 200 if all actors return', async () => {
        let allActor = await actor.get();
        expect(allActor.length).toBeGreaterThan(0);
    });
    it('return 200 if the actor return ', async () => {
        let obj = {
            name: 'Ali',
            age: 28,
            movies: 'Game of thrones'
        };
        let newRecorde = await actor.create(obj)
        let oneActor = await actor.get(newRecorde._id);
        Object.keys(obj).forEach(key => {
            expect(oneActor[key]).toEqual(obj[key]);
        })
    });


    it('return 204 if the actor updated', async () => {
        let obj = {
            name: 'Ali',
            age: 28,
            movies: 'Game of thrones'
        };
        let newRecorde = await actor.create(obj);
        let updatedobj={
            name: 'mat lublanc',
            age: 28,
            movies: 'FRIENDS'
        };
        let updateActor=await actor.update(newRecorde._id,updatedobj);
        Object.keys(updatedobj).forEach(key => {
            expect(updateActor[key]).toEqual(updatedobj[key]);
        })
    });
    it('return 202 if the actor deleted', async () => {
        let obj = {
            name: 'mat lublanc',
            age: 28,
            movies: 'FRIENDS'
        };
        let newRecorde = await actor.create(obj);
        let deletedItem= await actor.delete(newRecorde._id);
        Object.keys(obj).forEach(key => {
            expect(deletedItem[key]).toEqual(obj[key]);
          });
    });

});
