// This ContribInfo class is used to keep track of the latest contribution information

export class ContribInfo {
    constructor() {
        this.contribInfo = {};
    }

    getContribInfo() {
        console.log("Getting contrib info...");
        return this.contribInfo;
    }

    setContribInfo(contribInfo) {
        console.log("Setting contrib info...");
        this.contribInfo = contribInfo;
    }
}

export let contribInfo = new ContribInfo();