module.exports = {
    date(timestamp) {
        
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        return {
            iso: `${year}-${month}-${day}`,
            format: `${day}/${month}/${year}`
        }
    },
    checkToDelete(path){
        const contain  = string => /(recipe|face)/gi.test(string);
        if(contain(path)){
            return true;
        }else{
            return false;
        }
    }
}