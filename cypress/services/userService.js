class UserService {
  login(username, password) {
    return cy.request({
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
  }

  createUser(username, password, administrador) {
    return cy.request({
      method: 'POST',
      url: `${Cypress.env('apiBaseUrl')}/usuarios`,
      //headers: { 'Private-Token': accessToken }
      body: {
        nome: username,
        email: username,
        password: password,
        administrador: administrador
      }
    })
  }

  getAllUsers() {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/usuarios`
      //headers: { 'Private-Token': accessToken }
    })
  }

  getUserById(userId) {
    return cy.request({
      method: 'GET',
      url: `${Cypress.env('apiBaseUrl')}/usuarios/${userId}`
      //headers: { 'Private-Token': accessToken }
    })
  }

  deleteUserById(userId) {
    return cy.request({
      method: 'DELETE',
      url: `${Cypress.env('apiBaseUrl')}/usuarios/${userId}`
      // headers: { 'Private-Token': accessToken }
    })
  }

  deleteAllUsersButRootAndTestClark() {
    return this.getAllUsers().then((response) => {
      // A resposta é um objeto, então você acessa o array 'usuarios'
      const usuarios = response.body.usuarios
      // Agora você pode iterar sobre o array de usuários
      cy.wrap(usuarios).each((usuario) => {
        if (usuario.nome.includes('testClark')) {
          cy.api_deleteUser(usuario._id).its('status').should('equal', 200)
        }
      })
    })
  }

  loginAndSignUp(username, password, administrador) {
    return cy.fixture('login_200').then((login_200) => {
      return cy.fixture('login_401').then((login_401) => {
        return this.login(username, password).then(
          (response) => {
            //initially it's gonna try to use invalid credentials to login
            if (response.status === 401) {
              // verifies if the structure of response body has the same keys as the fixture
              expect(response.body).to.deep.equal(login_401)

              //if login fails, then create a new user
              return cy.fixture('createUser_201').then((createUser_201) => {
                return this.createUser(username, password, administrador).then(
                  (response) => {
                    expect(response.status).to.eq(201)
                    // verifies if the structure of response body has the same keys as the fixture
                    expect(response.body).to.have.all.keys(
                      Object.keys(createUser_201)
                    )
                    expect(response.body.message).to.eq(
                      'Cadastro realizado com sucesso'
                    )
                    expect(response.body._id).to.not.be.null

                    const idUser = response.body._id

                    //then capture the id of the new user
                    return cy.fixture('getUser_200').then((getUser_200) => {
                      return this.getUserById(idUser).then((response) => {
                        expect(response.status).to.eq(200)
                        // verifies if the structure of response body has the same keys as the fixture
                        expect(response.body).to.have.all.keys(
                          Object.keys(getUser_200)
                        )
                        expect(response.body.nome).to.not.null
                        expect(response.body.email).to.not.null
                        expect(response.body.password).to.not.null
                        expect(response.body.administrador).to.not.null
                        expect(response.body._id).to.not.null

                        //finally login using valid credentials based on the id captured on the last block
                        this.loginAndSignUp(
                          response.body.email,
                          response.body.password,
                          response.body._administrador
                        )
                        //  return getUserResponse;
                      })
                    })
                  }
                )
              })
            } else {
              expect(response.status).to.eq(200)
              // verifies if the structure of response body has the same keys as the fixture
              expect(response.body).to.have.all.keys(Object.keys(login_200))
              expect(response.body.message).to.eq('Login realizado com sucesso')
              return response
            }
          }
        )
      })
    })
  }
}

export default new UserService()
