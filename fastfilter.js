// fastFilter: special data structure that takes in an array of objects
// and creates a map in the background for constant time filters
// ***
// feature 1: ability to pass in an options object that creates a map 
// based on the fields in the options object and adds any objects with
// matching value to map. 
// example: options = {type: "time"} <-- any object that gets pushed and 
// has a 'type' field with a value of "time" will get added to fmap's 'type' array 
function fastFilter(objs, opts) {
  const arr = [...objs] // array
  const fmap = {} // background map

  // initial filling of background map
  for (let [opt, val] of Object.entries(opts)) {
    fmap[opt] = arr.filter(obj => obj[opt] === val)
  }

  // return object with methods to access arr and fmap
  return {
    print: () => console.log(`array:\n${JSON.stringify(arr)}\nmap:\n${JSON.stringify(fmap)}\n`),
    push: (newObj) => { // ability to add more objects
      arr.push(newObj) // push object
      for (let [opt, val] of Object.entries(opts)) { // check for specials, add to fmap
        if (newObj[opt] && newObj[opt] === val) {
          fmap[opt].push(newObj)
        }    
      }
    },
    // perform a query on data; param 2 is optional
    // param 2 is for a non-fmap query that gets objects with a specific key, val pair
    query: (field, val) => {
      if (Object.keys(opts).includes(field) && fmap[field].length > 0 && (val ? val === opts[field] : true)) {
        return fmap[field] // get objects that fmap was configured to store
      } else {
        return val // check if val was passed
          ? arr.filter(obj => obj[field] === val) // get all objects with matching field and val
          : arr.filter(obj => Object.keys(obj).includes(field)) // get all objects that have field as a key
      }
    }
  }
}
// init
let objs = [{ name: "", type: "string"}, {name: "steve", type: "int"}] // initial object array 
let opts = {type: "int"} // special fields/values to prep for constant time lookups
let fm = fastFilter(objs, opts)

// print array and map, then do both queries
fm.print()
console.log("fast query options: ", JSON.stringify(opts), '\n')
console.log("fast query (fm.query('type')): ", fm.query('type'))
console.log("still a fast query (fm.query('type', 'int')): ", fm.query('type', 'int'))
console.log('')
console.log("reg query (fm.query('type', 'string')):  ", fm.query('type', 'string'))
console.log("another req query (fm.query('name')): ", fm.query('name')) 