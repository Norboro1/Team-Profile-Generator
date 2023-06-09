const Intern = require("../lib/Intern");

test("Can set school via constructor", () => {
    const testValue = "FIU";
    const e = new Intern("Foo", 1, "test@gmail.com", testValue);
    expect(e.school).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
    const testValue = "Intern";
    const e = new Intern("Foo", 1, "test@gmail.com", "FIU");
    expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
    const testValue = "FIU";
    const e = new Intern("Foo", 1, "test@gmail.com", testValue);
    expect(e.getSchool()).toBe(testValue);
});

