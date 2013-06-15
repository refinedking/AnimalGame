/**
 * Content: 吃骨头主js
 * User: wangbing
 * Date: 12-06-18
 * CreateTime: a.m 10:50
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    'smallgame.eatbone.eatbone'
).requires(
    'impact.game',
    'impact.button',
    'game.levels.eatbone',
    'game.entities.smallGameDog',
    'smallgame.eatbone.bone'
).defines(function(){
    MyEatBoneGame = ig.Game.extend({
        // 字体
        font:new ig.Font("media/font1.png"),
        // 拜访狗狗区域
        areaArray: new Array(),
        overNum:new Array(),
        isGenerate:false,
        animals:null,
        //冲锋间隔时间
        interval:5,
        //间隔时间类
        intervalTime:null,
        // 需要达到的任务数
        reachNum:0,
        //跑道之间间隔距离
        routeInterval:50,
        //跑道高度
        routeHeight:80,
        //顶部距离
        peakLength:110,
        timeProcess:new Image(),
        bonebornSound:new ig.Sound('media/sound/smallgame/boneborn.mp3', false),
        init: function() {
            ig.input.bind(ig.KEY.MOUSE1,"click");

            this.intervalTime=new ig.Timer(1);
            this.overNum[0] = 0;
            this.reachNum = Math.round(Math.random()*2 + 2);
            this.LeavelTimer = new ig.Timer(this.reachNum * 3);
            this.areaArray.push([220,110,false],[149,220,false],[78,330,true],[7,440,false]);
            this.timeProcess.src = "media/smallgame/timeprocess.png";
            this.loadLevel(LevelEatbone);
        },
        update: function() {
            var dog = ig.game.getEntitiesByType(EntitySmallGameDog)[0];
            this.overNum[0] = dog.overnum;

            this.generateDogPos();
            if(!this.isGenerate)
            {
                this.generateBone();
                this.isGenerate = true;
            }

            //一个间隔时间结束
            if(Math.floor(this.intervalTime.delta())==0){
                var animal=this.animals.shift();
                if(animal!=undefined){
                    var animalPosX=ig.game.screen.x+ig.system.width;
                    var animalPosY=this.peakLength+(animal.route-1)*this.routeHeight+(animal.route-1)*this.routeInterval;
                    this.bonebornSound.play();
                    ig.game.spawnEntity(EntityBone,animalPosX,animalPosY,{
                        flip:false
                    });
                }
                this.intervalTime.reset();
            }

            // 如果时间或者完成任务
            if(Math.floor(this.LeavelTimer.delta()) >= 0)
            {
                MyGame.smallgame = 1;
                MyGame.isInit=false;
                ig.system.setGame(MyGame);
            }

            if(this.overNum[0] >= this.reachNum)
            {
                MyGame.smallgame = 2;
                MyGame.isInit=false;
                ig.system.setGame(MyGame);
            }

            this.parent();
        },
        draw: function() {
            this.parent();
            ig.system.context.drawImage(this.timeProcess,0,0,179,25,286,17,179-((this.reachNum * 3+this.LeavelTimer.delta())*(179/(this.reachNum * 3))),25);
            this.font.draw((-Math.floor(this.LeavelTimer.delta())),450,20);
            this.font.draw(this.overNum[0],820,25);
            this.font.draw("/",835,25);
            this.font.draw(this.reachNum,850,25);
        },
        run:function () {
            this.update();
            this.draw();
        },
        //确定动物摆放的位置
        generateDogPos:function(){
            var dog = ig.game.getEntitiesByType(EntitySmallGameDog)[0];
            var j;
            if(typeof dog == "object")
            {
                for(j =0 ; j <this.areaArray.length;j++)
                {
                    if(//ig.input.mouse.x > this.areaArray[j][0] &&
                        //ig.input.mouse.x < (this.areaArray[j][0] + 100) &&
                        ig.input.mouse.y > this.areaArray[j][1] &&
                        ig.input.mouse.y < (this.areaArray[j][1] + 100)) {
                        dog.pos.x = this.areaArray[j][0];
                        dog.pos.y = this.areaArray[j][1];
                        return true;
                    }
                }
                //this.overNum[0] = dog.overnum;
            }
        },
        generateBone:function(){
            //产生随机的动物数及动物的排序
            var randomGenerate=new RandomGenerate(10,20,1,4,[{id:7,rate:100}]);
            //生成动物
            randomGenerate.generate();
            ig.log("生成动物数:"+randomGenerate.count);
            this.animals=randomGenerate.animals;
        }
    });
});