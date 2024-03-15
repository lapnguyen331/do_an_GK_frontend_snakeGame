const blockSize= 32; // khối block -> kích thước part của rắn và map
const gameWidth='1200'; 
const gameHeight ='600';
/*
* giá trị map = 0;
*giá trị của rắn =1
*giá trị của food = 2
* giá trị tường  = -1
-------size obj
-food 32px 32px
-blockSize = 32
-------qui định game play
-trái :a
-phải:d
-trên:w
-dưới:s
*/

window.addEventListener("load",function(){ 
    this.speedY = 0; //di chuyển dọc
    this.speedX =0; //di chuyển ngang
    this.maxSpeed = 3; //tốc độ di chuyển
    this.foodAmmount = 100;
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
                if(this.speedX == -maxSpeed) return;//đang đi trái
                this.speedX = -this.maxSpeed;
                this.speedY=0;
                console.log("1"+ this.speedX);
                
                break;
            case 'd':
                if(this.speedX == maxSpeed) return;//đang đi phải
                this.speedX =this.maxSpeed
                this.speedY =0;
                console.log("2");

                break;  
             case 'w':
                if(this.speedY == -maxSpeed) return;//đang đi lên
                this.speedY = -this.maxSpeed;
                this.speedX=0;
                console.log("3");
                break;
            case 's':
                if(this.speedY == maxSpeed) return; //đang đi xuống
                this.speedY =maxSpeed;
                this.speedX =0;
                console.log("4");
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
            console.log("food");
        }

    }
    class BodyPart{
        constructor(x,y,bool){
            this.x=x;
            this.y=y;
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
            this.headx =20;
            this.heady =100;
            this.body =[];
            this.tailLength =2; //gồm đầu và đuôi
            //tốc độ 
            
        }
        //update sau khi press key
        update(){
            this.heady += speedY;
            this.headx += speedX;
        };
        // vẽ player
        draw(context){
            context.fillStyle = "black";
            if(this.body.length != 0){
                for(let i =0 ; i < this.body.length ; i++){
                    let part = this.body[i];
                    context.fillRect(part.x * blockSize,part.y*blockSize,blockSize,blockSize);
                }
            }
            this.body.push(new BodyPart(this.headx,this.heady-1,false)) //thêm part vào trong danh sách
            if(this.body.length > this.tailLength){
                this.body.shift();// xóa nếu dài hơn tổng chiều dài
            }
            context.fillRect(this.headx,this.heady,blockSize,blockSize);

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
            this.padding=blockSize;
            this.mapWidth = width;
            this.mapHeight=height;
            this.currentMap =  new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0));
            this.landedMap = new Array(this.boardHeight).fill(0).map(() => new Array(this.boardWidth).fill(0));

            this.player= new Player(this);
            this.inputHandle = new InputHandle(this);
            this.food = createFood(foodAmmount); // danh sách thức ăn
        }
        //update UI game
        update(){
            // this.player.speedX = 0;
            // this.player.speedY=0;
            
            this.player.update();
        }
        //vẽ game
        draw(context){
            // this.drawMap();
            this.player.draw(context)
        }
        drawFood(context){
            for(let i = 0; i < this.food.length; i++){
                this.food[i].draw(context);
            }
        }
        // vẽ map
        // drawMap(){
        //     // this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        //     this.ctx.lineWidth = 2;
        //     this.ctx.rect(0,0,blockSize*this.mapWidth,blockSize*this.mapHeight) //
        //     this.ctx.stroke();
        //     //lặp qua các phần tử và vẽ các block tại đúng vị trí
        //     for (let i = 0; i < this.mapHeight; i++) {
        //         for (let j = 0; j < this.mapWidth; j++) {
        //         if (this.currentMap[i][j] > 0) {
        //             this.ctx.fillStyle = 'rgb(0, 0, 0)'
        //         } else {
        //             this.ctx.fillStyle = 'rgb(248, 248, 248)'
        //         }
        //         this.ctx.fillRect(padding*2+j*(blockSize+padding), padding*2+(i-3)*(blockSize+padding), blockSize, blockSize)
        //         }
        //     }
        //     // viết ra các đoạn số 
        //     /* Viết ra các đoạn text */
        //     this.ctx.fillStyle = 'rgb(0, 0, 0)'
        //     this.ctx.font = '28px';
        //     this.ctx.fillText('TIẾP THEO:', 300, 28)
        //     this.ctx.fillText('ĐIỂM SỐ:', 300, 200)
        //     this.ctx.fillText(this.score.toString(), 300, 230)
        //     console.log("hehe");
        // }

    }
    
    const game = new Game(canvas.width,canvas.height);
    // function hỗ trợ
    function createFood(ammount){
        if(ammount ===1) {
            return [new Food(genRandom(10,gameWidth-20),genRandom(10,gameHeight-20))]
        }else{
            let em =[];
            for(let j = 0 ; j < ammount;j++){
                em.push(new Food(genRandom(10,gameWidth-20),genRandom(10,gameHeight-20)));
            }
            console.log(em);
            return em;
        }
    }
    function genRandom(min, max){
        return Math.floor(Math.random() * (max - min)) + min;
    }
    //luồng game
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
        game.update();
        game.drawFood(ctx);
        game.draw(ctx);
        // game.player.update()
        requestAnimationFrame(animate);
    }
    animate();
    // game.drawMap();
   

})
