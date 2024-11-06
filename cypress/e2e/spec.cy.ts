/// <reference types="cypress" />

describe("Mathler Game Frontend Tests", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("localhost:3000");
  });

  it("Displays the HowToPlayModal on initial load", () => {
    // Check that the modal contains the initial text
    cy.contains("Welcome to Mathler!").should("be.visible");
    cy.wait(5000);
    cy.contains("Press Enter to start playing...").should("be.visible");
  });

  it("Closes the HowToPlayModal when Enter is pressed", () => {
    // Ensure the modal is open
    cy.contains("Welcome to Mathler!").should("be.visible");

    // Press Enter
    cy.get("body").type("{enter}");

    // The modal should close
    cy.contains("Welcome to Mathler!").should("not.exist");

    // Check that the main game content is visible
    cy.contains("Terminal").should("be.visible");
  });

  it("Displays initial terminal messages with typing effect", () => {
    // Close the modal
    cy.get("body").type("{enter}");

    // Wait for typing effect to complete
    cy.wait(5000);

    // Check that the initial lines are displayed
    cy.contains("$ Welcome, hacker!").should("be.visible");
    cy.contains(
      "Your mission is to find the hidden calculation that equals"
    ).should("be.visible");
  });

  it("Allows user to input a valid guess and processes it", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(6000);

    // Type a valid guess
    cy.get("body").type("1+1+11{enter}");

    // Check that the guess is displayed in the terminal
    cy.contains("$ 1+1+11").should("be.visible");

    // Check that 'Processing...' is displayed
    cy.contains("Processing...").should("be.visible");

    // Wait for processing
    cy.wait(1000);

    // Check that an error or success message is displayed
    cy.get("body").then(($body) => {
      if ($body.text().includes("Command executed successfully")) {
        cy.contains("Command executed successfully").should("be.visible");
      } else {
        cy.contains("Error: Calculation result does not equal").should(
          "be.visible"
        );
      }
    });
  });

  it("Shows syntax error for invalid expressions", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(6000);

    // Type an invalid guess
    cy.get("body").type("1++111{enter}");

    // Check that the guess is displayed in the terminal
    cy.contains("$ 1++111").should("be.visible");

    // Check that 'Processing...' is displayed
    cy.contains("Processing...").should("be.visible");

    // Wait for processing
    cy.wait(2000);

    // Check that syntax error is displayed
    cy.contains("bash: syntax error: invalid expression").should("be.visible");
  });

  it("Displays the game grid correctly", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(6000);

    // Check that the game grid is displayed
    cy.get(".grid").should("exist");

    // The grid should have 6 rows
    cy.get(".grid-rows-6").should("exist");

    // Each row should have 6 tiles
    cy.get(".grid-cols-6").should("have.length", 6);
  });

  it("Handles incorrect guesses correctly", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(6000);

    // Input 6 incorrect guesses
    for (let i = 0; i < 6; i++) {
      cy.get("body").type("9*9{enter}");
      cy.wait(1000);
    }

    // After 6 guesses, check that the game provides feedback
    cy.contains("Mission Complete!").should("not.exist");
    cy.contains("Level 1").should("be.visible"); // Ensure still on level 1
  });

  it("Prevents input during typing effect", () => {
    // Do not close the modal to simulate typing effect
    cy.wait(1000);

    // Try typing during typing effect
    cy.get("body").type("1+2{enter}");

    // Ensure no input is registered
    cy.contains("$ 1+2").should("not.exist");
  });

  it("Shows progress towards hacking NASA", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(6000);

    // Check that the progress text is displayed
    cy.contains("Progress:").should("be.visible");

    // Check that the spinning icon is present
    cy.get(".animate-spin").should("be.visible");
  });
});
