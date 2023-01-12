// Home View
index = async (req, res) => {
    try {
        // Sending Data
        res.render('home', {
            layout: 'layouts/main',
            title: 'Halaman Home',
        });
    } catch (error) {
        // If Error
        return res.json({
            error
        });
    }
}


module.exports = {
    index
};