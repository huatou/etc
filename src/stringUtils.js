const stringUtils = {

    contain(string, searchString) {
        if (!string || !searchString) {
            return false;
        }
        return string.indexOf(searchString) != -1
    }
}

export default stringUtils;