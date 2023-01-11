const mongoose = require('mongoose');

// Skema Category
const urlSchema = new mongoose.Schema({ 
    urlCode: {
        type: String,
    },
    longUrl: {
        type: String,
    },
    shortUrl: {
        type: String,
    },
    }, 
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

const Url = mongoose.model('Url', urlSchema);

module.exports = Url