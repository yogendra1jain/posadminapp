import StrainList from './StrainList';
import StrainEdit from './StrainEdit';
import StrainCreate from './StrainCreate';
import {EditGuesser} from 'react-admin';
import StrainIcon from '@material-ui/icons/Group';

export default {
    list: StrainList,
    create: StrainCreate,
    edit: StrainEdit,
    icon: StrainIcon,
};
