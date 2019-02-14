import uuidv1 from 'uuid/v1';

const generateV1uuid = () => uuidv1();

export function toTimestamp(date) {
    let strDate = getFullDate(new Date(date));
    let timestamp = new Date(strDate).getTime();
    // console.log('time stamp,', timestamp);
    // var datum = Date.parse(`${strDate}`);
    return timestamp;
}

export function getFullDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${month}/${day}/${year}`
}

export {
    generateV1uuid,
}

export function getRequisitionStatus(status) {
    let statusValue = '';
    switch (status) {
        case 0:
            statusValue = 'SCRATCH';
            break
        case 1:
            statusValue = 'CAPTURED';
            break
        case 2:
            statusValue = 'REJECTED';
            break
        case 3:
            statusValue = 'COMPLETE';
            break
        default:
            statusValue = 'SCRATCH';
            break;
    }
    return statusValue;
}