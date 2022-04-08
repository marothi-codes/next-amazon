import mongoose from 'mongoose';

const connection = {}; // Database connection properties are stored in this object.

/**
 * Connects to the database if no exsisting connections are detected.
 * @returns void
 */
async function connect() {
  if (connection.isConnected) {
    console.log('already connected');
    return; // Exits the function.
  }
  // Check for existing connections, don't connect if already connected.
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }
  // Establish a connection to the database.
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log('new connection');
  connection.isConnected = db.connections[0].readyState;
}

/**
 * Terminates the database connection in a production environment.
 */
async function disconnect() {
  // Check for connections and disconnect if running in production.
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('not disconnected');
    }
  }
}
/**
 * Converts a database document into a JSON object.
 * @param {object} doc The database object.
 * @returns {object} JSON representation of the document.
 */
function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, convertDocToObj, disconnect };
export default db;
