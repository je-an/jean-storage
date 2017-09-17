// jscs:disable
// jshint ignore:start
define([
    "src/Storage",
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
            it("TODO: Check if all members are available | EXPECTATION: Storage has all necessary members", function () {
                var numberOfMembers = 10;
                expect(Object.keys(Storage).length).toEqual(numberOfMembers);
            });
            it("TODO: Check if all methods are available | EXPECTATION: Storage has all necessary methods", function () {
                var numberOfMethods = 0;
                var methodCount = Object.keys(Object.getPrototypeOf(Storage)).length;
                expect(methodCount).toEqual(numberOfMethods);
            });
        });
        describe("Storage.configure", function () {
            it("TODO: Configure session storage | EXPECTATION: session storage is used", function () {
                expect(Storage.configure(Storage.storageType.SESSION)).toBe(true);
                expect(Storage._currentType).toEqual(Storage.storageType.SESSION);
            });
            it("TODO: Configure local storage | EXPECTATION: local storage is used", function () {
                expect(Storage.configure(Storage.storageType.LOCAL)).toBe(true);
                expect(Storage._currentType).toBe(Storage.storageType.LOCAL);
            });
            it("TODO: Try to configure storage without storage type | EXPECTATION: Throws type error", function () {
                try {
                    Storage.configure();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Try to configure storage with invalid type | EXPECTATION: no storage will be configured", function () {
                expect(Storage.configure(3)).toBe(false);
            });
        });
        describe("Storage.writeObject", function () {
            it("TODO: Write object without configuration | EXPECTATION: Throws StorageNotDefinedError", function () {
                try {
                    Storage.writeElement("test", { name: "name" });
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("TODO: Write object without key to session storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.writeElement({ name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }

            });
            it("TODO: Write object without key to local storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.writeElement({ name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }

            });
            it("TODO: Write object with invalid key to session storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.writeElement(2, { name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Write object with invalid key to local storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.writeElement(2, { name: "name" });
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Write object to session storage | EXPECTATION: Object persists in session storage", function () {
                Storage.configure(Storage.storageType.SESSION);
                expect(Storage.writeElement("test", { name: "name" })).toBe(true);
            });
            it("TODO: Write object to local storage | EXPECTATION: Object persists in local storage", function () {
                Storage.configure(Storage.storageType.LOCAL);
                expect(Storage.writeElement("test", { name: "name" })).toBe(true);
            });
        });
        describe("Storage.readElement", function () {
            it("TODO: Read object without configuration | EXPECTATION: Throws StorageNotDefinedError", function () {
                try {
                    Storage.readElement("test");
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("TODO: Read object without key from session storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.readElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Read object without key from local storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.readElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Read object with invalid key from session storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.readElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Read object with invalid key from local storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.readElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Read object from session storage | EXPECTATION: Element is read", function () {
                Storage.configure(Storage.storageType.SESSION);
                Storage.writeElement("key", { name: "123" });
                var element = Storage.readElement("key");
                expect(element.name).toEqual("123");
            });
            it("TODO: Read object from local storage | EXPECTATION: Element is read", function () {
                Storage.configure(Storage.storageType.LOCAL);
                Storage.writeElement("key", { name: "123" });
                var element = Storage.readElement("key");
                expect(element.name).toEqual("123");
            });
            it("TODO: Try to read non existing key from session storage | EXPECTATION: No element is read", function () {
                Storage.configure(Storage.storageType.SESSION);
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
            it("TODO: Try to read non existing key from local storage | EXPECTATION: No element is read", function () {
                Storage.configure(Storage.storageType.LOCAL);
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
        });
        describe("Storage.readAllElements", function () {
            it("TODO: Read all objects without configuration | EXPECTATION: Throws StorageNotDefinedError", function () {
                try {
                    Storage.readAllElements();
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("TODO: Read all objects from session storage | EXPECTATION: All objects read", function () {
                Storage.configure(Storage.storageType.SESSION);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                var elements = Storage.readAllElements();
                expect(elements.length).toEqual(10);
            });
            it("TODO: Read all objects from local storage | EXPECTATION: all objects read", function () {
                Storage.configure(Storage.storageType.LOCAL);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                var elements = Storage.readAllElements();
                expect(elements.length).toEqual(10);
            });
            it("TODO: Try to read all objects from session storage when nothing is in | EXPECTATION: Nothing is read", function () {
                Storage.configure(Storage.storageType.SESSION);
                var elements = Storage.readAllElements();
                expect(elements).toBeNull();
            });
            it("TODO: Try to read all objects from local storage when nothing is in | EXPECTATION: Nothing is read", function () {
                Storage.configure(Storage.storageType.LOCAL);
                var elements = Storage.readAllElements();
                expect(elements).toBeNull();
            });
        });
        describe("Storage.removeElement", function () {
            it("TODO: Remove object without configuration | EXPECTATION: Throws StorageNotDefinedError", function () {
                try {
                    Storage.removeElement("test");
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("TODO: Remove object without key from session storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.removeElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Remove object without key from local storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.removeElement();
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Remove object with invalid key from session storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.SESSION);
                    Storage.removeElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Remove object with invalid key from local storage | EXPECTATION: Throws TypeError", function () {
                try {
                    Storage.configure(Storage.storageType.LOCAL);
                    Storage.removeElement(2);
                } catch (e) {
                    expect(e instanceof TypeError).toBe(true);
                }
            });
            it("TODO: Remove object from session storage | EXPECTATION: object is removed", function () {
                Storage.configure(Storage.storageType.SESSION);
                Storage.writeElement("key", { name: "123" });
                expect(Storage.removeElement("key")).toBe(true);
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
            it("TODO: Remove object from local storage | EXPECTATION: object is removed", function () {
                Storage.configure(Storage.storageType.LOCAL);
                Storage.writeElement("key", { name: "123" });
                var element = Storage.removeElement("key");
                var element = Storage.readElement("key");
                expect(element).toBeNull();
            });
        });
        describe("Storage.removeAllElements", function(){
            it("TODO: Remove all objects without configuration | EXPECTATION: Throws StorageNotDefinedError", function(){
                try {
                    Storage.removeAllElements();
                } catch (e) {
                    expect(e instanceof StorageNotDefinedError).toBe(true);
                }
            });
            it("TODO: Remove all objects from session storage | EXPECTATION: All objects are removed", function(){
                Storage.configure(Storage.storageType.SESSION);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                expect(Storage.removeAllElements()).toBe(true);
                expect(Storage.readAllElements()).toBeNull();
            });
            it("TODO: Remove all objects from local storage | EXPECTATION: All objects are removed", function(){
                Storage.configure(Storage.storageType.LOCAL);
                for (var i = 1; i < 11; i++) {
                    Storage.writeElement(i.toString(), { id: i });
                }
                expect(Storage.removeAllElements()).toBe(true);
                expect(Storage.readAllElements()).toBeNull();
            });
        });
    });
});

