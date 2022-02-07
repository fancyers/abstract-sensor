class Sensor {
    constructor(deviceId) {
        this.deviceId = deviceId
        this.powerStatus = 'off';
        this.reportingInterval = 10000;
        this.timeOut
    }

    turn(input) {
        if (input === 'on') {
            if (this.powerStatus === 'on') {
                throw new Error();
            }
            this.powerStatus = 'on';
            this.status = 'idle';
            this.statusIdle()
        } else if (input === 'off') {
            this.powerStatus = 'off';
            clearTimeout(this.timeOut)
        }
    }

    senseDistance() {
        this.status = 'sensingDistance'
        this.timeOut = setTimeout(() => { this.reportData() }, 500)
    }

    reportData() {
        this.status = 'reportingData'
        this.timeOut= setTimeout(() => { this.statusIdle() }, 1000)
    }

    statusIdle() {
        this.status = 'idle'
        this.timeOut = setTimeout(() => { this.senseDistance() }, this.reportingInterval)
    }
}

class IotServer {
    constructor() {
        this.sensors
    }

    start(sensors) {
        this.sensors = sensors
    }

    publish(action) {
        const sensor = this.sensors.filter(x => x.deviceId === action.deviceId)[0]
        // 센서 켜져 있을 때, reporting interval 변경하기
        if (action.actionId === 'CHANGE_REPORTING_INTERVAL' && sensor.powerStatus === 'on') {
            sensor.reportingInterval = action.payload 
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
