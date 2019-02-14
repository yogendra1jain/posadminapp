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