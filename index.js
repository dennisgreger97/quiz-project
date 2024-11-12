const readline = require("readline-sync");

const name = readline.keyInSelect(
  ["Option 1", "Option 2"],
  "Wähle eine Option"
);
