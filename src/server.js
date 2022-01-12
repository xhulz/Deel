const app = require("./app");

(() => {
  try {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Express App Listening on Port ${process.env.SERVER_PORT}`);
    });
  } catch (error) {
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
})();
