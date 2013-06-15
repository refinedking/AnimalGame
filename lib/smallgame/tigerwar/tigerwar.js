/**
 * Content: 打地鼠主js
 * User: wangbing
 * Date: 12-06-12
 * CreateTime: p.m 16:50
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    'smallgame.tigerwar.tigerwar'
).requires(
    'impact.game',
    'impact.button',
    'game.levels.tigerwar',
    'game.entities.smallGameEle1',
    'game.entities.smallGameEle2',
    'game.entities.smallGameFight'
).defines(function(){
        MyTigerWarGame = ig.Game.extend({
            //字体
            font:new ig.Font("media/font1.png"),
            // 需要达到的任务数
            reachNum:0,
            // 已经完成的数量
            overNum:new Array(),
            flag:false,
            timeProcess:new Image(),
            backProcess:new Image(),
            //shanpin:false,
            //Isleft:true,
            isFightOK:false,
            dieTimer: new ig.Timer(3),
            isDie:false,
            init: function() {
                MyTigerWarGame.collideEnemyInfo=[];

                ig.input.bind(ig.KEY.MOUSE1,"click");
                this.overNum[0] = 0;
                this.reachNum = Math.round(Math.random()*25 + 25);
                this.LeavelTimer = new ig.Timer(this.reachNum);
                this.timeProcess.src = "media/smallgame/timeprocess.png";
                this.backProcess.src = "media/smallgame/tigerwar/touming.png";
                this.loadLevel(LevelTigerwar);
            },
            update: function() {
                // TODO 线条效果
                //this.drawLine();

                this.CheckPos();
                ig.log(this.dieTimer.target);

                // 如果时间或者完成任务
                if(Math.floor(this.LeavelTimer.delta()) >= 0)
                {
                    if(!this.isDie)
                    {
                        this.dieTimer.reset();
                        ig.game.getEntitiesByType(EntitySmallGameFight)[0].isDie = true;
                        this.isDie = true;
                    }
                    if(this.dieTimer.delta() >= 0)
                    {
                        MyGame.smallgame = 1;
                        MyGame.isInit=false;
                        ig.system.setGame(MyGame);
                    }
                    else
                    {
                        ig.game.getEntitiesByType(EntitySmallGameEle1)[0].isDie = true;
                        ig.game.getEntitiesByType(EntitySmallGameEle2)[0].isOver = true;
                    }
                }

                if(this.overNum[0] >= this.reachNum)
                {
                    if(!this.isDie)
                    {
                        this.dieTimer.reset();
                        ig.game.getEntitiesByType(EntitySmallGameFight)[0].isDie = true;
                        this.isDie = true;
                    }
                    if(this.dieTimer.delta() >= 0)
                    {
                        MyGame.smallgame = 2;
                        MyGame.isInit=false;
                        ig.system.setGame(MyGame);
                    }
                    else
                    {
                        ig.game.getEntitiesByType(EntitySmallGameEle2)[0].isDie = true;
                        ig.game.getEntitiesByType(EntitySmallGameEle1)[0].isOver = true;
                    }
                }

                // 判断打斗动画是否开始
                if(ig.game.getEntitiesByType(EntitySmallGameEle1)[0].isFight && !this.isFightOK && !ig.game.getEntitiesByType(EntitySmallGameEle2)[0].isDie)
                {
                    ig.game.spawnEntity(EntitySmallGameFight,400,340,{
                       flip:false
                    });
                    this.isFightOK = true;
                }

                // 闪屏动画时延
                //this.shanpin = Math.random() > 0.5 ? true:false;
                this.parent();
            },
            draw: function() {
                this.parent();
                ig.system.context.drawImage(this.timeProcess,0,0,179,25,286,17,179-((this.reachNum + this.LeavelTimer.delta())*(179/this.reachNum)),25);
                this.font.draw((-Math.floor(this.LeavelTimer.delta())),450,20);
                this.font.draw(this.overNum[0],820,25);
                this.font.draw("/",855,25);
                this.font.draw(this.reachNum,870,25);
//                if(this.shanpin)
//                {
//                    ig.system.context.drawImage(this.backProcess,0,0);
//                }
            },
            run:function () {
                this.update();
                this.draw();
            },
            //确定动物摆放的位置
            CheckPos:function(){
                var ele = ig.game.getEntitiesByType(EntitySmallGameFight)[0];
                if(typeof ele == "object")
                {
                    if(ig.input.mouse.x > ele.pos.x &&
                        ig.input.mouse.x < (ele.pos.x + 150) &&
                        ig.input.mouse.y > ele.pos.y &&
                        ig.input.mouse.y < (ele.pos.y + 150) && !this.flag) {
                        this.flag = true;
                        this.overNum[0]++;

                        if(ig.input.mouse.x < ele.pos.x)
                        {
                            this.Isleft = true;
                        }
                        else if(ig.input.mouse.x > (ele.pos.x + 150))
                        {
                            this.Isleft = false;
                        }
                        //this.Attack(this.Isleft,ele.pos.x, ele.pos.y);
                        //ig.show("isleft",this.Isleft);
                    }

                    if(ig.input.mouse.x < ele.pos.x ||
                        ig.input.mouse.x > (ele.pos.x + 150) ||
                        ig.input.mouse.y < ele.pos.y ||
                        ig.input.mouse.y > (ele.pos.y + 150)) {
                        this.flag = false;
                        //ig.game.removeEntity(EntityZhuaHen);
                    }
                }
            }//,
//            drawLine:function(){
//                ig.system.context.fillStyle = "#3D3D3D";
//                ig.system.context.beginPath();
//                ig.system.context.moveTo(ig.input.mouse.x, ig.input.mouse.y);
//                ig.system.context.lineTo(ig.input.mouse.x, ig.input.mouse.y);
//                ig.system.context.closePath();
//                ig.system.context.fill();
//            },
//            Attack:function(isleft,x,y){
//                ig.game.spawnEntity(EntityZhuaHen,x,y,{
//                    flip:false
//                });
//                var zhuahen = ig.game.getEntitiesByType(EntityZhuaHen)[0];
//                if(isleft)
//                {
//                    zhuahen.currentAnim=this.anims["left"];
//                }
//                else
//                {
//                    zhuahen.currentAnim=this.anims["right"];
//                }
//            }
        });
    });