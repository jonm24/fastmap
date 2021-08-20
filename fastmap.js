// fastmap: special data structure that takes in an array of objects
// and creates a map in the background for quicker lookups
// ***
// feature 1: ability to pass in an options object that creates a map 
// based on the fields in the options object and adds any objects with
// matching value to map. 
// example: options = {type: "time"} <-- any object that gets pushed and 
// has a 'type' field with a value of "time" will get added to fmap's 'type' array 
function fastMap(objs, opts) {
    const arr = [...objs] // array
    const fmap = {} // background map

    // initial filling of background map
    for (let [opt, val] of Object.entries(opts)) { 
        fmap[opt] = arr.filter(obj => obj[opt] === val)
    }

    // return object with methods to access arr and fmap
    return {
        view: () => console.log(`array:\n${JSON.stringify(arr)}\n map:\n${JSON.stringify(fmap)}\n`),
        push: (newObj) => {
            arr.push(newObj)
            for (let [opt, val] of Object.entries(opts)) {
                if (newObj[opt] && newObj[opt] === val) {
                    fmap[opt].push(newObj)
                }    
            }
        },
        fastQuery: (field, val) => {    
            return fmap[field]?.length > 0 ? fmap[field] : "not a fast query"
        }
    }
}
// init
let objs = [{ name: "", type: ""}, {name: "steve", type: "time"}] // initial object array 
let opts = { name: "jon", type: "time"} // special fields/values to prep for constant time lookups
let fm = fastMap(objs, opts)

// print array and map, then do a fast query
fm.view()
console.log("query: ", fm.fastQuery('type', 'time'))