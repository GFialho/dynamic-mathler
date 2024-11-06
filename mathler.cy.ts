/// <reference types="cypress" />

describe("Mathler Game Frontend Tests", () => {
  beforeEach(() => {
    // Visit the homepage before each test
    cy.visit("/");
  });

  it("Displays the HowToPlayModal on initial load", () => {
    // Check that the modal contains the initial text
    cy.contains("Welcome to Mathler!").should("be.visible");
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
    cy.wait(3000); // Adjust based on actual typing duration

    // Check that the initial lines are displayed
    cy.contains("$ Welcome, hacker!").should("be.visible");
    cy.contains(
      "Your mission is to find the hidden calculation that equals"
    ).should("be.visible");
  });

  it("Allows user to input a valid guess and processes it", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Type a valid guess
    cy.get("body").type("1+1{enter}");

    // Check that the guess is displayed in the terminal
    cy.contains("$ 1+1").should("be.visible");

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
    cy.wait(3000);

    // Type an invalid guess
    cy.get("body").type("1++1{enter}");

    // Check that the guess is displayed in the terminal
    cy.contains("$ 1++1").should("be.visible");

    // Check that 'Processing...' is displayed
    cy.contains("Processing...").should("be.visible");

    // Wait for processing
    cy.wait(1000);

    // Check that syntax error is displayed
    cy.contains("bash: syntax error: invalid expression").should("be.visible");
  });

  it("Displays the game grid correctly", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Check that the game grid is displayed
    cy.get(".grid").should("exist");

    // The grid should have 6 rows
    cy.get(".grid-rows-6").should("exist");

    // Each row should have 6 tiles
    cy.get(".grid-cols-6").should("have.length", 6);
  });

  it("Allows user to use the on-screen keyboard", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Click on-screen keys to input a guess
    cy.contains("1").click();
    cy.contains("+").click();
    cy.contains("2").click();

    // Press Enter
    cy.contains("Enter").click();

    // Check that the guess is displayed in the terminal
    cy.contains("$ 1+2").should("be.visible");
  });

  it("Progresses to the next level upon correct guess", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Assuming we know the solution for level 1 (e.g., '1+2')
    const solution = "1+2";

    // Type the correct solution
    cy.get("body").type(`${solution}{enter}`);

    // Wait for processing
    cy.wait(1000);

    // Check that the success message is displayed
    cy.contains(`Mission Complete! The solution was ${solution}`).should(
      "be.visible"
    );

    // Wait for level to increment
    cy.wait(2000);

    // Check that the level has increased to 2
    cy.contains("Level 2").should("be.visible");

    // Check that the progress bar has updated
    cy.get(".bg-green-500")
      .invoke("attr", "style")
      .should("include", "width: 2%");
  });

  it("Displays winning message after completing all levels", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Simulate completing all levels
    for (let level = 1; level <= 100; level++) {
      // Assume the solution for each level is '1+1' for testing
      cy.get("body").type("1+1{enter}");
      cy.wait(1000);
      cy.wait(2000);
    }

    // Check that the final message is displayed
    cy.contains("Access Granted: You have successfully hacked NASA!").should(
      "be.visible"
    );
  });

  it("Handles incorrect guesses correctly", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Input 6 incorrect guesses
    for (let i = 0; i < 6; i++) {
      cy.get("body").type("9*9{enter}");
      cy.wait(1000);
    }

    // After 6 guesses, check that the game provides feedback
    cy.contains("Mission Complete!").should("not.exist");
    cy.contains("Level 1").should("be.visible"); // Ensure still on level 1
  });

  it("Displays tooltips on tiles in the game grid", () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Input a guess
    cy.get("body").type("1+2{enter}");
    cy.wait(1000);

    // Hover over a tile to see the tooltip
    cy.get(".typing-animation").first().trigger("mouseover");

    // Check that the tooltip is displayed
    cy.get('[role="tooltip"]').should("be.visible");
    cy.contains("CORRECT")
      .should("exist")
      // @ts-ignore
      .or("PRESENT")
      .should("exist")
      .or("ABSENT")
      .should("exist");
  });

  it('Resets current guess when "C" is pressed on the on-screen keyboard', () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Click on-screen keys to input a guess
    cy.contains("1").click();
    cy.contains("+").click();
    cy.contains("2").click();

    // Press "C" to clear
    cy.contains("C").click();

    // Ensure the current guess is cleared
    cy.get("body").then(($body) => {
      expect($body.text()).not.to.include("$ 1+2");
    });
  });

  it('Backspaces correctly when "Backspace" is pressed on the on-screen keyboard', () => {
    // Close the modal
    cy.get("body").type("{enter}");
    cy.wait(3000);

    // Click on-screen keys to input a guess
    cy.contains("1").click();
    cy.contains("+").click();
    cy.contains("2").click();

    // Press "Backspace"
    cy.contains("Backspace").click();

    // Ensure the last character is removed
    cy.get("body").should("contain", "$ 1+").and("not.contain", "$ 1+2");
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
    cy.wait(3000);

    // Check that the progress text is displayed
    cy.contains("Progress:").should("be.visible");

    // Check that the spinning icon is present
    cy.get(".animate-spin").should("be.visible");
  });
});
