import * as yup from 'yup';
import expand from 'keypather/expand'

var schema = yup.object().shape({
    name: yup.string().required('Required'),
    domainLink: yup.string().required('Required')
});

const asyncValidate = values => {


    return new Promise((resolve, reject) => {


        //Validate our form values against our schema! Also dont abort the validate early.
        schema.validate(values, {
                abortEarly: false
            })
            .then(() => {
                //form is valid happy days!
                resolve();
            })
            .catch(errors => {
                //form is not valid, yup has given us errors back. Lets transform them into something redux can understand.
                
                let reduxFormErrors = {};
                console.log(errors,"mak")
                errors.inner.forEach(error => {
                    errors.inner.forEach(error => {
                        let messageArr = error.message.split('.');
                        let errorMsg = messageArr[messageArr.length - 1]
                        let result = errorMsg.replace(/([A-Z])/g, " $1");
                        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
                        reduxFormErrors[error.path] = error.message;
                    })
                })

                //redux form will now understand the errors that yup has thrown
                console.log('mak', expand(reduxFormErrors))
                reject(expand(reduxFormErrors));

            })
    });

};

export default asyncValidate;