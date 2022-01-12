module.exports = {
    roots: ["<rootDir>/tests"],
    testMatch: [
      "**/__tests__/**/*.+(ts|tsx|js)",
      "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    verbose: true,
    collectCoverage: true,
    forceExit: true,
    maxWorkers: 10,
    bail: 1,
    coverageReporters: ["json-summary"],
};