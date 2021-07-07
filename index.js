// implement your API here

// Todays 6-17-2019 Assignment 

// Write Endpoints To Perform The Following Queries
// method { POST   } url { /api/users     } Creates a user using the information sent inside the request body
// method { GET    } url { /api/users     } Returns an array of all the user objects contained in the database.
// method { GET    } url { /api/users/:id } Returns the user object with the specified id.
// method { DELETE } url { /api/users/:id } Removes the user with the specified id and returns the deleted user.
// method { PIT    } url { /api/users/:id } Updates the user with the specified id using data from the request body. 
//                                              Returns the modified document, NOT the original.

const express = require('express');
// Express is the framework that allows us to write backend crud requests more easily.
// This syntax will always be the same.

const server = express();
// Express is the framework that allows us to write backend crud requests more easily.
// This syntax will always be the same.

const db = require('./data/db');
// Express is the framework that allows us to write backend crud requests more easily.
// This syntax will always be the same.

server.use(express.json());
// This line tells the server to use json syntax 

//


//
server.get('/', (req,res) => {
    res.send('server is alive');
})
//
// The Server is doing a Crud operation, in this case, it is Get. Only get something at the '/' url. It will send the Request and at the same
// it is sending the Response, however the response is a blank box. Which is then filled in by the => { res.send thing.} => ES6 
// Response.send is a method to define what the response should send, in this case the string (' Server is Alive'); })

//
server.get('/now', (req,res) => {
    const now = new Date().toISOString();
    res.send(now);
})
//
// The Server is also doing a Crud operation, in this case it's a Get. Only accessible on the '/now' url. 
// You can customize any fucking back slash thing. 
// Line 43 is sending the response with the variable that was created in line 42 Using the premade Date string. 

//
server.get('/api/users', (req,res) => {
    db.find()
    .then( users => {
        res.json(users);
    })
    .catch( err => {
        console.log('there has been an error');
        res.json({error : err, message : 'an error occured'});
    });
});
//

//
server.get('/api/users/:id', (req,res) => {
    const userID = req.params.id;
    console.log(req);

    db.findById(userID)
    .then( user => {
        if (user) {
            res.status(200).json({ success : true, user : user })
        } else {
            res.status(404).json({success : false, message : 'no user exists with that id'})
        }
    })
    .catch( err => {
        console.log('there has been an error', err);
        res.status(err.code).json({success : false, message : err.message});
    })
})
//

//
server.delete('/api/users/:id', (req,res) => {
    const userID = req.params.id;
    db.remove(userID)
    .then( deleted => {
        res.status(204).end();
    })
    .catch( err => {
        res.status(err.code).json({success : false, message: err.message})
    })
})
//
// Sending a delete request to the server at the url. Specify user ID to delete in the url. 
// Next use the db.remove function with the (userID) db

//
server.put('/api/users/:id', (req,res) => {
    const userID = req.params.id;
    const changes = req.body;

    db.update(userID, changes)
    .then( updated => {
        if (updated) {
            res.status(200).json({ success : true, updated});
        } else {
            res.status(404).json({success : false, message: 'cannot find user id to update'})
        }
    })
    .catch( err => {
        res.status(err.code).json({ success : false, message : err.message})
    })
})
//

//
server.listen(5000, () => {
    console.log('listening on port 5000');
})
//