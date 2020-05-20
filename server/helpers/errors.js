exports.requiredError = (field) => ({
	type: `${field.toUpperCase()}_IS_REQUIRED`,
});
exports.typeError = (field, type) => ({
	type: `${field.toUpperCase()}_MUST_BE_A_${type.toUpperCase()}`,
});

exports.customError = (type) => ({ type });
exports.unknownError = () => this.customError("UNKNOWN_ERROR");
