/**
 * Content: 找茬猫主js
 * User: wangbing
 * Date: 12-06-14
 * CreateTime: p.m 14:45
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    'smallgame.zhaocha.zhaocha'
).requires(
    'impact.game',
    'impact.button',
    'game.levels.zhaochacat'
).defines(function(){
        MyZhaochaGame = ig.Game.extend({
            //字体
            font:new ig.Font("media/font1.png"),
            // 出不同猫的区域以及猫信息
            areaArray:new Array(),
            overNum:new Array(),
            // 动画集合
            animalArray:new Array(),
            isGenerate:false,
            generateArray:new Array(),
            LeavelArray:new Array(),
            reachNum:new Array(),
            timeProcess:new Image(),
            init: function() {
                ig.input.bind(ig.KEY.MOUSE1,"click");
                this.LeavelTimer = new ig.Timer(10);
                // 随机区域
                this.overNum[0] = 0;
                this.reachNum[0] = 0;
                this.areaArray.push([116,166,false],[281,166,false],[445,94,false],
                                    [196,355,false],[390,301,false],[550,276,false],
                                    [715,203,false],[358,454,false],[572,451,false]
                );
                this.timeProcess.src = "media/smallgame/timeprocess.png";
                this.animalArray.push("media/smallgame/zhaochacat/cat1.png","media/smallgame/zhaochacat/cat2.png","media/smallgame/zhaochacat/cat3.png","media/smallgame/zhaochacat/cat4.png","media/smallgame/zhaochacat/cat5.png");
                this.loadLevel(LevelZhaochacat);
            },
            update: function() {
                if(!this.isGenerate)
                {
                    var areaRand;
                    var flag;

                    for(var i = 0; i < this.areaArray.length; i++)
                    {
                        flag = false;
                        areaRand = Math.ceil(Math.random()*9 - 1);
                        for(var j = 0; j < this.generateArray.length; j++)
                        {
                            if(this.generateArray[j] == areaRand)
                            {
                                flag = true;
                                i--;
                            }
                        }
                        if(!flag)
                        {
                            this.generateArray.push(areaRand);
                            flag = false;
                        }
                    }

                    for(var i = 0; i < this.areaArray.length; i++)
                    {
                        if(i == 0)
                        {
                            animalRand = Math.ceil(Math.random()*5 - 1);
                            var mark = this.generateArray[0];
                            this.spawButton(1,this.areaArray[mark][0],this.areaArray[mark][1],140,140,this.animalArray[animalRand],this.overNum,this.reachNum);//
                            this.animalArray.splice(animalRand,1);
                            this.areaArray[mark][2] = true;
                        }
                        else if(i % 2 == 0)
                        {
                            animalRand = Math.ceil(Math.random()*(5 - i/2) - 1);
                            mark = this.generateArray[i-1];
                            var mark1 = this.generateArray[i];
                            this.spawButton(i+1,this.areaArray[mark][0],this.areaArray[mark][1],140,140,this.animalArray[animalRand],this.overNum,this.reachNum);//
                            this.spawButton(i+1,this.areaArray[mark1][0],this.areaArray[mark1][1],140,140,this.animalArray[animalRand],this.overNum,this.reachNum);//
                            this.animalArray.splice(animalRand,1);
                            this.areaArray[mark][2] = true;
                            this.areaArray[mark1][2] = true;
                        }
                    }

                    this.isGenerate = true;
                }

                // 如果时间或者完成任务
                if(Math.floor(this.LeavelTimer.delta()) >= 0 || this.reachNum[0] == 3)
                {
                    MyGame.smallgame = 1;
                    MyGame.isInit=false;
                    ig.system.setGame(MyGame);
                }

                if(this.overNum[0] == 1)
                {
                    MyGame.smallgame = 2;
                    MyGame.isInit=false;
                    ig.system.setGame(MyGame);
                }

                this.parent();
            },
            draw: function() {
                this.parent();
                ig.system.context.drawImage(this.timeProcess,0,0,179,25,286,17,179-((10+this.LeavelTimer.delta())*18),25);
                this.font.draw((-Math.floor(this.LeavelTimer.delta())),450,20);    // (-Math.floor(this.LeavelTimer.delta())>9?(-Math.floor(this.LeavelTimer.delta())):"0"+(-Math.floor(this.LeavelTimer.delta())))
                this.font.draw(this.reachNum[0],820,25);
                this.font.draw("/",835,25);
                this.font.draw("3",850,25);
            },
            run:function () {
                this.update();
                this.draw();
            },
            //绘制动物按钮
            spawButton:function(animalID,posX,posY,width,height,animPath,overnum,reachnum) {//
                ig.game.spawnEntity(Button, posX, posY, {
                    size:{ x:width, y:height },
                    animSheet:new ig.AnimationSheet(animPath, width, height),
                    catrightSound:new ig.Sound('media/sound/smallgame/catright.mp3', false),
                    caterrorSound:new ig.Sound('media/sound/smallgame/carerror.mp3', false),
                    pressedUp:function () {
                    },
                    pressedDown:function () {
                        if(animalID == 1)
                        {
                            this.catrightSound.play();
                            ig.game.removeEntity(this);
                            overnum[0] = 1;
                        }
                        else
                        {
                            this.caterrorSound.play();
                            reachnum[0]++;
                        }
                    },
                    backgroundChange:function(){
                    }
                });
            }
        });
    });