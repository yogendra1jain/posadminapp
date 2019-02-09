import ReactSelectWrapper from './reactSelectWrapper';
import React from 'react';
import TextField from '@material-ui/core/TextField';

import SelectField from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FileUpload from './fileUpload';
import CheckBox from '@material-ui/core/Checkbox';
import { DatePicker } from 'material-ui-pickers';
import Switch from '@material-ui/core/Switch';
import TextInputIcons from './TextInputIcons.jsx';
import InputAdornment from '@material-ui/core/InputAdornment';

const TextFieldInput = (props) => {
  let { input, label, multiline = false, rows = 3, hideLabel, autoFocus, meta: { touched, error, pristine }, ...custom } = props;
  return (
    [
      // <label style={{    display: 'inline-block',
      // maxWidth: '100%',
      //  marginB0ttom: '0px',
      // fontWeight: '000',
      // color: 'rgba(0, 0, 0, 0.38)'}}>{label}</label>,
      
      <FormControl key={`${input.id}textform`}>
        <TextField
          multiline={multiline}
          rows={rows}
          key={`${input.id}text`}
          label={hideLabel ? '' : label}
          placeholder={label}
          error={touched && error ? true : false}
          autoFocus={autoFocus}
          {...input}
          {...custom}
        />
        <div key={`${input.id}error`}>{touched && error && <div className="text-input error"><FormHelperText >
          {error}
        </FormHelperText>
        </div>}
        </div>
      </FormControl>]
  )
}

const SelectFieldInput = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
    <SelectField
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      onChange={(event, index, value) => input.onChange(value)}
      children={children}
      {...custom}
    />
  )

const CheckBoxInput = ({ input, label }) => (
  [
    <InputLabel htmlFor={label}>{label}</InputLabel>,
    <CheckBox
      id={label}
      checked={input.value ? true : false}
      onChange={input.onChange}
    />
  ]
)

const SwitchInput = ({ input: { onChange, value }, label, checked }) => (
  [
    <InputLabel htmlFor={label}>{label}</InputLabel>,
    <Switch
      checked={value}
      onChange={onChange}
      value={value}
    />
  ]
)


const DateFieldInput = (props) => {
  let { input, label, hideLabel, autoFocus, meta: { touched, error, pristine }, ...custom } = props;
  return (
    [
      <FormControl key={`${input.id}textform`}>
        <DatePicker
          keyboard
          clearable
          format={"MMM/dd/yyyy"}
          shouldDisableDate={disableWeekends}
          // mask={value =>
          //   value ? [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] : []
          // }
          minDate={new Date()}
          {...input}
        />
        <div key={`${input.id}error`}>{touched && error && <div className="text-input error"><FormHelperText >
          {error}
        </FormHelperText>
        </div>}
        </div>
      </FormControl>]
  )
}
function disableWeekends(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}
function disableRandomDates() {
  return Math.random() > 0.7;
}

const TextFieldInputWithIconAtStart = (props) => {
  let { input, label, hideLabel, autoFocus, type = 'text', id, meta: { touched, error, pristine }, ...custom } = props;
  return (
    [
      <FormControl fullWidth >
        <TextField
          key={`${input.id}text`}
          label={hideLabel ? '' : label}
          id={id && id}
          type={type}
          placeholder={label}
          error={touched && error ? true : false}
          autoFocus={autoFocus}
          margin='normal'
          {...input}
          {...custom}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TextInputIcons {...props} />
              </InputAdornment>
            ),
          }}
        />
        <div className="text-input error">
          {touched && error && <FormHelperText>{error}</FormHelperText>}
        </div>
      </FormControl>
    ]

  )
}

export {
  TextFieldInput,
  TextFieldInputWithIconAtStart,
  ReactSelectWrapper,
  SelectFieldInput,
  FileUpload,
  CheckBoxInput,
  DateFieldInput,
  SwitchInput,
}
