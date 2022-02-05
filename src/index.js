class Sensor {
    constructor(deviceId) {
        this.deviceId = deviceId
        this.powerStatus = 'off';
        this.reportingInterval = 10000;
    }

    turn(input) {
        if (input === 'on') {
            if (this.powerStatus === 'on') {
                throw Error();
            }
            this.powerStatus = 'on';
            this.status = 'idle';
            setTimeout(() => {
                this.status = 'sensingDistance';
                setTimeout(() => {
                    this.status = 'reportingData';
                    setTimeout(() => {
                        this.status = 'idle';
                    }, 1000);
                }, 500);
            }, this.reportingInterval);
        } else if (input === 'off') {
            this.powerStatus = 'off';
        }
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
        if (action.actionId === 'CHANGE_REPORTING_INTERVAL' && sensor.powerStatus === 'on') {
            sensor.reportingInterval = action.payload 
        }
    }
}

const sensor = new Sensor('id1');
sensor.turn('on');
const server = new IotServer();
server.start([sensor]);
server.publish({
    deviceId: 'id1',
    actionId: 'CHANGE_REPORTING_INTERVAL',
    payload: 3000,
});

module.exports = {
    Sensor,
    IotServer,
};
