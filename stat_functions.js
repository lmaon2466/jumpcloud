class Stats {
    constructor() {
        // The following associative Array "StatTracker" is used to track the "average time", "data", and "typeCounter".
        // The "avgTime" array keeps track of the average time for each action that is added to the Array.
        // The "data" Array stores all data entered into the method.  statTracker "typeCounter" keeps a count
        // of each actions entries into the method.
        this.statTracker = {"avgTime": [], "data": [], "typeCounter": {}}
    }

    async addAction(data) {
        // This async method takes an input argument "data" of type "json".  This method adds the json data to the statTracker
        // "data" Array and increments the counter for the specific action in the "typeCounter" Array.
        // Example input json: {"action":"jump", "time":100}
        this.statTracker["data"].push(data);
        if (data["action"] in this.statTracker["typeCounter"]) {
            this.statTracker["typeCounter"][data["action"]] += 1
        } else {
            this.statTracker["typeCounter"][data["action"]] = 1
        }

        // This section calls the calculateAvgTime function which calculates the new average time and stores the new value
        // in the "avgTime" Array.
        this.calculateAvgTime(data["action"]);
    }

    calculateAvgTime(action) {
        // This method calculates the new average time for the provided action input argument and stores the new value in
        // the "avgTime" Array
        let totalNum = 0;

        for (let i=0; i < this.statTracker["data"].length; i++) {
            if (this.statTracker["data"][i]["action"] === action) {
                 totalNum += this.statTracker["data"][i]["time"]
            }
        }

        let avg = totalNum / this.statTracker["typeCounter"][action];
        let itmIndex = null;

        // The following section searches the "avgTime" Array, to see of the "action" key is already in the Array or not.
        // If the "action" is there it updates the current "avg" key with the new value, if not it adds the "action"
        //key into the Array and stores the "avg" value.
        let data = this.statTracker["avgTime"].some(avgTimes => avgTimes.action === action);
        if (data) {
            itmIndex = this.statTracker["avgTime"].findIndex(item => item.action === action);
            this.statTracker["avgTime"][itmIndex]["avg"] = avg;
        } else {
            this.statTracker["avgTime"].push({"action": action, "avg": avg});
        }
    }

    async getStats() {
        // This method returns the "avgTime" Array from the statTracker associative Array which stores all entered
        // "action" with their average times.
        return this.statTracker["avgTime"]
    }
}

module.exports = Stats;
