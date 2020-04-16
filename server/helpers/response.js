exports.sendAsResult = res => result => res.send({
    success: true,
    result
});

exports.sendAsError = res => error => res.send({
    success: false,
    error
});