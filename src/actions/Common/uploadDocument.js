import { generateV1uuid } from '../../helpers/helpers';

const uploadDocument = (file, url, subreddit, storeId, storeCode, entity) => (dispatch) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('storeId',storeId)
    formData.append('storeCode',storeCode)
    formData.append('entity', 'Inventory')
    const metaHeaders = {
        "CorrelationId": generateV1uuid(),
        "Authorization": `Bearer ${localStorage.getItem('Token')}`
    };

    return fetch(`${process.env.APPLICATION_BFF_URL}` + url, {
        headers: metaHeaders,
        method: 'POST',
        body: formData
    })
}

export default uploadDocument;