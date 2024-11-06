/**
 * List of puzzles for each level.
 * Each puzzle includes an equation as a string.
 */
/**
 * List of puzzles for each level (each puzzle is exactly 6 characters long).
 * Each puzzle includes an equation as a string.
 */
export const puzzles = [
  // Level 1 to Level 100
  "2+4+50", // Level 1
  "12/4+3", // Level 2
  "6*5-24", // Level 3
  "7+5*6", // Level 4
  "18-9+1", // Level 5
  "9+2+30", // Level 6
  "15-5*2", // Level 7
  "8*2-10", // Level 8
  "4+6+40", // Level 9
  "20/5+8", // Level 10
  "3*7-15", // Level 11
  "5+9-12", // Level 12
  "16/4+4", // Level 13
  "11+2-7", // Level 14
  "9+8-11", // Level 15
  "14/7+6", // Level 16
  "6*4-18", // Level 17
  "7+5+20", // Level 18
  "8*3-16", // Level 19
  "4+9+30", // Level 20
  "24/6+8", // Level 21
  "3*9-21", // Level 22
  "5+8+10", // Level 23
  "27/9+4", // Level 24
  "12+3-9", // Level 25
  "2*9-12", // Level 26
  "15-7+4", // Level 27
  "16/8+5", // Level 28
  "7+6+10", // Level 29
  "8*4-22", // Level 30
  "4+12+8", // Level 31
  "28/7+8", // Level 32
  "5+9+12", // Level 33
  "30/6+5", // Level 34
  "13+2-9", // Level 35
  "17-8+5", // Level 36
  "9+8-11", // Level 37
  "6*6-30", // Level 38
  "7+7+10", // Level 39
  "8*5-30", // Level 40
  "4+15+7", // Level 41
  "24/8+9", // Level 42
  "5+17-20", // Level 43
  "33/11+4", // Level 44
  "14+3-11", // Level 45
  "19-9+6", // Level 46
  "9+7+10", // Level 47
  "36/9+8", // Level 48
  "6*7-36", // Level 49
  "7+8+10", // Level 50
  "8*6-40", // Level 51
  "4+18+6", // Level 52
  "40/8+7", // Level 53
  "5+19-22", // Level 54
  "27/9+6", // Level 55
  "15+2-12", // Level 56
  "21-10+5", // Level 57
  "42/7+8", // Level 58
  "6*8-42", // Level 59
  "7+9+10", // Level 60
  "8*7-46", // Level 61
  "4+21+5", // Level 62
  "45/9+9", // Level 63
  "5+21-24", // Level 64
  "48/12+6", // Level 65
  "16+3-13", // Level 66
  "23-11+6", // Level 67
  "9+8+10", // Level 68
  "6*9-48", // Level 69
  "7+10+9", // Level 70
  "8*8-54", // Level 71
  "4+24+6", // Level 72
  "54/9+6", // Level 73
  "5+23-26", // Level 74
  "33/11+7", // Level 75
  "17+2-15", // Level 76
  "21-12+7", // Level 77
  "10+9+10", // Level 78
  "36/6+8", // Level 79
  "6*10-54", // Level 80
  "7+11+8", // Level 81
  "8*9-62", // Level 82
  "4+26+6", // Level 83
  "60/5+0", // Level 84
  "5+25-30", // Level 85
  "45/9+8", // Level 86
  "18+3-15", // Level 87
  "2*15-24", // Level 88
  "22-13+7", // Level 89
  "11+8+10", // Level 90
  "42/6+9", // Level 91
  "6*11-60", // Level 92
  "7+12+7", // Level 93
  "80/8-0", // Level 94
  "4+28+6", // Level 95
  "66/11+6", // Level 96
  "5+27-30", // Level 97
  "36/12+7", // Level 98
  "19+2-15", // Level 99
  "2*16-26", // Level 100
];

/**
 * Retrieves the puzzle for the given level.
 *
 * @param level The current level of the game.
 * @returns The equation string for the current level.
 */
export function getPuzzleByLevel(level: number): string | undefined {
  // Validate level
  if (!Number.isInteger(level) || level <= 0) {
    return undefined;
  }

  if (level <= puzzles.length) {
    return puzzles[level - 1];
  } else {
    return "Congratulations! You've completed all levels.";
  }
}
