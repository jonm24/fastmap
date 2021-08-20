// fastmap: special data structure that creates an array with an initial object 
// and creates a map in the background for quicker lookups
// ***
// feature 1: ability to pass in an options object that creates a map 
// based on the fields in the options object and adds any objects with
// matching value to map. 
// example: options = {type: "time"} <-- any object that gets pushed and 
// has a 'type' field with a value of "time" will get added to fmap's 'type' array 
// in the background map
function fastMap(obj, opts) {
    arr = [obj]
    fmap = {}
    for (let opt in opts) {
        fmap[opt] = []
    }
    return {
        view: () => console.log(`array:\n${JSON.stringify(arr)}\n map:\n${JSON.stringify(fmap)}\n`),
        push: (newObj) => {
            for (let [opt, val] of Object.entries(opts)) {
                if (newObj[opt] && newObj[opt] === val) {
                    fmap[opt].push(newObj)
                }    
            }
            arr.push(newObj)
        },
        fastQuery: (field, val) => {
            if (!(field in Object.keys(opts)) && val != opts[field]) {
                return "not a fast query"
            } else {
                return fmap[field]
            }
        }
    }
}
// init
let obj = { name: "", type: ""}
let opts = { name: "jon", type: "time"}
let fm = fastMap(obj, opts)

// do stuff
fm.push({name: "jon", type: "time"})
fm.view()
let query = fm.fastQuery('type', 'time')
console.log("query: ", query)