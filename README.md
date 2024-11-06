# Mathler Game - Hack Nasa

## Made by Gabriel Fialho

Welcome to the **Mathler Game - Hack Nasa** repository! This project is a web-based mathematical puzzle game inspired by the popular game Wordle, but with numbers and equations. Your mission is to find the hidden calculation that equals a specific result. Solve puzzles, progress through levels, and ultimately, hack NASA! 🛰️

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the App](#running-the-app)
  - [Playing the Game](#playing-the-game)
- [Project Structure](#project-structure)
- [Testing](#testing)
  - [Running Cypress Tests](#running-cypress-tests)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo

[Live Demo](#) _(https://hacknasa.vercel.app/)_

---

## Features

- **Interactive Terminal Interface**: Play the game in a simulated terminal environment with typing animations and command execution.
- **Math Puzzles**: Solve mathematical expressions to find the hidden calculation matching the given result.
- **Progress Tracking**: Advance through 100 levels with a dynamic progress bar indicating your journey to hacking NASA.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **On-Screen Keyboard**: Use the on-screen keyboard for input, especially on touch devices.
- **Tooltips and Animations**: Get visual feedback with tile colors and tooltips indicating correctness.
- **State Persistence**: Your progress is saved using cookies, so you can return to your mission anytime.

---

## Getting Started

### Prerequisites

- **Node.js**: Version 14 or above.
- **npm**: Node package manager comes with Node.js.
- **Git**: For cloning the repository.

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/mathler-game.git
   cd mathler-game
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

---

## Usage

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

### Playing the Game

1. **Introduction Modal**: On your first visit, a "How to Play" modal will appear. Press `Enter` or click to begin.

2. **Objective**: Find the hidden calculation that equals the given result in 6 guesses or fewer.

3. **Input**: Use your keyboard or the on-screen keyboard to enter mathematical expressions.

4. **Submission**: Press `Enter` to submit your guess.

5. **Feedback**:

   - **Green Tiles**: Correct character in the correct position.
   - **Yellow Tiles**: Correct character in the wrong position.
   - **Gray Tiles**: Incorrect character.

6. **Progression**: Successfully solving a puzzle advances you to the next level, bringing you closer to hacking NASA.

---

## Project Structure

```
mathler-game/
├── src/
│   ├── app/
│   │   └── page.tsx           # Main application page
│   ├── components/
│   │   ├── GameGrid.tsx       # The game grid component
│   │   ├── HowToPlayModal.tsx # Introduction modal component
│   │   ├── Keyboard.tsx       # On-screen keyboard component
│   │   ├── ProgressBar.tsx    # Progress bar component
│   │   ├── Tile.tsx           # Individual tile component
│   │   └── HowToPlayModal.module.css # Styles for HowToPlayModal
│   ├── utils/
│   │   ├── calculate.ts       # Expression calculation utility
│   │   ├── evaluateGuess.ts   # Guess evaluation utility
│   │   └── puzzles.ts         # Puzzle generation utility
│   └── assets/
│       └── bg.jpg             # Background image for modal
├── cypress/
│   ├── e2e/
│   │   └── mathler.cy.ts      # Cypress end-to-end tests
│   └── tsconfig.json          # TypeScript configuration for Cypress
├── public/                    # Static assets
├── .gitignore
├── package.json
├── README.md                  # This README file
└── tsconfig.json              # TypeScript configuration
```

---

## Testing

## Running Jest Tests

We use Jest for unit testing our utility functions to ensure they work correctly. Jest tests are already created and cover critical parts of the game's logic.

Run Jest Tests

```bash
npm run test
```

This command runs all tests in the tests/ directory that match the pattern \*.test.ts.

## Test Coverage

To generate a test coverage report:

```bash
npm run test:coverage
The coverage report will be displayed in the terminal and can be viewed in detail in the generated coverage/ directory.
```

### Running Cypress Tests

We use Cypress for end-to-end testing to ensure the application works as expected.

1. **Install Cypress**

   Cypress is already included in the `devDependencies`. If not, install it:

   ```bash
   npm install --save-dev cypress
   ```

2. **Open Cypress Test Runner**

   ```bash
   npx cypress open
   ```

3. **Run Tests**

   In the Cypress Test Runner interface, select `mathler.cy.ts` to run the test suite.

**Note**: Ensure the development server is running before running the tests.

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the Repository**

2. **Create a Feature Branch**

   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Commit Changes**

   ```bash
   git commit -m "Add your feature"
   ```

4. **Push to Branch**

   ```bash
   git push origin feature/YourFeature
   ```

5. **Open a Pull Request**

---

---

## Contact

**Your Name**

- **Email**: gabriel.pinto.fialho@gmail.com
- **GitHub**: [yourusername](https://github.com/GFialho)
- **LinkedIn**: [Gabriel Fialho](https://www.linkedin.com/in/gabriel-fialho-engineer)

---

### Additional Information

- **Technologies Used**:

  - **React**: For building the user interface.
  - **Next.js**: As the React framework for server-side rendering and routing.
  - **TypeScript**: For static typing.
  - **Cypress**: For end-to-end testing.
  - **Tailwind CSS**: For styling.
  - **Framer Motion**: For animations.
  - **Radix UI**: For accessible UI components.
  - **js-cookie**: For handling cookies.
  - **React Icons**: For iconography.

- **Key Components**:

  - **`page.tsx`**: The main component that ties together the game logic and UI components.
  - **`GameGrid.tsx`**: Renders the grid of tiles displaying guesses and their evaluations.
  - **`HowToPlayModal.tsx`**: The modal that introduces the game to new players.
  - **`Keyboard.tsx`**: An on-screen keyboard for user input.
  - **`ProgressBar.tsx`**: Displays the user's progress through the levels.
  - **`Tile.tsx`**: Represents each individual tile in the game grid, showing characters and their evaluation status.

- **Game Logic**:

  - **Expression Calculation**: Uses `calculateExpression` utility to compute the result of mathematical expressions.
  - **Guess Evaluation**: Uses `evaluateGuess` utility to compare the user's guess with the solution and determine correctness.
  - **Puzzle Generation**: `getPuzzleByLevel` utility function provides the solution for each level.

- **User Experience**:

  - **Typing Animation**: Simulates a terminal typing effect for immersive gameplay.
  - **Responsive Design**: Ensures the game is playable on various screen sizes.
  - **Accessibility**: Utilizes Radix UI components to ensure the game is accessible to all users.

- **Testing Approach**:

  The Cypress test suite (`spec.cy`) covers:

  - Modal display and interaction.
  - Input handling via both keyboard and on-screen keys.
  - Correct and incorrect guess processing.
  - Level progression and progress bar updates.
  - Component rendering and behavior validation.

---
