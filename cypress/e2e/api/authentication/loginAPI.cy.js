import { faker } from '@faker-js/faker/locale/en';

describe('Login Functionalities API', () => {
  let login_401, login_400;
  
  const randomName = faker.name.firstName().toLowerCase();
  const testUser = {
    email: `${randomName}testClark@example.com`,
    name: `${randomName} ${faker.name.lastName().toLowerCase()} testClark`,
    username: randomName + 'testClark',
    password: faker.internet.password(),
    administrador: "false",
  };

  beforeEach(() => {
    // Carrega fixtures antes dos testes
    cy.fixture('login_401').then((data) => (login_401 = data));
    cy.fixture('login_400').then((data) => (login_400 = data));

    // Deleta usuários apenas uma vez antes da suíte de testes
    cy.deleteAllUsersButRootAndTestClark();
  });

  it('Validate User Signup and Log in successfully', () => {
    /**
     * A `api_loginAndSignUp` já faz asserções para garantir que o login ocorreu,
     * por isso esse teste não precisa de asserts extras.
     */
    cy.api_loginAndSignUp(testUser.email, testUser.password, testUser.administrador);
  });

  it('Validate login throws an error when using invalid credentials', () => {
    cy.api_login(testUser.email, testUser.password).then((response) => {
      expect(response.status).to.eq(401);
      expect(response.body).to.deep.equal(login_401);
    });
  });

  it('Validate login throws an error when using invalid email format', () => {
    const invalidEmail = "test";
    
    cy.api_login(invalidEmail, testUser.password).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.deep.equal(login_400);
    });
  });
});
