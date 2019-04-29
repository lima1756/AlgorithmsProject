module.exports = function mergelist(data){
    for(let i = 0; i< data.input.length; i++){
        let lists = data.input[i].map(value=>value.split(' ').map(val=>parseInt(val)))
        data.input[i] = lists;   
    }
    let outputs = []
    for(let i = 0; i< data.input.length; i++){
        let currentIndex = 0;
        let merged = [];
        let lists = data.input[i];
        while(lists.length>0){
            for(let j = 0; j<lists.length; j++){
                try {
                    if(lists[currentIndex][0]>lists[j][0]){
                        currentIndex = j;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            
            merged.push(lists[currentIndex].shift());
            if(lists[currentIndex].length===0){
                lists.splice(currentIndex,1);
                
                currentIndex = 0;
            }
        }
        
        outputs.push(merged.join(' '));
        
        
    }
    return outputs;
}