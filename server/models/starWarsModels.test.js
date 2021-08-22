const starWarsModels = require("./starWarsModels")
// @ponicode
describe("starWarsModels.query", () => {
    test("0", () => {
        let callFunction = () => {
            starWarsModels.query("Hello, world!", "http://base.com", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            starWarsModels.query("foo bar", "http://example.com/showcalendar.html?token=CKF50YzIHxCTKMAg", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            starWarsModels.query("foo bar", "https://api.telegram.org/bot", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            starWarsModels.query("Hello, world!", "https://croplands.org/app/a/reset?token=", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            starWarsModels.query("Hello, world!", "www.google.com", "callback detected, not supported yet")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            starWarsModels.query("", undefined, undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
