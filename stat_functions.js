class Stats {
    constructor() {
        // The following associative Array will be used to track the "average time", "data", and "typeCounter".
        // "avgTime" array will keep track of the average time for actions that are added
        // "
        this.statTracker = {"avgTime": [], "data": [], "typeCounter": {}}
    }

    async addAction(data) {
        this.statTracker["data"].push(data);
        if (data["action"] in this.statTracker["typeCounter"]) {
            this.statTracker["typeCounter"][data["action"]] += 1
        } else {
            this.statTracker["typeCounter"][data["action"]] = 1
        }
        this.calculateAvgTime(data["action"]);
    }

    calculateAvgTime(action) {
        let totalNum = 0;

        for (let i=0; i < this.statTracker["data"].length; i++) {
            if (this.statTracker["data"][i]["action"] === action) {
                 totalNum += this.statTracker["data"][i]["time"]
            }
        }

        let avg = totalNum / this.statTracker["typeCounter"][action];
        let itmIndex = null;
        let data = this.statTracker["avgTime"].some(avgTimes => avgTimes.action === action);

        if (data) {
            itmIndex = this.statTracker["avgTime"].findIndex(item => item.action === action);
            this.statTracker["avgTime"][itmIndex]["avg"] = avg;
        } else {
            this.statTracker["avgTime"].push({"action": action, "avg": avg});
        }

        return avg
    }

    async getStats() {
        return this.statTracker["avgTime"]
    }
}

module.exports = Stats;
