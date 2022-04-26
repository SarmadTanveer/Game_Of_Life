const canvas = document.querySelector("#gamefield"); 
const ctx = canvas.getContext("2d"); 

const game = new GameOfLife(20, canvas.width, canvas.height); 
game.gameSetup(); 

let intervalId; 
window.onload = () =>{

    showGameState  = ()=>{
        //update canvas
         let canvasState = game.activeArray; 
         let color=game.aliveColor;
         
        //show canvas state 
        for(let i =0; i<game.numCol; i++){
            for(let j=0; j<game.numRow; j++){
                if(canvasState[i][j] === 1){
                    color = game.aliveColor; 
                }else{
                    color = game.deadColor; 
                }
                ctx.fillStyle = color; 
                ctx.fillRect(i*game.cellSize, j*game.cellSize, game.cellSize,game.cellSize)
            }
        }
         
    }
    
    showGameState(); 

    //add event listeners to buttons 
    //random start clicked
    document.querySelector("#next-gen").addEventListener('click',()=>{
        //generate random initial state
            //calculate game state 
            game.runGame();  
            //show game state 
            showGameState(); 
     
    });
    
    //custom start clicked
    document.querySelector("#auto-gen").addEventListener('click',()=>{
        //generate cutom initial state
        game.arrayInitConfig();

        //update and display frame 
        intervalId = setInterval(() =>{
            //generate next generation
            game.runGame();
            //show game state on canvas 
            showGameState(); 

        }, 1000); 
           
    });

    document.querySelector("#seed").addEventListener('click',()=>{
        //generate cutom initial state
        game.generateSeed();
        //displaySeed
        showGameState();  
    });

    document.querySelector("#random-seed").addEventListener('click',()=>{
        //generate cutom initial state
        game.generateRandomSeed(); 
        //displaySeed
        showGameState();  
    });

    //stop clicked
    document.querySelector("#stop").addEventListener('click',()=>{
        //kill/pause game state
        if(intervalId){
        clearInterval(intervalId); 
    }
    });

   
 
}