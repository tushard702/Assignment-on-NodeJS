//import required packages
var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')

//setup of body parser to read form data
app.use(bodyParser.urlencoded({ extended: true }));

//get request to display the webpage when server is started
app.get('/', (_, res)=>{
    res.sendFile(path.join(__dirname+'/public/index.html'))
})

//get request
app.get('/findExpense', (_, res) =>{
    res.send(`<h1>Not Allowed</h1>`)
})

//post request to read the data posted by form and parse it
app.post('/findExpense', (req, res)=>{

    //store the data in result
    const result = calculateSplitPrice(req.body.price, req.body.numberOfPeople);

    //check if the operation is allowed
    if(result == 0){
        
        //not allowed so redirect the user back to homepage
        console.log('ummm..something went wrong! please check the inputs!')
        res.redirect('/')
    }
    else{

        //if everything is good take the user to results page
        res.send(`Ans : ${result}`);
    }
});

//start the server on port 3000
app.listen(3000, function() {
    console.log('Server running at 3000');
  });

//function to compute per person cost 
function calculateSplitPrice(totalPrice, numberOfPeople){
    
    // check if value is greater than zero
    if(totalPrice <= 0 || numberOfPeople <= 0 )
        return 0;
    return totalPrice/numberOfPeople
}  