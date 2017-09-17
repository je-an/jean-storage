## Description

Provides functionality to interact and store values in browsers storage

## Code Example

```js
require(["path/to/Storage"], function(Storage){
    // Set storage config
    Storage.configure(Storage.storageType.SESSION);
    // Write an object to storage
    Storage.writeElement("key", { id. "123"});
    // Read an object from storage
    var element = Storage.readElement("key");
    // Read all objects from storage
    var elements = Storage.readAllElements();
    // Remove an element
    Storage.removeElement("key");
    // Remove all elements 
    Storage.removeAllElements();
});
```

## Installation

`npm install jean-storage --save --legacy-bundling`

## API Reference

### Storage.storageType

 Indicates which storage is used

- `SESSION`: Data in session storage persists until session is terminated
- `LOCAL`:  Data in local storage persists until explicitly deleted

### Storage.configure(type) 

Set the storage type for use

**Parameters**
- **type**: `Storage.storageType`

**Returns**
- `Boolean` - True if configuration is successful, false otherwise


### Storage.writeElement(key, element) 

Writes an object to storage

**Parameters**
- **key**: `String` - The key which will act as identifier for obj 
- **element**: `Any` - Element to be stored

**Returns**
- `Boolean` - True if element is written into storage, false otherwise


### Storage.readElement(key) 

Read an element identified by the passed key

**Parameters**
- **key**: `String` - Identifies the stored object

**Returns**
- `Any | null` - element which is identified by key or null 
                      if there is no element for this key


### Storage.readAllElements() 

Read all elements from the storage

**Returns**
- `Any[] | null`, - List of all elements within the storage or null
                        if there are no elements in storage


### Storage.removeElement(key) 

Remove an element by its key from storage

**Parameters**
- **key**: `String` - Identifies the object, which shall be removed

**Returns**
-  `Boolean`- True if element is removed, false otherwise


### Storage.removeAllElements() 

Remove all elements from storage

**Returns**
- `Boolean` - True if all elements are removed, false otherwise

## Tests

- Open spec/spec-runner.html in browser to see the test cases.

## License

MIT