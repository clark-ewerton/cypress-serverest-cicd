import addContext from 'mochawesome/addContext'

Cypress.on("test:after:run", (test, runnable) => {
    let videoName = Cypress.spec.name
    // Adiciona o nome completo da spec para garantir nomes únicos
    const videoUrl = 'videos/' + videoName.replace('.js', '') + '.mp4'

    addContext({ test }, videoUrl)
})
