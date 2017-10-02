// jscs:disable
// jshint ignore:start
define([
    "Storage",
    "StorageNotDefinedError"
], function (Storage, StorageNotDefinedError) {
    describe('Storage.spec.js', function () {
        beforeEach(function () {
            if (Storage._storage) {
                Storage._storage.clear();
            }
            Storage._storage = null;
            Storage._currentType = null;
        });
        describe("Storage", function () {
            it("All necessary members are available", function () {
                var numberOfMembers = 10;
                expect(Object.keys(Storage).length).toEqual(numberOfMembers);
            });
            it("All necessary methods are available", function () {
                var numberOfMethods = 0;
                var methodCount = Object.keys(Object.getPrototypeOf(Storage)).length;
                expect(methodCount).toEqual(numberOfMethods);
            });
        });
        describe("Storage.configure", function () {
            it("Configures storage to use session storage", function () {
                expect(Storage.configure(Storage.storageType.SESSION)).toBe(true);
                expect(Storage._currentType).toEqual(Storage.storageType.SESSION);
            });
            it("Configures storage to use local storage", function () {
                expect(Storage.configure(Storage.storageType.LOCAL)).toBe(true);
                expect(Storage._currentType).toBe(Storage.storageType.LOCAL);
            });
            it("Responds with false, if storage is configured with a invalid type", function () {
                expect(Storage.configure(3)).toBe(false);
            });
            it("Throws exception, if storage shall be configured without a type", function () {
                try {
                    Storage.configure();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("Storage.writeElement", function () {
            it("Writes object to session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                expect(Storage.writeElement("test", { name: "name" })).toBe(true);
            });
            it("Writes object to local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                expect(Storage.writeElement("test", { name: "name" })).toBe(true);
            });
            it("Throws exception, if no configuration is set before writing", function () {
                try {
                    Storage.writeElement("test", { name: "name" });
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("Throws exception, if a object without a key shall be write to session storage", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.writeElement({ name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }

            });
            it("Throws exception, if a object without a key shall be write to local storage", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.writeElement({ name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }

            });
            it("Throws exception, if a object with an invaild key shall be write to session storage", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.writeElement(2, { name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if a object with an invaild key shall be write to local storage", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.writeElement(2, { name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("Storage.readElement", function () {
            it("Reads object from session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                Storage.writeElement("key", { name: "123" });
                var element = Storage.readElement("key");
                expect(element.name).toEqual("123");
            });
            it("Reads object from local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                Storage.writeElement("key", { name: "123" });
                var element = Storage.readElement("key");
                expect(element.name).toEqual("123");
            });
            it("Responds with null, if a non existing element shall be read from session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
            it("Responds with null, if a non existing element shall be read from local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
            it("Throws exception, if a non existing element shall be read and configuration is no set", function () {
                try {
                    Storage.readElement("test");
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("Throws exception, if an element shall be read, from session storage, without a key", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.readElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if an element shall be read, from local storage, without a key", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.readElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if an element shall be read, from session storage, with an invalid key", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.readElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if an element shall be read, from local storage, with an invalid key", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.readElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("Storage.readAllElements", function () {
            it("Reads all elements from session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                var elements = Storage.readAllElements();
                expect(elements.length).toEqual(10);
            });
            it("Reads alle elements from local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                var elements = Storage.readAllElements();
                expect(elements.length).toEqual(10);
            });
            it("Responds with null, if nothing is inside session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                var elements = Storage.readAllElements();
                expect(elements).toBeNull();
            });
            it("Responds with null, if nothing is inside local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                var elements = Storage.readAllElements();
                expect(elements).toBeNull();
            });
            it("Throws exception, if all elements shall be read, but configuration is not set", function () {
                try {
                    Storage.readAllElements();
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
        });
        describe("Storage.removeElement", function () {
            it("Removes element from session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                Storage.writeElement("key", { name: "123" });
                expect(Storage.removeElement("key")).toBe(true);
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
            it("Removes element from local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                Storage.writeElement("key", { name: "123" });
                var element = Storage.removeElement("key");
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
            it("Throws exception, if element shall be removed and configuration isnt set", function () {
                try {
                    Storage.removeElement("test");
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("Throws exception, if element shall be removed without a key from session storage", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.removeElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if element shall be removed without a key from local storage", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.removeElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if element shall be removed with invalid key from session storage", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.removeElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("Throws exception, if element shall be removed with invalid key from local storage", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.removeElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
        });
        describe("Storage.removeAllElements", function(){
            it("Removes all objects from session storage", function(){
                Storage.configure(Storage.storageType.SESSION);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                expect(Storage.removeAllElements()).toBe(true);
                expect(Storage.readAllElements()).toBeNull();
            });
            it("Removes all objects from local storage", function(){
                Storage.configure(Storage.storageType.LOCAL);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                expect(Storage.removeAllElements()).toBe(true);
                expect(Storage.readAllElements()).toBeNull();
            });
            it("Throws exception, if all elements shall be removed but no configuration is set", function(){
                try {
                    Storage.removeAllElements();
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
        });
    });
});

