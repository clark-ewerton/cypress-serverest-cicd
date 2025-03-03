Cypress.Commands.add('api_loginAndSignUp', ( username, password, administrador) => {
    cy.fixture('login_200').then((login_200) => {
    cy.fixture('login_401').then((login_401) => {
    cy.api_login(username, password, administrador).then((response) => {
      //initially it's gonna try to use invalid credentials to login
    if(response.status === 401){
      // verifies if the structure of response body has the same keys as the fixture
      expect(response.body).to.deep.equal(login_401);

      //if login fails, then create a new user
      cy.fixture('createUser_201').then((createUser_201) => {
      cy.api_createUser(username, password, administrador).then((response) => {
        expect(response.status).to.eq(201);
              // verifies if the structure of response body has the same keys as the fixture
      expect(response.body).to.have.all.keys(Object.keys(createUser_201));
      expect(response.body.message).to.eq("Cadastro realizado com sucesso");
      expect(response.body._id).to.not.be.null

      const idUser = response.body._id;

      //then capture the id of the new user
      cy.fixture('getUser_200').then((getUser_200) => {
      cy.api_getUserById(idUser).then((response) => {
        expect(response.status).to.eq(200);
                      // verifies if the structure of response body has the same keys as the fixture
      expect(response.body).to.have.all.keys(Object.keys(getUser_200));
      expect(response.body.nome).to.not.null
      expect(response.body.email).to.not.null
      expect(response.body.password).to.not.null
      expect(response.body.administrador).to.not.null
      expect(response.body._id).to.not.null

      //finally login using valid credentials based on the id captured on the last block
      cy.api_loginAndSignUp(response.body.email, response.body.password, response.body._administrador)
      });
      });
    });
    });
    }else{
      expect(response.status).to.eq(200);
     // verifies if the structure of response body has the same keys as the fixture
      expect(response.body).to.have.all.keys(Object.keys(login_200));
      expect(response.body.message).to.eq("Login realizado com sucesso");
    }
  });
});
})
})

Cypress.Commands.add('api_login', ( 
  username,
  password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/login`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      email: username,
      password: password,
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('api_getAllUsers', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/usuarios`,
    //headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_getUserById', userId => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('apiBaseUrl')}/usuarios/${userId}`,
    //headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('api_createUser', (
  username,
  password,
  administrador) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/usuarios`,
    //headers: { 'Private-Token': accessToken }
    body: {
      nome: username,
      email: username,
      password: password,
      administrador: administrador,
    }
  })
})

Cypress.Commands.add('api_deleteUser', userId => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}/usuarios/${userId}`,
   // headers: { 'Private-Token': accessToken }
  })
})

Cypress.Commands.add('deleteAllUsersButRootAndTestClark', () => {
  cy.api_getAllUsers()
    .then((response) => {
      // A resposta é um objeto, então você acessa o array 'usuarios'
      const usuarios = response.body.usuarios;
      // Agora você pode iterar sobre o array de usuários
      cy.wrap(usuarios).each((usuario) => {
        if(usuario.nome.includes('testClark')){
          cy.api_deleteUser(usuario._id)
          .its('status')
          .should('equal', 200)
        }
      });
    });
})