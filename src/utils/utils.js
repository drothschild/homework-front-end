function removeDuplicates (array, prop) {
    let seen = {}
    return array.filter( item => {
        return seen.hasOwnProperty(item[prop]) ? false : (seen[item[prop]] = true)
    })
}
export {removeDuplicates}