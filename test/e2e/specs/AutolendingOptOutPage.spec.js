import wwwPageMock from '../fixtures/wwwPageMock';

describe('Autolending Opt Out Spec', () => {
	beforeEach(() => {
		cy.mock(wwwPageMock());
		// Hide tracking cookie notice banner
		cy.setCookie('kvgdpr', 'true');
	});

	describe('Visits autolending opt-out page', () => {
		it('Opt-out page should display failure message with missing success param', () => {
			// Visit autolending settings
			cy.visit('/settings/autolending/opt-out');

			// Assert that key elements of the page are visible
			cy.get('[data-test=opt-out-failure]').should('exist');
			cy.get('[data-test=opt-out-failure]').contains('Oops - this link no longer works');
			cy.get('[data-test=opt-out-success]').should('not.exist');
		});
		it('Opt-out page should display success message when success param is true', () => {
			// Visit autolending settings
			cy.visit('/settings/autolending/opt-out?success=true');

			// Assert that key elements of the page are visible
			cy.get('[data-test=opt-out-success]').should('exist');
			cy.get('[data-test=opt-out-success]').contains('You’re successfully opted out of auto-lending');
			cy.get('[data-test=opt-out-failure]').should('not.exist');
		});
		it('Opt-out page should display failure message when success param is false', () => {
			// Visit autolending settings
			cy.visit('/settings/autolending/opt-out?success=false');

			// Assert that key elements of the page are visible
			cy.get('[data-test=opt-out-failure]').should('exist');
			cy.get('[data-test=opt-out-failure]').contains('Oops - this link no longer works');
			cy.get('[data-test=opt-out-success]').should('not.exist');
		});
	});
});
