Cypress.Commands.add('gui_login_or_signup_and_login', (
  username,
  password
) => {
  cy.visit('/login')

  cy.get('[data-testid="email"]').type(username)
  cy.get('[data-testid="senha"]').type(password, { log: false })
  cy.get('[data-testid="entrar"]').click()

  checkErrorAlertAndSignUp(username, password);
});


//the idea is to check whether an error message appears on the screen or not under a certain condition
function checkErrorAlertAndSignUp(username, password, retries = 3) {
  cy.get('body').then(($body) => {
    //if it appears it means user does not exist, so it must signup
    if ($body.find('.btn-close-error-alert').length > 0) {
      cy.signup(username, password);
    } else {
      retries--; 
      if (retries > 0) {
        cy.wait(500); 
        cy.log("Alert error didn't appear. checking if alert error will appear again")
        checkErrorAlertAndSignUp(username, password, retries); // function calls itself to check it again
      } else {
        //if it doesn't appear it means user already logged
        cy.url().should('include', '/home');
        cy.get('[data-testid="shopping-cart-button"]').should('exist');
      }
    }
  });
}

Cypress.Commands.add('signup', (
  username,
  password
) => {
  cy.visit('/cadastrarusuarios');
  cy.get('[data-testid="nome"]').type(username)
  cy.get('[data-testid="email"]').type(username)
  cy.get('[data-testid="password"]').type(password, { log: false })
  cy.get('[data-testid="cadastrar"]').click()
  cy.get('.alert-link', {timeout: 2000}).should((elem) => {
    expect(elem.text()).to.equal('Cadastro realizado com sucesso');
});
  cy.gui_login_or_signup_and_login(username, password);
})

Cypress.Commands.add('gui_logout', () => {
  cy.get('[data-testid="shopping-cart-button"]').should('exist');
  cy.get('[data-testid="logout"]').should('exist').click();
})

Cypress.Commands.add('validateInvalidCredentials', (
  username,
  password
) => {
  cy.visit('/login')

  cy.get('[data-testid="email"]').type(username)
  cy.get('[data-testid="senha"]').type(password, { log: false })
  cy.get('[data-testid="entrar"]').click()

  cy.get('.alert-dismissible').should('contain', 'Email e/ou senha inválidos');
})

Cypress.Commands.add('validateInvalidEmail', (
  username,
  password
) => {
  cy.visit('/login')

  cy.get('[data-testid="email"]').type(username)
  cy.get('[data-testid="senha"]').type(password, { log: false })
  cy.get('[data-testid="entrar"]').click()

  cy.get('.alert-dismissible').should('contain', 'Email deve ser um email válido');
})
