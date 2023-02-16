import axios from "axios";

axios.get('/user',{params:{ID:12345
}
})
.then(function(response){
    console.log(response);
})
.catch(function(error){
    console.log(error);
})
.then(function(){});