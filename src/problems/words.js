module.exports = function words(data){
    let results = []
    console.log(data);
    for(let i = 0; i<data.input.length; i++){
        let word = data.input[i][0]
        let dict = data.input[i][1].split(' ')
        let map = Array.prototype.map.call(word+'_', letter=>false);
        map[0] = true;
        results.push(solveWords(word, dict, map))
    }
    return results;
}

function solveWords(word, dict, map){
    let found = [];
    if(word.length===0)
        return true;
    for(let i = 0; i<word.length; i++){
        if(map[i]){
            for(let j = i+1; j<word.length+1; j++){
                if(dict.indexOf(word.slice(i,j))!==-1){
                    map[j]= true;
                    found.push(word.slice(i,j))
                }
            }
        }
    }
    return map[map.length-1];
}