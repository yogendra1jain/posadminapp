import React from 'react';
import Input from 'material-ui/Input/Input';
import FormControl from 'material-ui/Form/FormControl';
import FormHelperText from 'material-ui/Form/FormHelperText';

export function GenericInput
    ({ 
        ariaDescribedBy,
        htmlFor,
        displayName,
        inputName,
        defaultValue,
        disabled,
        onChange,
        onPaste,
        onBlur, 
        errorMessage, 
        error, 
        errorValue, 
        className, 
        touched,
        dirty, 
        touchedValue, 
        errorCheck=true,
        type="text"
    }) 
{
    console.log('Is touched: ', touched);
    return (
        <FormControl 
            className="custom-input" 
            style={{width: "100%", fontSize: "14px" }}
        >
            {/* <InputLabel htmlFor={htmlFor}>{displayName}</InputLabel> */}
            <Input 
                name={inputName} 
                value={defaultValue} 
                type={type}
                disabled={disabled}
                placeholder={displayName}
                onChange={onChange}
                onPaste = {onPaste}
                onBlur={onBlur} 
            />
            {errorCheck && touched && dirty && (
                <div className={className}>
                    <FormHelperText>
                        {errorMessage}
                    </FormHelperText>
                </div> 
            )}              
        </FormControl>
    )
}