
alert("Lets Play A Guessing Game!!!");


let  ms1 = document.getElementById("message1");
let ms2 = document.getElementById("message2");
let ms3 = document.getElementById("message3");
let ms4 = document.getElementById("message4");
const answer = Math.floor(Math.random()*100) + 1;

let no_of_guesses = 0;
let guessed_nums = [];



function play(){
    
    let user_guess = document.getElementById("guess").value;
    
    if(isNaN(user_guess) || user_guess < 1 || user_guess > 100){
        alert("Please enter a number between 1 and 100.");
    } else if(no_of_guesses > 4){
            ms1.textContent = "Only 5 Guesses Allowed. " + " Please Try Again!";
            ms2.textContent = "The number was: " + answer;
            return  false;
        
    } 
    
    else if (guessed_nums.includes(user_guess)){
        alert("Duplicate Choice! " + " Please choose again! ");
    } 
    else{
        guessed_nums.push(user_guess);
        no_of_guesses+= 1;
    }   
   
       let diffCheck = user_guess - answer;
       let diffCheck2 = answer - user_guess ;

     
        if(diffCheck < 10 && diffCheck2 < 10){
            ms4.textContent = " Your burning up";
        }  
       
        else if(diffCheck < 25 && diffCheck2 < 25) { 
            ms4.textContent = " Luke Warm";
        } 
       
        else if(diffCheck < 50 && diffCheck2 < 50) { 
            ms4.textContent = " Your Chilly";
        } 
        
        else {
            ms4.textContent = "Your Cold";
        }
    
        if(user_guess < answer){
            ms1.textContent = "Your guess is too low";
            ms3.textContent = "Guessed numbers are: " + guessed_nums;              
        }
        else if(user_guess > answer){
            ms1.textContent = "Your guess is too high";
            ms3.textContent = "Guessed numbers are: " + guessed_nums;

        } 

      


       
      else if(user_guess == answer){
            ms1.textContent = "Winner Winner Chicken Dinner!!";
            ms2.textContent = "The number was: " + answer;
           
            document.getElementById("my_btn").disabled 
            = true;
        }
    
}

function clear1(){
    document.getElementById("result").reset();}
    
