import {StoreList} from './StoreList';
import {StoreEdit} from './StoreEdit';
import {StoreCreate} from './StoreCreate';
import {EditGuesser} from 'react-admin';

export default {
    list: StoreList,
    create: StoreCreate,
    edit: EditGuesser
};
