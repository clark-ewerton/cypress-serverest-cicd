import { UserFactory } from '../../../factories/userFactory'; 

describe('Login Functionalities API', () => {
  let login_401, login_400;

  beforeEach(() => {
    // load fixtures before testing
    cy.fixture('login_401').then((data) => (login_401 = data));
    cy.fixture('login_400').then((data) => (login_400 = data));

    newUser = UserFactory.validUser();

    // delete user that has name TestClark
    cy.deleteAllUsersButRootAndTestClark();
  });

  it('Validate User Signup and Log in successfully', () => {
    /**
     * A `api_loginAndSignUp` já faz asserções para garantir que o login ocorreu,
     * por isso esse teste não precisa de asserts extras.
     */
    cy.api_loginAndSignUp(newUser.email, newUser.password, newUser.administrador);
  });

  it('Validate login throws an error when using invalid credentials', () => {
    cy.api_login(newUser.email, newUser.password).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.deep.equal(login_401);
    });
  });

  it('Validate login throws an error when using invalid email format', () => {
    const invalidUser = UserFactory.invalidEmailUser();  // Using the user with invalid email
    
    cy.api_login(invalidUser.email, newUser.password).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.equal(login_400);
    });
  });
});
