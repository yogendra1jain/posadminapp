import uuidv1 from 'uuid/v1';

const generateV1uuid = () => uuidv1();

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