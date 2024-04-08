// forgive me for not using filter, I'm just too lazy to google it
// also for having weak edge cases, I'm just too lazy to think about it

// This is a simple express server that simulates a hospital's kidney database.

const express = require('express');

const app = express();
app.use(express.json());

// mini in-memory database
const users = [{
    name: 'John',
    kidney: [{
        healthy: false
    }]
}]

app.get('/', function (req, res) {
    const johnKidney = users[0].kidney;
    const numOfKidneys = johnKidney.length;
    let healthyKidneys = 0;
    for (let i = 0; i < numOfKidneys; i++) {
        if (johnKidney[i].healthy === true) {
            healthyKidneys++;
        }
    }
    const unhealthyKidneys = numOfKidneys - healthyKidneys;

    res.json({
        numOfKidneys,
        healthyKidneys,
        unhealthyKidneys
    });
})

// adding kidneys basically
app.post('/', function (req, res) {

    // Checking if request body contains isHealthy property 👀 
    if (req.body === undefined || req.body.isHealthy === undefined) {
        return res.status(400).json({                           // returning 400
            message: 'Request body must contain isHealthy property!'
        });
    }

    const isHealthy = req.body.isHealthy;

    // Checking if isHealthy is a boolean
    if (typeof isHealthy !== 'boolean') {
        return res.status(400).json({                           // returning 400
            message: 'isHealthy property must be a boolean!'
        });
    }

    users[0].kidney.push({ 
        healthy: isHealthy 
    });

    res.json({
        message: 'POST Done!'
    });
});


// making all kidneys healthy
app.put('/', function(req, res) {

    // what if there are no kidneys? we will return 411 status code
    if (!users[0].kidney || users[0].kidney.length === 0) {
        return res.status(411).json({                           // returning 411
            message: 'No kidneys to update!'
        });
    }

    for (let i = 0; i < users[0].kidney.length; i++) {
        users[0].kidney[i].healthy = true;
    }

    res.json({
        message: 'PUT Done!'
    });
});


// removing unhealthy kidneys
app.delete('/', function(req, res) {

    // what if there are no kidneys? we will return 411 status code
    if (!users[0].kidney || users[0].kidney.length === 0) {
        return res.status(411).json({                           // returning 411
            message: 'No kidneys to delete!'
        });
    }

    const newKidney = [];
    for (let i = 0; i < users[0].kidney.length; i++) {
        if (users[0].kidney[i].healthy) {
            newKidney.push(
                users[0].kidney[i]
            );
        }
    }
    users[0].kidney = newKidney;

    res.json({
        message: 'DELETE Done!'
    });
});



app.listen(3000);

