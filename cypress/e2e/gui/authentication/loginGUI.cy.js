import { UserFactory } from 'cypress/factories/userFactory'; 
//test
describe('Login Functionalities GUI', () => {
  let newUser;

  beforeEach(() => {
    
    newUser = UserFactory.validUser();

    cy.deleteAllUsersButRootAndTestClark();
  });

  it('Validate User Signup and Log in successfully', () => {
    /**
     * O comando `gui_login_or_signup_and_login` já valida que o login foi realizado,
     * garantindo que a sessão foi criada corretamente.
     * 
     * Por isso, este teste não precisa de assertivas adicionais.
     */
    cy.gui_login_or_signup_and_login(newUser.email, newUser.password);

    // Valida o logout
    cy.gui_logout();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').should('be.visible');
  });

  it('Validate login throws an error when using invalid credentials', () => {
    cy.validateInvalidCredentials(newUser.email, newUser.password);
  });

  it('Validate login throws an error when using invalid email format', () => {
    const invalidUser = UserFactory.invalidEmailUser();  // Using the user with invalid email
    cy.validateInvalidEmail(invalidUser.email, newUser.password);
  });
});
