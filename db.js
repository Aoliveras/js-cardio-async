const fs = require('fs').promises;
/*
All of your functions must return a promise!
*/

/* 
Every function should be logged with a timestamp.
If the function logs data, then put that data into the log
ex after running get('user.json', 'email'):
  sroberts@talentpath.com 1563221866619

If the function just completes an operation, then mention that
ex after running delete('user.json'):
  user.json succesfully delete 1563221866619

Errors should also be logged (preferably in a human-readable format)
*/

function log(value) {
  return fs.appendFile('log.txt', `${value} ${Date.now()}\n`);
}

/**
 * Logs the value of object[key]
 * @param {string} file
 * @param {string} key
 */

// W/ Promise
// function get(file, key) {
//   // 1. Read File
//   // 2. Handle promise data
//   return fs
//     .readFile(file, 'utf8')
//     .then(data => {
//       // 3. Parse data from string
//       const parsed = JSON.parse(data);
//       // 4. Use the key to get the value at Object[key]
//       const value = parsed[key];
//       if (!value) return log(`ERROR: ${key} Invalid key on ${file}`);
//       // 5.
//       return log(value);
//     })
//     .catch(err => log(`No such file or directory ${file}`));
// }

// w/ async-await
async function get(file, key) {
  try {
    const data = await fs.readFile(file, 'utf8');
    const parsed = JSON.parse(data);
    const value = parsed[key];
    if (!value) return log(`ERROR: ${key} Invalid key on ${file}`);
    return log(value);
  } catch (err) {
    return log(`No such file or directory ${file}`);
  }
}

/**
 * Sets the value of object[key] and rewrites object to file
 * @param {string} file
 * @param {string} key
 * @param {string} value
 */
async function set(file, key, value) {
  try {
    // read file
    const data = await fs.readFile(file, 'utf8');
    // handle promise data
    const parsed = JSON.parse(data);
    parsed[key] = value;
    // return object to JSON string.
    const newObj = JSON.stringify(parsed);
    await fs.writeFile(file, newObj);
    return log(`Key: ${key}: ${value} set in ${file}`);
  } catch (err) {
    return log(`No such file or directory ${file}`);
  }
}

/**
 * Deletes key from object and rewrites object to file
 * @param {string} file
 * @param {string} key
 */
async function remove(file, key) {
  try {
    // read file
    const data = await fs.readFile(file, 'utf8');
    // handle promise data
    const parsed = JSON.parse(data);
    const newObj = JSON.parse(JSON.stringify(parsed));
    const keyToDelete = newObj[key];
    // error if key is not present in file object
    if (!keyToDelete) return log(`ERROR: ${key} Invalid key on ${file}`);
    delete newObj[key];
    // return object to JSON string.
    const updatedObj = JSON.stringify(newObj);
    await fs.writeFile(file, updatedObj);
    return log(`Key: ${key} removed from ${file}`);
  } catch (err) {
    return log(`No such file or directory ${file}`);
  }
}

/**
 * Deletes file.
 * Gracefully errors if the file does not exist.
 * @param {string} file
 */
async function deleteFile(file) {
  try {
    const fileRemoved = file;
    await fs.unlink(file);
    return log(`Removed ${fileRemoved}`);
  } catch (err) {
    return log(`No such file or directory ${file}`);
  }
}

/**
 * Creates file with an empty object inside.
 * Gracefully errors if the file already exists.
 * @param {string} file JSON filename
 */
async function createFile(file) {
  try {
    await fs.access(file, err => {
      if (err) {
        return log(`${file} already exists`);
      }
    });
    // const emptyObj = JSON.stringify({});
    // fs.writeFile(file, emptyObj);
    // return log(`${file} created!`);
  } catch (err) {
    return log(`${file} already exists`);
  }
}

/**
 * Merges all data into a mega object and logs it.
 * Each object key should be the filename (without the .json) and the value should be the contents
 * ex:
 *  {
 *  user: {
 *      "firstname": "Scott",
 *      "lastname": "Roberts",
 *      "email": "sroberts@talentpath.com",
 *      "username": "scoot"
 *    },
 *  post: {
 *      "title": "Async/Await lesson",
 *      "description": "How to write asynchronous JavaScript",
 *      "date": "July 15, 2019"
 *    }
 * }
 */
function mergeData() {}

/**
 * Takes two files and logs all the properties as a list without duplicates
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *  union('scott.json', 'andrew.json')
 *  // ['firstname', 'lastname', 'email', 'username']
 */
function union(fileA, fileB) {}

/**
 * Takes two files and logs all the properties that both objects share
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    intersect('scott.json', 'andrew.json')
 *    // ['firstname', 'lastname', 'email']
 */
function intersect(fileA, fileB) {}

/**
 * Takes two files and logs all properties that are different between the two objects
 * @param {string} fileA
 * @param {string} fileB
 * @example
 *    difference('scott.json', 'andrew.json')
 *    // ['username']
 */
function difference(fileA, fileB) {}

module.exports = {
  get,
  set,
  remove,
  deleteFile,
  createFile,
  mergeData,
  union,
  intersect,
  difference,
};
