import userService from '../../services/userService';

Cypress.Commands.add('api_loginAndSignUp', ( username, password, administrador) => {
    userService.loginAndSignUp(username, password, administrador);
})

Cypress.Commands.add('api_login', ( 
  username,
  password) => {
  userService.login(username, password, administrador);
})

Cypress.Commands.add('api_getAllUsers', () => {
  userService.getAllUsers();
})

Cypress.Commands.add('api_getUserById', userId => {
  userService.getUserById(userId);
})

Cypress.Commands.add('api_createUser', (
  username,
  password,
  administrador) => {
  userService.createUser(username, password, administrador);
})

Cypress.Commands.add('api_deleteUser', userId => {
  userService.deleteUserById(userId);
})

Cypress.Commands.add('api_deleteAllUsersButRootAndTestClark', () => {
  userService.deleteAllUsersButRootAndTestClark();
})
