import { faker } from '@faker-js/faker/locale/en';

describe('Login Functionalities GUI', () => {
  let newUser;

  beforeEach(() => {
    const randomName = faker.name.firstName().toLowerCase();
    newUser = {
      email: `${randomName}testClark@example.com`,
      name: `${randomName} ${faker.name.lastName().toLowerCase()} testClark`,
      username: randomName + 'testClark',
      password: faker.internet.password(),
    };

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
    const invalidEmail = "test@test";
    cy.validateInvalidEmail(invalidEmail, newUser.password);
  });
});
