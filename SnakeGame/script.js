const blockSize= 30; // khối block -> kích thước part của rắn và map
const gameWidth=1200; //40 khối theo chiều ngang
const gameHeight =600;//20 khối theo chiều dọc
const xStep = gameWidth/blockSize;
const yStep = gameHeight/blockSize;
this.maxSpeed = 10; //tốc độ di chuyển theo k số block
this.foodAmmount = 10;
var tailLength =1; //gồm đầu, chiều dài rắn


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
            this.x = x;
            this.y = y;
        }
        draw(context){
            context.fillStyle = "red";
            context.fillRect(this.x,this.y,blockSize,blockSize);
        }
        setLocation(newX,newY){
            this.x=newX;
            this.y= newY;
        }

    }
    class BodyPart{
        constructor(x,y,index,bool){
            this.x=x;
            this.y=y;
            this.index = index; 
            // if(bool){
            //     console.log('đuôi');
            //     this.url=null;
            // }
            // else{
            //     console.log('ko đuôi');
            //     this.url=null;
            // }
        }
        
    }
    

    //người chơi 'snake'
    class Player{
        constructor(game){
            this.game = game;
            this.headx =5*blockSize;//startgame
            this.heady =5*blockSize;//startgame
            this.body =[];
            this.body.push(new BodyPart(this.headx -blockSize,this.heady,blockSize,blockSize,1,true)) //tính đầu là 0 nên đánh số từ 1
            this.body.push(new BodyPart(this.headx -(this.tailLength)*blockSize,this.heady,this.tailLength +1,false)) //thêm thân part vào trong danh sách
            this.tailLength++; //gồm đầu và đuôi

            //tốc độ 
            
        }
        //update sau khi press key
        update(){
            this.heady += moveY;
            this.headx += moveX;
        };
        // vẽ player
        drawSnake(context){
            context.fillStyle = "green";//đầu
            context.fillRect(this.headx,this.heady,blockSize,blockSize);
            this.drawBody(context)
        }
        drawBody(context){
            context.fillStyle='orange'; //thân
            if(this.body.length != 0){
                for(let i =1; i < this.body.length ; i++){
                    let part = this.body[i];
                    context.fillRect(this.headx +i*blockSize,this.heady + i*blockSize,blockSize,blockSize);
                    // console.log("thân");
                }
            }
            if(this.body.length > this.tailLength){
                this.body.shift();// xóa nếu dài hơn tổng chiều dài
            }
            console.log(this.body);

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
            context.strokeStyle ='red';
            context.lineWidth = 2; //độ dày viền

            for(let i =1; i< xStep-1;i++){
                // context.strokeRect(i*blockSize,0,blockSize,blockSize) //theo xAsis
                for(let j =1 ; j< yStep-1; j++){
                    context.strokeRect(i*blockSize,j*blockSize,blockSize,blockSize) //theo yAsis
                }
            }
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
                    element.setLocation(genRandom(1,xStep-1)*blockSize,genRandom(1,yStep-1)*blockSize);
                    console.log(tailLength);
                }
            });
        }
       

    }
    
    const game = new Game(canvas.width,canvas.height);
    // function hỗ trợ
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

    function genRandom(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //luồng game
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        game.createMap(ctx)
        game.drawFood(ctx);

        game.drawPlayer(ctx);
        // setTimeout(1000/maxSpeed)
        game.update();
        game.checkFoodColision(game);

        // game.player.update()
        setTimeout(animate,1000/maxSpeed);
    }
    animate();
    // game.drawMap();
   

})
