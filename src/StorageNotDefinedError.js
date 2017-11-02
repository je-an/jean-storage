define([], function () {
    /**
     * Represents a error message for non implemented methods
     * @param {String} message - message of error
     */
    var StorageNotDefinedError = function (message) {
        this.name = "StorageNotDefinedError";
        this.message = (message || "Storage must be configured");
    };
    StorageNotDefinedError.prototype = Error.prototype; 
    return StorageNotDefinedError;
}); 