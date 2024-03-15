const blockSize= 30; // khối block -> kích thước part của rắn và map
const gameWidth=1200; //40 khối theo chiều ngang
const gameHeight =600;//20 khối theo chiều dọc
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
    this.maxSpeed = 1; //tốc độ di chuyển
    this.foodAmmount = 10;
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
                if(this.moveX == -maxSpeed) return;//đang đi trái
                this.moveX = -this.maxSpeed;
                this.moveY=0;
                break;
            case 'd':
                if(this.moveX == maxSpeed) return;//đang đi phải
                this.moveX =this.maxSpeed
                this.moveY =0;

                break;  
             case 'w':
                if(this.moveY == -maxSpeed) return;//đang đi lên
                this.moveY = -this.maxSpeed;
                this.moveX=0;
                break;
            case 's':
                if(this.moveY == maxSpeed) return; //đang đi xuống
                this.moveY =maxSpeed;
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
            this.headx =20*blockSize;
            this.heady =100;
            this.body =[];
            this.body.push(new BodyPart(this.headx -blockSize,this.heady,blockSize,blockSize,2,true)) //đuôi
            this.tailLength =2; //gồm đầu và đuôi
            //tốc độ 
            
        }
        //update sau khi press key
        update(){
            this.heady += moveY;
            this.headx += moveX;
        };
        // vẽ player
        draw(context){
            context.fillStyle = "green";
            context.fillRect(this.headx,this.heady,blockSize,blockSize);
            // context.fillStyle='orange'
            // if(this.body.length != 0){
            //     for(let i =1 ; i < this.body.length ; i++){
            //         let part = this.body[i];
            //         context.fillRect(part.x,part.y,blockSize,blockSize);
            //         // console.log("thân");
            //     }
            // }
            // this.body.push(new BodyPart(this.headx +(this.tailLength-1*blockSize),this.heady,false)) //thêm part vào trong danh sách
            // this.tailLength++;
            // if(this.body.length > this.tailLength){
            //     this.body.shift();// xóa nếu dài hơn tổng chiều dài
            // }
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
            this.player.draw(context)
        }
        drawFood(context){
            for(let i = 0; i < this.food.length; i++){
                this.food[i].draw(context);
            }
        }
        drawMap(context){
            this.drawBorder(context);

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
            for(let k =0 ; k <yBorderAmmount ; k++){
                context.strokeRect(0,x,blockSize,blockSize) //border trái
                context.strokeRect(gameWidth - blockSize,x,blockSize,blockSize) //border phải

                context.fillRect(0,x,blockSize,blockSize) //border trái
                context.fillRect(gameWidth-blockSize,x,gameHeight - blockSize,blockSize,blockSize) //border phải
                x += blockSize;
            }
        }
        checkFoodColision(game){
            // console.log(game.food);
            game.food.forEach(element => {
                if((game.player.headx == element.x) &&(game.player.heady == element.y)){
                    // this.tailLength++;
                    console.log('ăn');

                    console.log(this.tailLength);
                }
            });
            // console.log(tailLength);
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
    function createFood(ammount){ //tạo food
        if(ammount ===1) {
            return [new Food(genRandom(10,gameWidth-20),genRandom(10,gameHeight-20))]
        }else{
            let em =[];
            for(let j = 0 ; j < ammount;j++){
                em.push(new Food(genRandom(10,gameWidth-20),genRandom(10,gameHeight-20)));
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
        game.drawMap(ctx)
        game.drawFood(ctx);

        game.drawPlayer(ctx);
        game.update();
        game.checkFoodColision(game);

        // game.player.update()
        requestAnimationFrame(animate);
    }
    animate();
    // game.drawMap();
   

})
