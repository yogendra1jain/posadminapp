import TaxList from './taxList';
import TaxEdit from './taxEdit';
import TaxCreate from './taxCreate';
import TaxIcon from '@material-ui/icons/Group';
import TaxShow from './taxShow';
import {ListGuesser} from 'react-admin';

export default {
    list: TaxList,
    create: TaxCreate,
    edit: TaxEdit,
    icon: TaxIcon,
    show: TaxShow
};
