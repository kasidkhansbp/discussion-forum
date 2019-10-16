import validate from 'validate.js';

function validateBody(body, constraintAttr='discussion') {
    // if (Object.keys(body).length === 0) {
    //     return 'no body';
    // }
    
    // const validationConstraints = {}
    // for (const key of Object.keys(body)) {
    //     if (!(key in constraints)) {
    //         return 'invalid body'; 
    //     }
    //     validationConstraints[key] = constraints[key]
    // }
    const validationResult = validate(body, constraints[constraintAttr.toLowerCase()]);
    if (!validationResult) {
        return null;
    }
    return validationResult;
}

function isEmail(value) {
    const validationResult = validate({email: value}, constraints['email']);
    return !validationResult;

}

export default {
    // validateAddDiscussionBody,
    isEmail,
    validateBody
}


const constraints = {
    discussion: {
        title: {
            presence: true,
            length: {
                minimum: 1,
                maximum: 100,
                tooShort: "is short.",
                tooLong: "is too long. Put additional info on description."
            }
        },
        description: {
            presence: true,
            length: {
                minimum: 1,
                tooShort: "is too short for this question"
            }
        },
    },
    email: {
        email: true
    },
    comment: {
        comment: {
            presence: true,
            length: {
                minimum: 1,
                tooShort: "needs to be more detailed"
            }
        }
    }
}