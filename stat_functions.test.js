const Stats  = require('./stat_functions');

let stats = new Stats();

test("Adds 1st Json info into object", () => {
    expect(stats.addAction({"action":"jump", "time":100}))
});
test("Adds 2nd Json info into object", () => {
    expect(stats.addAction({"action":"run", "time":75}))
});
test("Adds 3rd Json info into object", () => {
    expect(stats.addAction({"action":"jump", "time":200}))
});
test("Verify info in statTracker object", () => {
    return stats.getStats().then(data => {
        expect(
            data
        ).toEqual([ { action: 'jump', avg: 150 }, { action: 'run', avg: 75 } ])
    })
});