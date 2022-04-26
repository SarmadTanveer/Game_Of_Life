class GameOfLife{

    constructor(cellSize,gridSizeRow,gridSizeCol){
        this.cellSize = cellSize; 
        this.deadColor = '#181818'; 
        this.aliveColor = '#FF756B'; 

        this.numCol = Math.floor(gridSizeRow/this.cellSize);
        this.numRow = Math.floor(gridSizeCol/this.cellSize); 
        
        //array creation 
        this.activeArray; 
        this.inActiveArray; 


        this.generateRandomSeed = () =>{
            //clear previous state 
            this.gameSetup(); 
            //initialize array with randomly assigned initial state
            for(let i=0; i<this.numCol-1; i++){
                for(let j=0; j<this.numRow-1; j++){
                this.activeArray[i][j] = Math.round(Math.random())
                }
            } 
        }


        this.generateDiamond = () => {
            //4-8-12 diamond
            //center x of grid 
            
            const xCenter = Math.round(this.numCol/2); 
            const yCenter = Math.round(this.numRow/2); 

            const line1XLeft = xCenter-2;
            const line2XLeft = xCenter-4;
            const line3XLeft = xCenter-6; 

            const line1Xright = xCenter+2;
            const line2Xright = xCenter+4;
            const line3Xright = xCenter+6; 

            console.log(this.numRow); 
             
            const seedYupperLim = yCenter - 4; 

            console.log(seedYupperLim);

            const lineXrights = [line1Xright,line2Xright,line3Xright, line2Xright, line1Xright]
            const lineXlefts = [line1XLeft,line2XLeft,line3XLeft,line2XLeft,line1XLeft]
            const lineYs = [seedYupperLim, seedYupperLim+2, seedYupperLim+4, seedYupperLim+6, seedYupperLim+8]; 
             
            
            for(let i= 0; i<5; i++){
                    console.log('here'); 
                    for(let lineXleft = lineXlefts[i]; lineXleft<lineXrights[i]; lineXleft++){
                        this.activeArray[lineXleft][lineYs[i]] = 1; 
                        console.log(i); 
                    } 
                }
        }

        //simplest initial state, still life mainly for debugging 
        this.generateBlock = ()=>{
            const xCenter = Math.round(this.numCol/2); 
            const yCenter = Math.round(this.numRow/2); 

    
            this.activeArray[xCenter-1][yCenter-1] =1;
            this.activeArray[xCenter][yCenter-1] =1;
            this.activeArray[xCenter-1][yCenter] =1;
            this.activeArray[xCenter][yCenter] =1; 

        }

        this.generateSeed = () =>{
            this.gameSetup(); 
            this.generateDiamond(); 
        }

        //needs to be implmented
        //matrix edges wrapping around not implemented, boundary = dead. 
        this.calculateNeighbourSum = (i,j) => {
            let neighbourSum = 0; 
            if(i === 0 || j=== 0 || i===this.numCol-1|| j=== this.numRow-1){
                neighbourSum = 0; 
            }else{
                neighbourSum = this.inActiveArray[i-1][j-1] + this.inActiveArray[i-1][j] + this.inActiveArray[i-1][j+1] + this.inActiveArray[i][j-1] + this.inActiveArray[i][j+1]+ this.inActiveArray[i+1][j-1] + this.inActiveArray[i+1][j] + this.inActiveArray[i+1][j+1]; 
            }

            return neighbourSum
        }

        //game of life algorithm 
        this.nextGeneration = (rowIndex,colIndex) =>{

            const neighbourSum = this.calculateNeighbourSum(rowIndex,colIndex); 
            let nextGen = 0; 
            //rules
            if(this.inActiveArray[rowIndex][colIndex] === 1){
                nextGen = neighbourSum === 2 || neighbourSum ===3 ? 1 : 0; 
            }else{
                nextGen = neighbourSum === 3 ? 1 : 0; 
            } 
            return nextGen; 
        }

        this.gameSetup = () => {
            this.activeArray = []; 
            this.inActiveArray = []; 

            for(let i=0; i<this.numCol; i++){
                this.activeArray[i] = []
                this.inActiveArray[i] = []
                for(let j=0; j<this.numRow; j++){

                    this.activeArray[i][j] = 0; 
                    this.inActiveArray[i][j] = 0; 
                }
            }

        }


        this.runGame = () =>{
             
            //switch current state to previous state: swap: shallow copy is sufficient
            for(let i =0; i<this.numCol; i++){
                this.inActiveArray[i] = this.activeArray[i].map((i)=>i);  
            }
            //update state
            for(let i =0; i<this.numCol; i++){
                for(let j=0; j<this.numRow; j++){
                    this.activeArray[i][j] = this.nextGeneration(i,j); 
                }
                  
            }
        }
    }

    
}