import React from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
//import validate from './validate'

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

const renderHobbies = ({ fields, meta: { error } }) => (
  <ul style={{ marginLeft: '200px' }}>
    <li>
      <button type="button" onClick={() => fields.push()}>
        Add Level 2 Category
      </button>
    </li>
    {fields.map((data, index) => (
      <li key={index}>
        <div className='flex-row'>
          <h5>Level 2 Category {index + 1}</h5>
          <div
            type="button"
            title="Remove Hobby"
            onClick={() => fields.remove(index)}
            className='flex-row justify-center align-center ml-50'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
        </div>
        <Field
          name={`${data}.name`}
          type="text"
          component={renderField}
          label='Name'
        />
        <Field
          name={`${data}.id`}
          type="hidden"
          component={renderField}
          initialValue='hello'
        />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
)




const renderMembers = ({ fields, meta: { error, submitFailed } }) => (
  <ul style={{ marginLeft: '100px' }}>
    <li>
      <button type="button" onClick={() => fields.push({id: 'hello'})}>
        Add Level 1 Category
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <div className='flex-row'>
          <h4>Level 1 Category {index + 1}</h4>
          <div
            type="button"
            title="Remove Member"
            onClick={() => fields.remove(index)}
            className='flex-row justify-center align-center ml-50'
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          </div>
        </div>
        <Field
          name={`${member}.name`}
          type="text"
          component={renderField}
          label="Name"
        />
        <FieldArray name={`${member}.children`} component={renderHobbies} />
      </li>
    ))}
  </ul>
)

const submitCategories = (values) => {
  debugger
}




const AddNewCategoryContainer = props => {
  
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={(handleSubmit(submitCategories))}>
      <h2>Add New Category</h2>
      <div>
        <Field
          name="name"
          type="text"
          component={renderField}
          label="Category"
        />
      </div>
      <FieldArray name="children" component={renderMembers} />
      <div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'fieldArrays'
})(AddNewCategoryContainer)