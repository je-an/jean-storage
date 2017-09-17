define(["TypeCheck", "StorageNotDefinedError"], function (TypeCheck, StorageNotDefinedError) {
    /**
     * Provides functionality to interact and store values in browsers storage 
     * @alias Storage 
     * @constructor
     * @param {Object} options - options object
     */
    return {
        /**
         * @private
         * @memberof Storage
         */
        _storage: null,
        /**
         * @private
         * @memberof Storage
         */
        _currentType: null,
        /**
         * Indicates which storage is used
         * @memberof Storage
         * @enum
         */
        storageType: {
            // Data in session storage persists until session is terminated
            SESSION: 0,
            // Data in localstorage persists until explicitly deleted
            LOCAL: 1
        },
        /**
         * Set the storage type for use
         * @memberof Storage
         * @throws {TypeError} - If type is not a number.
         * @param {storageType} type - SESSION: Use session storage
         *                             LOCAL: Use local storage
         * @returns {Boolean} - True if configuration is successful, false otherwise
         */
        configure: function (type) {
            if (TypeCheck.isNumber(type)) {
                switch (type) {
                    case this.storageType.SESSION:
                        this._storage = sessionStorage;
                        this._currentType = this.storageType.SESSION;
                        break;
                    case this.storageType.LOCAL:
                        this._storage = localStorage;
                        this._currentType = this.storageType.LOCAL;
                }
            } else {
                throw new TypeError("type is not a number. Use Storage.storageType for configuration.");
            }
            return TypeCheck.isDefined(this._currentType);
        },
        /**
         * Writes an object to storage
         * @memberof Storage
         * @throws {TypeError} If key is not a string
         * @throws {StorageNotDefinedError} If storage is not defined
         * @param {String} key - the key which will act as identifier for obj 
         * @param {Any} element - element to be stored
         * @returns {Boolean} - True if element is written into storage, false otherwise
         */
        writeElement: function (key, element) {
            var isWritten = false;
            if (this._checkConfiguration()) {
                if (TypeCheck.isString(key)) {
                    this._storage.setItem(key, JSON.stringify(element));
                    isWritten = true;
                } else {
                    throw new TypeError("key is not a string");
                }
            }
            return isWritten;
        },
        /**
         * Read an element identified by the passed key
         * @memberof Storage
         * @throws {TypeError} If key is not a string
         * @throws {StorageNotDefinedError} If storage is not defined
         * @param {String} key - Identifies the stored object
         * @returns {Any|null} - element which is identified by key or null 
         *                       if there is no element for this key
         */
        readElement: function (key) {
            var element = null;
            if (this._checkConfiguration()) {
                if (TypeCheck.isString(key)) {
                    element = JSON.parse(this._storage.getItem(key));
                } else {
                    throw new TypeError("key is not a string");
                }
            }
            return element;
        },
        /**
         * Read all elements from the storage
         * @memberof Storage
         * @throws {StorageNotDefinedError} If storage is not defined
         * @returns {Any[]|null} - List of all elements within the storage or null
         *                         if there are no elements in storage
         */
        readAllElements: function () {
            var array = null;
            if (this._checkConfiguration()) {
                var keys = Object.keys(this._storage), i;
                array = [];
                for (i = 0; i < keys.length; i++) {
                    array.push(JSON.parse(this._storage[keys[i]]));
                }
            }
            return ((array.length !== 0) ? array : null);
        },
        /**
         * Remove an element by its key from storage
         * @memberof Storage
         * @throws {StorageNotDefinedError} If storage is not defined
         * @param {String} key - Identifies the object, which shall be removed
         * @returns {Boolean} - True if element is removed, false otherwise
         */
        removeElement: function (key) {
            var isRemoved = false;
            if (this._checkConfiguration()) {
                if (TypeCheck.isString(key)) {
                    this._storage.removeItem(key);
                    isRemoved = true;
                } else {
                    throw new TypeError("key is not a string");
                }
            }
            return isRemoved;
        },
        /**
         * Remove all elements from storage
         * @memberof Storage
         * @throws {StorageNotDefinedError} If storage is not defined
         * @returns {Boolean} - True if all elements are removed, false otherwise
         */
        removeAllElements: function () {
            var isRemoved = false;
            if (this._checkConfiguration()) {
                this._storage.clear();
                isRemoved = true;
            }
            return isRemoved;
        },
        /**
         * Checks if configure-method have been called
         * @private
         * @memberof Storage
         * @throws {StorageNotDefinedEror} If storage is not configured yet
         * @returns {Boolean} - True if configuration is valid, otherwise throws exception
         */
        _checkConfiguration: function () {
            if (!TypeCheck.isDefined(this._storage)) {
                throw new StorageNotDefinedError("Storage is not defined. Pass valid storage type to <configure>-method.");
            }
            return true;
        }
    };
});