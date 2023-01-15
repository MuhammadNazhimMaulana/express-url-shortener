const validUrl = require('valid-url')
const shortid = require('shortid')

// import the Url database model
const Url = require('../models/url.model')

// The API base Url endpoint
const baseUrl = 'http:localhost:3000'

// Index View
index = async (req, res) => {
    try {
        // Sending Data
        res.render('pages/shorten', {
            layout: 'layouts/main',
            title: 'Shorten URL',
            pages: 'App'
        });
    } catch (error) {
        // If Error
        return res.json({
            error
        });
    }
}

// Shorten
shorten = async (req, res) => {
    try {
    
    const longUrl = req.body.longUrl;

    // check base url if valid using the validUrl.isUri method
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    // if valid, we create the url code
    const urlCode = shortid.generate()
    
    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(longUrl)) {
        /* The findOne() provides a match to only the subset of the documents 
        in the collection that match the query. In this case, before creating the short URL,
        we check if the long URL was in the DB ,else we create it.
        */
        
        let url = await Url.findOne({
            longUrl
        })

        // url exist and return the respose
        if (url) {
            res.json(url)
        } else {
            // join the generated short code the the base url
            const shortUrl = baseUrl + '/' + urlCode

            // invoking the Url model and saving to the DB
            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
            })
            await url.save()
            
            // Prepare String
            let string = encodeURIComponent(url.urlCode);

            // Redirect 
            res.redirect('/app/result?value='+ string);
        }
    }

    } catch (error) {
        // If Error
        return res.json({
            error
        });
    }
}

// Result
result = async (req, res) => {
    try {

        // find a document match to the code in req.params.code
        const url = await Url.findOne({
            urlCode: req.query.value
        });
        
        if (url) {
            // If URL is Valid
            res.render('pages/result', {
                layout: 'layouts/main',
                title: 'Result',
                pages: 'App',
                url
            });

        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    } catch (error) {
        // If Error
        return res.json({
            error
        });
    }
}

// Redirect
redirect = async (req, res) => {
    try {

        // find a document match to the code in req.params.code
        const url = await Url.findOne({
            urlCode: req.params.code
        });
        
        if (url) {
            return res.redirect(url.longUrl)
        } else {
            // else return a not found 404 status
            return res.status(404).json('No URL Found')
        }

    } catch (error) {
        // If Error
        return res.json({
            error
        });
    }
}


module.exports = {
    index, shorten, redirect, result
};