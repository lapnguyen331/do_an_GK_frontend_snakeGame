// get element
const scoreNumber= document.querySelector('.score-num')
const control = $('.custom-control input')
// console.log(control);
// config game
const blockSize= 30; // khối block -> kích thước part của rắn và map
const gameWidth=1200; //40 khối theo chiều ngang
const gameHeight =600;//20 khối theo chiều dọc
let gameStatus ={
    pause:'pause',
    win:'win',
    lose:'lose',
    runing:'runing',
}
const xStep = gameWidth/blockSize; //số khối theo chiều x
const yStep = gameHeight/blockSize; // số khối theo chiều y
let maxSpeed = 5; //tốc độ di chuyển theo k số block
let foodAmmount = 100; //số lượng thức ăn trên map
let tailLength =1; //gồm đầu, chiều dài rắn
let time = 100; //thời gian
/*
* giá trị map = 0;
*giá trị của rắn =1
*giá trị của food = 2
* giá trị tường  = -1
-------size obj
-food 30
-blockSize = 30
-------qui định game play
-trái :a
-phải:d
-trên:w
-dưới:s
*/

window.addEventListener("load",function(){ 
    this.moveY = 0; //di chuyển dọc
    this.moveX =0; //di chuyển ngang
    //canvas setup
    const canvas = this.document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = gameWidth;
    canvas.height= gameHeight;
  
    // xử lí sự kiện người dùng (press key)
    class InputHandle{
        constructor(game){
            this.game = game;
            window.addEventListener('keydown',keydown)
        }              
    }
    function keydown(e){
        switch(e.key){
            case 'a':
                if(this.moveX == -blockSize) return;//đang đi trái
                this.moveX = -blockSize;
                this.moveY=0;
                break;
            case 'd':
                if(this.moveX == blockSize) return;//đang đi phải
                this.moveX =blockSize
                this.moveY =0;

                break;  
             case 'w':
                if(this.moveY == -blockSize) return;//đang đi lên
                this.moveY = -blockSize;
                this.moveX=0;
                break;
            case 's':
                if(this.moveY == blockSize) return; //đang đi xuống
                this.moveY =blockSize;
                this.moveX =0;
                break;  
        }
    }  

    class ProjectFile{

    }
    // thức ăn
    class Food{
        constructor(x,y){
            this.image = new Image();
            this.x = x;
            this.y = y;
            this.image.src='assets/food/mouse.png'
        }
        draw(context){
            context.drawImage(this.image,this.x,this.y,blockSize,blockSize);
        }
        setLocation(newX,newY){
            this.x=newX;
            this.y= newY;
        }

    }
    //phần cơ thể rắn
    class BodyPart{
        constructor(x,y,index){
            this.x=x;
            this.y=y;
            this.index = index;
            
        }
        
    }
    //người chơi 'snake'
    class Player{
        constructor(game){
            this.game = game;
            this.headx =5*blockSize ;//vị trí startgame
            this.heady =5*blockSize;//vị trí  startgame
            var bodypart = new BodyPart(this.headx,this.heady,0)
            this.body =[bodypart]; //thêm phần đầu vào

            //tốc độ 
            
        }
        //update sau khi press key
        update(){
            this.heady += moveY;
            this.headx += moveX;
        };
        //vẽ player
        drawSnake(context){
            context.fillStyle = "green";//đầu
            context.fillRect(this.headx,this.heady,blockSize,blockSize);
            this.drawBody(context)
        }
        drawBody(context){
            context.fillStyle='aqua'; //thân
            context.strokeStyle='black'
            if(this.body.length != 0){
                for(let i =1; i < this.body.length ; i++){
                    let part = this.body[i];
                    context.fillRect(part.x,part.y,blockSize,blockSize);
                    context.strokeRect(part.x,part.y,blockSize,blockSize)
                }
            }
            this.body.push(new BodyPart(this.headx,this.heady,tailLength))
            if(this.body.length > tailLength){
                this.body.shift();// xóa nếu dài hơn tổng chiều dài
            }
            // console.log(this.body);
        }
    }
    // quân địch
    class Enermy{

    }
    //layer game
    class Layer{

    }
    // game background
    class BackGround{
        constructor(){
            this.image = new Image();
            this.image.src = 'assets/background/grass_blur64x64.png';
            this.snowImage = new Image();
            this.snowImage.src='assets/background/snow_edge_L.png'
        }

    }
    //draw score , infor, ....
    class UI{

    }
   
    // quản lí game
    class Game{
        constructor(width,height){
            this.score = 0; //điểm 
            this.fence= null;
            this.player= new Player(this);
            this.inputHandle = new InputHandle(this);
            this.food = createFood(foodAmmount); // danh sách thức ăn
            this.status = gameStatus.start;//trạng thái game
            this.gamebackground = new BackGround(); //background game
        }
        //update UI game
        update(){
            // console.log('update');
            this.player.update();
        }
        //vẽ game
        drawPlayer(context){
            // this.drawMap();
            this.player.drawSnake(context)
        }
        drawFood(context){
            for(let i = 0; i < this.food.length; i++){
                this.food[i].draw(context);
            }
        }
       
        drawMap(context){
            // -->vẽ grid cho dễ nhìn :>>
            // context.strokeStyle ='red';
            // context.lineWidth = 2; //độ dày viền
            // for(let i =1; i< xStep-1;i++){
            //     // context.strokeRect(i*blockSize,0,blockSize,blockSize) //theo xAsis
            //     for(let j =1 ; j< yStep-1; j++){
            //         context.strokeRect(i*blockSize,j*blockSize,blockSize,blockSize) //theo yAsis
            //     }
            // }
            context.drawImage(this.gamebackground.image,0+blockSize,0+blockSize,gameWidth -blockSize,gameHeight -blockSize);
            // vẽ thêm tuyết cho đẹp
            context.drawImage(this.gamebackground.snowImage,40,40,blockSize*5,blockSize*5)
        }

        drawBorder(context){
            context.strokeStyle  ="white"; //màu viền border
            context.fillStyle='gray'//màu của border
            context.lineWidth = 2; //độ dày viền
            var x =0;
            var xBorderAmmount = gameWidth/blockSize;
            var yBorderAmmount = gameHeight/blockSize;
            for(let k = 0 ; k < xBorderAmmount;k++){
                context.strokeRect(x,0,blockSize,blockSize) //border trên
                context.strokeRect(x,gameHeight - blockSize,blockSize,blockSize) //border dưới

                context.fillRect(x,0,blockSize,blockSize) //border trên
                context.fillRect(x,gameHeight - blockSize,blockSize,blockSize) //border dưới
                x += blockSize;
            }
            x=0; //reset biến x
            for(let k =0 ; k <yStep ; k++){
                context.strokeRect(0,x,blockSize,blockSize) //border trái
                context.strokeRect(gameWidth - blockSize,x,blockSize,blockSize) //border phải

                context.fillRect(0,x,blockSize,blockSize) //border trái
                context.fillRect(gameWidth-blockSize,x,gameHeight - blockSize,blockSize,blockSize) //border phải
                x += blockSize;
            }
        }
        createMap(context){
            this.drawBorder(context);
            this.drawMap(context); 
        }
        checkFoodColision(game){
            game.food.forEach(function (element){
                if((game.player.headx == element.x) &&(game.player.heady == element.y)){
                    tailLength++;
                    setDashBoard();
                    element.setLocation(genRandom(1,xStep-1)*blockSize,genRandom(1,yStep-1)*blockSize);
                }
            });
        }
        checkCollision(game){//border + snake body
            // kiểm tra đụng border
            var gp = game.player
            if(gp.headx == 0 || gp.headx == (xStep-1)*blockSize || gp.heady == 0 || gp.heady == (yStep-1)*blockSize ){
                game.status=gameStatus.lose; //người chơi thua
            }
            // NOTE: kiểm tra cắn body
            
            //NOTE : kiểm tra đụng tường di động
        }
       
    }
    
    //* function hỗ trợ
    //tạo food
    function createFood(ammount){ //tạo food
        if(ammount ===1) {
            return [new Food(genRandom(1,xStep-1)*blockSize,genRandom(1,yStep-1)*blockSize)]
        }else{
            let em =[];
            for(let j = 0 ; j < ammount;j++){
                em.push(new Food(genRandom(1,xStep-1)*blockSize,genRandom(1,yStep-1)*blockSize));
            }
            return em;
        }
    }
    //function support cập nhật data
    function setDashBoard(){
        scoreNumber.innerHTML = tailLength;
    }
    // function clear game data
    function levelUp(game){
        this.tailLength =2 ;//đầu về đuôi
    }
    // hàm random giữa 2 giá trị max min
    function genRandom(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    const game = new Game(canvas.width,canvas.height);

    //luồng game
    function animate(){
        // kiểm tra trạng thái game
        switch(game.status){
            case gameStatus.lose:
                clearTimeout(timer);
                timer =0
                console.log("end game rồi baby :))))");
                break;
            case gameStatus.runing:
                
                break;
            case gameStatus.pause:
                clearTimeout(timer)
                timer =0
                console.log('ko clear');
                break;
            case gameStatus.win:
                break;
        } 
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.status = gameStatus.runing;
        game.createMap(ctx)
        game.drawFood(ctx);

        game.drawPlayer(ctx);
        game.update();
        game.checkFoodColision(game);
        game.checkCollision(game)
        let timer = setTimeout(animate,1000/maxSpeed) //set thời gian chờ call back này
        
        // if(scoreNumber.innerHTML ==10){
        //     console.log('ko');
        //     game.status = gameStatus.pause
        // }  
    }
    
    animate();
})
