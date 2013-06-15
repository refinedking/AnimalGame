/**
* Content: 打地鼠主js
* User: wangbing
* Date: 12-06-12
* CreateTime: p.m 16:50
* UpdateTime:
* UpdateContent:
*/

ig.module(
    'smallgame.hitmouse.hitmouse'
).requires(
    'impact.game',
    'smallgame.hitmouse.hitmousebutton',
    'game.levels.hitmouse'
).defines(function(){
    MyHitMouseGame = ig.Game.extend({
        //字体
        font:new ig.Font("media/font1.png"),
        LeavelTimer:null,
        // 出地鼠的区域以及地鼠信息
        areaArray:new Array(),
        // 出现地鼠的时间间隔随机
        randTimer:null,
        // 需要达到的任务数
        reachNum:0,
        // 已经完成的数量
        overNum:new Array(),
        // 地鼠数量标识
        mouseID:0,
        hitterpath1:new Image(),
        hitterpath2:new Image(),
        //hitterpath3:new Image(),
        hitterpath4:new Image(),
        timeProcess:new Image(),
        hitterTimer:new ig.Timer(),
        mouseAppearSound:new ig.Sound('media/sound/smallgame/mouseappear.mp3', false),
        init: function() {
            ig.input.bind(ig.KEY.MOUSE1,"click");
            // 随机区域
            this.areaArray.push([200,160,false,0],[425,160,false,0],[655,160,false,0],[298,340,false,0],[543,340,false,0]);
            // 随机生成地鼠的实体
            this.randTimer = new ig.Timer(Math.ceil(Math.random()*1 + 1));
            this.overNum[0] = 0;
            this.reachNum = Math.round(Math.random()*2 + 2);
            this.LeavelTimer = new ig.Timer(this.reachNum * 4);
            this.hitterTimer.set(0.1);
            this.hitterpath1.src = 'media/smallgame/hitmouse/hitter1.png';
            this.hitterpath2.src = 'media/smallgame/hitmouse/hitter2.png';
            //this.hitterpath3.src = 'media/smallgame/hitmouse/hitter3.png';
            this.hitterpath4.src = 'media/smallgame/hitmouse/hitter4.png';
            this.timeProcess.src = "media/smallgame/timeprocess.png";
            this.loadLevel(LevelHitmouse);
        },
        update: function() {
            //var posX = ig.input.mouse.x;
            //var posY = ig.input.mouse.y;
            //ig.game.spawnEntity(EntityMyHitter, posX, posY, {size:{x:100,y:100}});

            // TODO 需要改进的随机效果
            if(this.randTimer.delta() > 0) // && this.mouseNum == 0)
            {
                var areaRand = Math.ceil(Math.random()*5 - 1);
                if(!this.areaArray[areaRand][2])
                {
                    this.areaArray[areaRand][2] = true;
                    this.spawButton(areaRand,this.areaArray[areaRand][0],this.areaArray[areaRand][1],100,100,"media/smallgame/hitmouse/mouse.png",this.overNum,this.areaArray);
                    this.mouseAppearSound.play();
                }
                this.randTimer.set(Math.ceil(Math.random()*1));
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

//            // TODO 需要调整动物的完成动画过程
//            this.Mouse = ig.game.getEntitiesByType(Button)[0];
//
//            if(this.MouseTimer.delta() <= 0 && !this.Direct)
//            {
//                this.Top += 3;
//                if(this.Top >= 100)
//                {
//                    this.Direct = true;
//                }
//                this.Mouse.pos.y = this.Top;
//                this.MouseTimer.reset();
//            }
//            else if(this.MouseTimer.delta() <=0 && this.Direct)
//            {
//                this.Top -= 3;
//                if(this.Top <=0)
//                {
//                    this.Direct = false;
//                }
//                this.Mouse.pos.y = this.Top;
//                this.MouseTimer.reset();
//            }
            this.parent();
        },
        draw: function() {
            this.parent();
            ig.system.context.drawImage(this.timeProcess,0,0,179,25,286,17,179-((this.reachNum * 4 + this.LeavelTimer.delta())*(179/(this.reachNum * 4))),25);
            this.font.draw(-Math.floor(this.LeavelTimer.delta()),450,20);
            this.font.draw(this.overNum[0],820,20);
            this.font.draw("/",835,20);
            this.font.draw(this.reachNum,850,20);
            //ig.system.context.drawImage(this.path,ig.input.mouse.x - 81,ig.input.mouse.y - 64);
            if(ig.input.state("click"))
            {
                ig.system.context.drawImage(this.hitterpath2,ig.input.mouse.x - 81,ig.input.mouse.y - 64);
                ig.system.context.drawImage(this.hitterpath4,ig.input.mouse.x - 81,ig.input.mouse.y - 64);
                this.hitterTimer.reset();
            }
            else if(this.hitterTimer.delta() > 0)
            {
                ig.system.context.drawImage(this.hitterpath1,ig.input.mouse.x - 81,ig.input.mouse.y - 64);
            }
        },
        run:function () {
            this.update();
            this.draw();
        },
        //绘制动物按钮
        spawButton:function(animalID,posX,posY,width,height,animPath,overnum,areaarray) {
            ig.game.spawnEntity(HitMouseButton, posX, posY, {
                size:{ x:width, y:height },
                state:"active",
                animSheet:new ig.AnimationSheet(animPath, width, height),
                areaArray:areaarray,
                animalID:animalID,
                overNum:overnum,
                mouseHitSound:new ig.Sound('media/sound/smallgame/mousehit.mp3', false),
//                update:function(){
//                    for(var i=0; i < areaarray.length;i++)
//                    {
//                        if(areaarray[i][2] && typeof areaarray[i][3] == "number")
//                        {
//                            areaarray[i][3] = new ig.Timer(2);
//                        }
//                        else if(areaarray[i][2] && typeof areaarray[i][3] == "object")
//                        {
//                            areaarray[i][3].delta();
//
//                            if(areaarray[i][3].delta() > 0)
//                            {
//                                ig.game.removeEntity(this);
//                                areaarray[i][3] = 0
//                                areaarray[i][2] = false;
//                            }
//                        }
//                    }
//
//                    if(ig.input.pressed('click') &&
//                        ig.input.mouse.x > posX &&
//                        ig.input.mouse.x < (posX + width) &&
//                        ig.input.mouse.y > posY &&
//                        ig.input.mouse.y < (posY + height))
//                    {
//                        this.pressedDown();
//                    }
//                },
//                pressedUp:function () {
//                },
                //按下的方法
                pressedDown:function () {
                    this.mouseHitSound.play();
                    ig.game.removeEntity(this);
                    overnum[0]++;
                    // TODO 多个老鼠
                    areaarray[animalID][2] = false;
                }//,
                //backgroundChange:function(){
                //}
            });
        }
    });
});