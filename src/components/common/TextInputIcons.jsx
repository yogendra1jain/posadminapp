import React from 'react';
import _get from 'lodash/get';

export default (props) => {
    let iconName = _get(props, 'input.name', '');
    let Icon = {};
    switch (iconName) {
        case 'firstName':{
            Icon = 'icon-first-name';
            break;
        }
        case 'lastName':{
            Icon = 'icon-last-name';
            break;
        }
        case 'emailAddress':{
            Icon = 'icon-email';
            break;
        } 
        case 'email':{
            Icon = 'icon-email';
            break;
        }             
        case 'telephone':{
            Icon = 'icon-phone';
            break;
        }
        case 'password':{
            Icon = 'icon-password';
            break;
        }
        case 'confirmPassword':{
            Icon = 'icon-confirmpassword';
            break;
        }
        case 'zipcode':{
            Icon = 'icon-zipcode';
            break;
        }       
        
        default: {
            Icon = '';
        }
    }
    return (
        <span className={`input-icon-set ${Icon}`}></span>
    );
}