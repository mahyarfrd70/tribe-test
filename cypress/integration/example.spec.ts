describe('example home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays two todo items by default', () => {
    cy.get('#test-component').should('have.text', 'TestComponent');
  });
});
