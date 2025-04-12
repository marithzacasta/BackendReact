const success = (req, res, status, message) => {
    res.status(status).send({
        error: false,
        status: status,
        message: message
    });
};

const error = (req, res, status, message) => {
    res.status(status).send({
        error: true,
        status: status,
        message: message
    })
}

export default {
    success,
    error
}