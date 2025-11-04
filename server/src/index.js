import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
import { createAdmin, importEducationalServiceData } from "./libs/initialSetup.js";

async function main() {
  try {
    await connectDB();
    await createAdmin();
    await importEducationalServiceData()
    app.listen(PORT);
    console.log(`Listening on port:${PORT}`);
  } catch (error) {
    console.error(error);
  }
}

main();
