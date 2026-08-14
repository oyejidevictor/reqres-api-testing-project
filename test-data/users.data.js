const validUser = {
    name: 'Victor QA',
    job: 'Automation Engineer'
};

const updatedUser = {
    name: 'Victor Updated',
    job: 'Senior QA Engineer'
};

const patchUser = {
    job: 'QA Lead'
};

const validLogin = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka'
};

const validRegister = {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
};

const invalidLogin = {
    email: 'eve.holt@reqres.in',
    password: 'wrong-password'
};

module.exports = {
    validUser,
    updatedUser,
    patchUser,
    validLogin,
    validRegister,
    invalidLogin
};