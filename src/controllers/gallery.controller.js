const gallery = (req, res, next) => {
    try {
        res.send(req.file)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    gallery
}