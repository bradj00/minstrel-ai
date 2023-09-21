const db = require('./db');

require('dotenv').config({ path: '../.env' });

module.exports = {
    RecordEntry: async function(payload, callback) {
        try {
            console.log('trying to get friendly names for:', payload.friendlyName);
            const database = db.getDb('minstrel-journal');
            const collection = database.collection('brad');
    
            // Add the payload object as a new document to the collection
            const results = await collection.insertOne(payload);
            
            if (results && results.insertedCount === 1) {
                callback({ status: 'success', data: results.ops[0] }); // ops[0] will contain the newly inserted document
            } else {
                callback({ status: 'error', message: 'Failed to insert document' });
            }
        
        } catch (error) {
            console.error("Error: ", error);
            callback({ status: 'error', message: 'Internal Server Error' });
        }
    }
};
