/// <reference types="cypress" />  

describe('Test Case 1', () => {

  const usedFixtures = [
    {
      name: "user1",
      context: "1"
    },
    {
      name: "user2",
      context: "2"
    },
    {
      name: "user3",
      context: "3"
    },
    {
      name: "user4",
      context: "4"
    },
    {
      name: "user5",
      context: "5"
    }
  ]
  usedFixtures.forEach(afixture => {
    describe('using email: ' + afixture.context, () => {

      beforeEach(function () {
        cy.fixture(afixture.name).as("userDetails")
      })

      it('error message appears in case of invalid email ' + afixture.name, function () {
        cy.visit('/')
        cy.get('.contact-label > span').click()
        cy.get('#cf-1').type(this.userDetails.name)
        cy.get('#cf-2').type(this.userDetails.email)
        cy.get('#cf-3').type(this.userDetails.mobile)
        cy.get('#cf-4').type(this.userDetails.subject)
        cy.get('#cf-5').type(this.userDetails.message)
        cy.contains('Send').click()
        cy.get(':nth-child(4) > .wpcf7-form-control-wrap > .wpcf7-not-valid-tip')
          .should('be.visible')
          .and('have.text', 'The e-mail address entered is invalid.')
      })
    })
  })
})

describe('Test Case 2', () => {
  it('verify facebook link redirects to valid page', function () {
    cy.visit('/')
    cy.get('#menu-main-nav-1 > .menu-item-887 > .main-link').click({ force: true })
    cy.url().should('eq', 'https://www.musala.com/company/')
    cy.get('.company-members')
      .should('be.visible')
    cy.contains('Leadership')
    cy.get('#wt-cli-accept-all-btn').click()
    cy.get('[href="https://www.facebook.com/MusalaSoft?fref=ts"] > .musala').should('be.visible')
    // cy.get('[href="https://www.facebook.com/MusalaSoft?fref=ts"]').invoke('removeAttr', 'target').click()
  })
})

describe('Test Case 3', () => {
  before(function () {
    cy.fixture('user1.json').as("userDetails")
  })
  it('check user can apply for vacancies', function () {
    cy.visit('/')
    cy.get('#menu-main-nav-1 > .menu-item-478 > .main-link').click({ force: true })
    cy.contains('Check our open positions').click()
    cy.url().should('eq', 'https://www.musala.com/careers/join-us/')
    cy.get('#get_location').select('Anywhere')

    // confirm page sections
    cy.contains('Automation QA Engineer').click()
    cy.contains('Requirements').should('be.visible')
    cy.contains('General description').should('be.visible')
    cy.contains('Responsibilities').should('be.visible')
    cy.contains('What we offer').should('be.visible')
    cy.get('[value="Apply"]').should('be.visible')
    cy.get('[value="Apply"]').click({ force: true })
    cy.get('#cf-1').type(this.userDetails.name)
    cy.get('#cf-2').type(this.userDetails.email)
    cy.get('#cf-3').type(this.userDetails.mobile)

    // upload CV
    cy.get("input[type=file]")
      .attachFile("exampleCV.txt")
    cy.get('#uploadtextfield').click()

    cy.contains('Send').click({ force: true })
    cy.contains('The e-mail address entered is invalid.').should('be.visible')
  })
})

describe('Test Case 4', () => {
  before(function () {
    cy.fixture('user1.json').as("userDetails")
  })
  it('print and group vacancies in console by location', function () {
    cy.visit('/')
    cy.get('#menu-main-nav-1 > .menu-item-478 > .main-link').click({ force: true })
    cy.contains('Check our open positions').click()
    cy.url().should('eq', 'https://www.musala.com/careers/join-us/')

    cy.get('#get_location').select('Sofia').then(() => {
      console.log('Sofia: ')
      cy.get(".card-container > .card-jobsHot__link > .card > .front").each(($card) => {
        console.log('Position: ' + $card.find('.card-jobsHot__title').text())
        console.log('More info: ' + $card.parents('.card-jobsHot__link').attr('href'))
      })
    })

    cy.get('#get_location').select('Skopje').then(() => {
      console.log('Skopje: ')
      cy.get(".card-container > .card-jobsHot__link > .card > .front").each(($card) => {
        console.log('Position: ' + $card.find('.card-jobsHot__title').text())
        console.log('More info: ' + $card.parents('.card-jobsHot__link').attr('href'))
      })
    })
  })
})