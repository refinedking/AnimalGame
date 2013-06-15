ig.module( 
	'game.main'
)
.requires(
    'interface.animal',

    'game.entities.enemyCat',
    'game.entities.enemyDog',
    'game.entities.enemyElephant',
    'game.entities.enemyLion',
    'game.entities.enemyMouse',
    'game.entities.enemyTiger',

    'game.entities.myCat',
    'game.entities.myDog',
    'game.entities.myElephant',
    'game.entities.myLion',
    'game.entities.myMouse',
    'game.entities.myTiger',
    'game.entities.downCoin',
    'game.entities.cow',


    'plugins.randomGenerate',
    'plugins.timerControl',
    'plugins.gameState',
    'plugins.impact-splash-loader',
    'plugins.ajaxRequest',

	'impact.game',
	'impact.font',
    'impact.storage',
    'impact.button',
    'impact.debug.debug',
//    'impact.json',

    //'game.levels.test' ,
    'game.levels.test1',
    'smallgame.hitmouse.hitmouse',
    'smallgame.zhaocha.zhaocha',
    'smallgame.eatbone.eatbone',
    'smallgame.tigerwar.tigerwar',
    'smallgame.eatbone.bone'
).defines(function(){
    MyGame = ig.Game.extend({
        //冲锋间隔时间
        interval:5,
        //间隔时间类
        intervalTime:null,
        //动物按钮集合
        animalButtons:[],
        //老鼠按钮动画
        animSheetMouseButton:new ig.AnimationSheet("media/mouse_button.png",100,100),
        //猫按钮动画
        animSheetCatButton:new ig.AnimationSheet("media/cat_button.png",100,100),
        //狗按钮动画
        animSheetDogButton:new ig.AnimationSheet("media/dog_button.png",100,100),
        //老虎按钮动画
        animSheetTigerButton:new ig.AnimationSheet("media/tiger_button.png",100,100),
        //狮子按钮动画
        animSheetLionButton:new ig.AnimationSheet("media/lion_button.png",100,100),
        //大象按钮动画
        animSheetElephantButton:new ig.AnimationSheet("media/elephant_button.png",100,100),
        //跑道之间间隔距离
        routeInterval:13,
        //跑道高度
        routeHeight:100,
        //顶部距离
        peakLength:170,
        //竖排之间的间距
        verticalInterval:15,
        //竖排宽度
        verticalWidth:100,
        //竖排初始化走边距离
        verticalLength:50,
        //随机产生的动物的最小值
        minRandomAnimals:10,
        //随机产生的动物的最大值
        maxRandomAnimals:32,
        //随机产生的道次的最小值
        minRandomRoute:1,
        //随机产生的道次的最大值
        maxRandomRoute:2,
        //产生金币的最小竖排
        minCoinVertical:1,
        //产生金币的最大竖排
        maxCoinVertical:6,
        //下落的金币宽度
        downCoinWidth:32,
        //动物打斗动画原型
        fightAnimSheet:new ig.AnimationSheet("media/animalFight.png",150,150),
        //飘金币动画原型
        rotateAnimSheet:new ig.AnimationSheet("media/rotateCoin.png",64,64),
        //打斗动画循环播放次数
        fightAnimLoopCount:2,
        //飘金币动画循环次数
        rotateAnimLoopCount:2,
        //背景音乐
        bgSound1:new ig.Sound('media/sound/bgSound1.mp3', false),
        bgSound2:new ig.Sound('media/sound/bgSound2.mp3', false),
        bgSound3:new ig.Sound('media/sound/bgSound3.mp3', false),
        bgSound4:new ig.Sound('media/sound/bgSound4.mp3', false),
        challengeBgSound:new ig.Sound('media/sound/bgSound4.mp3', false),
        //动物叫声
        catSound:new ig.Sound('media/sound/cat.mp3', false),
        dogSound:new ig.Sound('media/sound/dog.mp3', false),
        mouseSound:new ig.Sound('media/sound/mouse.mp3', false),
        tigerSound:new ig.Sound('media/sound/tiger.mp3', false),
        lionSound:new ig.Sound('media/sound/lion.mp3', false),
        elephantSound:new ig.Sound('media/sound/challengeBgSound.mp3', false),
        //ajax请求类
        ajaxRequest:null,
        //金币下落时间类
        coinDownTimer:null,
        //金币下落时间间隔
        coinDownTime:10,
        //目标金币图片
        targetCoinImg:new ig.Image("media/targetCoin.png"),
        //提供牛群冲击次数
        cowsCount:1,
        //牛群冲击间隔时间(秒)
        cowsIntervalTime:10,
        //大象按钮动画
        ntButton:new ig.AnimationSheet("media/ntd.png",60,60),
        init: function() {
            //正常模式随机产生背景音乐
            if(!isChallenge){
                var bgSound=null;
                var soundIndex=Math.floor(Math.random()*4)+1;
                switch(soundIndex){
                    case 1:
                        bgSound=this.bgSound1;
                        break;
                    case 2:
                        bgSound=this.bgSound2;
                        break;
                    case 3:
                        bgSound=this.bgSound3;
                        break;
                    case 4:
                        bgSound=this.bgSound4;
                        break;
                }
                ig.music.add(bgSound);
                ig.music.play();
            }
            //挑战模式添加特定背景音乐
            else{
                ig.music.add(this.challengeBgSound);
                ig.music.play();
            }
            //加载关卡
            this.loadLevel(LevelTest1);
            ig.input.bind(ig.KEY.MOUSE1,"click");
            this.intervalTime=new ig.Timer(this.interval);
            //重新开始一个回合
            if(MyGame.isInit){
                //重新生成动物
                this.generateAnimal();
                gameState.setRoundCount(roundCount);
                //存储游戏用户状态
                gameState.setRoundRemainAnimals(animals);
               // MyGame.smallgame=0;
            }
            //继续游戏
            else{
                //第一次运行生成动物
                if(!gameState.isExistRoundRemainAnimals()){
                    this.generateAnimal();
                }
                //继续上一回合
                else{
                    //读取本地存储的动物数组
                    animals=gameState.getRoundRemainAnimals();
                }
                //读取本地存储中的屏幕上的动物
                if(gameState.isExistExistMyAnimals()){
                    existMyAnimals=gameState.getExistMyAnimals();
                }
                if(gameState.isExistExistEnemyAnimals()){
                    existEnemyAnimals=gameState.getExistEnemyAnimals();
                }
                //读取本地存储中的屏幕上的金币
                if(gameState.isExistDownCoins()){
                    existDownCoins=gameState.getExistDownCoins();
                }
                //存储中的动物数组为空
                if(animals.length==0&&existEnemyAnimals.length==0){
                    this.generateAnimal();
                }
                //生成屏幕上的动物为
                for(var i=0;i<existMyAnimals.length;i++){
                    this.spawMyAnimal(existMyAnimals[i][0],existMyAnimals[i][1],existMyAnimals[i][2],existMyAnimals[i][3]);
                }
                for(var i=0;i<existEnemyAnimals.length;i++){
                    this.spawEnemyAnimal(existEnemyAnimals[i][0],existEnemyAnimals[i][1],existEnemyAnimals[i][2],existEnemyAnimals[i][3]);
                }
                //生成屏幕上的金币
                for(var i=0;i<existDownCoins.length;i++){
                    this.spawnCoin(existDownCoins[i][0],existDownCoins[i][1]);
                }
            }
            //判断是否存在初始人口存储，如无则初始化
            if(!gameState.isExistRoundCount()){
                gameState.setRoundCount(roundCount);
            }
            //判断是否存在总金币的存储，如无则初始化
            if(!gameState.isExistTotalCoin()){
                gameState.setTotalCoin(initCoin);
            }
            //判断是否存在可用牛群冲击次数的存储，如无则初始化
            if(!gameState.isExistCowsCount()){
                gameState.setCowsCount(0);
            }
            //判断是否存在游戏总时间的存储，如无则初始化
            if(!gameState.isExistGameTotalTime()){
                gameState.setGameTotalTime(0);
            }
            MyGame.beginTime=gameState.getGameTotalTime();
            //生成时间
            this.generateTimer();
            // 绘制动物按钮
           this.spawButton(1,50,20,100,100,this.animSheetMouseButton);
           this.spawButton(2,165,20,100,100,this.animSheetCatButton);
           this.spawButton(3,280,20,100,100,this.animSheetDogButton);
           this.spawButton(4,395,20,100,100,this.animSheetTigerButton);
           this.spawButton(5,510,20,100,100,this.animSheetLionButton);
           this.spawButton(6,625,20,100,100,this.animSheetElephantButton);
            //重置碰撞动画的坐标数组
            MyGame.collideEnemyInfo=[];
            //重置飘金币动画的初始坐标数组
            MyGame.coinPosInfo=[];
            //是否绘制了牛群按钮
            MyGame.isCow=false;
            //是否产生牛群
            MyGame.cowAssault=false;
            /*this.ajaxRequest=new AjaxRequest("POST","http://localhost:8036/insert",true);
            this.ajaxRequest.send("3",function(responseText){
                alert(responseText);
            });*/
            this.coinDownTimer=new ig.Timer(this.coinDownTime);
        },
        spawMyAnimal:function(animalID,x,y,health){
            var myAnimal=this.getMyAnimalByID(animalID);
            //生成实体
            ig.game.spawnEntity(myAnimal.name,x,y,{
                flip:false,
                health:health,
                //被杀时设置当前位置不被占用
                setPosEmpty:function(){
                    //我方动物被杀将所占位置设置为无
                    for(var i=0;i<MyGame.animalListPos.length;i++){
                        if(MyGame.animalListPos[i][0]==this.pos.x&&
                            MyGame.animalListPos[i][1]==this.pos.y&&
                            MyGame.animalListPos[i][2]==this.size.x&&
                            MyGame.animalListPos[i][3]==this.size.y){
                            MyGame.animalListPos[i][4]=false;
                            break;
                        }
                    }
                },
                //被杀时删除屏幕中的动物存储
                deleteExistAnimal:function(){
                    //删除屏幕中的动物存储
                    existMyAnimals=gameState.getExistMyAnimals();
                    for(var i=0;i<existMyAnimals.length;i++){
                        if(existMyAnimals[i][0]==this.animalID&&existMyAnimals[i][1]==this.pos.x&&existMyAnimals[i][2]==this.pos.y){
                            existMyAnimals.splice(i,1);
                            gameState.setExistMyAnimals(existMyAnimals);
                            break;
                        }
                    }
                }
            });
        },
        spawEnemyAnimal:function(animalID,x,y,health){
            var myAnimal=this.getEnemyAnimalByID(animalID);
            //生成实体
            ig.game.spawnEntity(myAnimal.name,x,y,{
                flip:false,
                health:health,
                //敌方动物 全部被杀，开始下一回合 (动物实体被杀时执行)
                /*isRoundTimeReset:function(){
                    var enemyAnimals=ig.game.getEntitiesByType(EntityAnimal);
                    var enemyCount=0;
                    for( var i=0; i<enemyAnimals.length;i++){
                        if(enemyAnimals[i].myEnemy=="enemy"){
                            enemyCount++;
                        }
                    }
                    if(enemyCount==0&&animals.length==0){
                        roundTimer.set(0);
                    }
                },*/
                //被杀时设置当前位置不被占用
                setPosEmpty:function(){
                    //ig.log("2  "+this.name+" "+this.checkPosX);
                    //我方动物被杀将所占位置设置为无
                    for(var i=0;i<MyGame.animalListPos.length;i++){
                        if(MyGame.animalListPos[i][0]==this.checkPosX+15&&
                            MyGame.animalListPos[i][1]==this.pos.y&&
                            MyGame.animalListPos[i][2]==this.size.x&&
                            MyGame.animalListPos[i][3]==this.size.y){
                            MyGame.animalListPos[i][4]=false;
                            break;
                        }
                    }
                },
                //敌方动物进入格子后不可点击
                animalCannotPoint:function(){
                    for(var i=0;i<MyGame.animalListPos.length;i++){
                        if(this.pos.x>MyGame.animalListPos[i][0]&&this.pos.x<MyGame.animalListPos[i][0]+ MyGame.animalListPos[i][2]&&this.pos.y==MyGame.animalListPos[i][1]){
                            MyGame.animalListPos[i][5]=true;
                        }
                        else if(this.pos.x+this.size.x>MyGame.animalListPos[i][0]&&this.pos.x+this.size.x<MyGame.animalListPos[i][0]+ MyGame.animalListPos[i][2]&&this.pos.y==MyGame.animalListPos[i][1]){
                            MyGame.animalListPos[i][5]=true;
                        }
                        else if(this.pos.x+this.size.x<MyGame.animalListPos[i][0]&&this.pos.y==MyGame.animalListPos[i][1]){
                            MyGame.animalListPos[i][5]=false;
                        }
                    }
                }
            });
            //将屏幕中的我方动物添加至本地存储
            /*            existMyAnimals.push([MyGame.animalID,animalPos[0],animalPos[1]]);
             gameState.setExistMyAnimals(existMyAnimals);*/
        },
        loadLevel:function (level) {
            this.parent(level);
            /*for (var i = 0; i < this.backgroundMaps.length; i++) {
                this.backgroundMaps[i].preRender = true;
            }*/
        },
        update: function() {
            //产生牛群
            if(MyGame.cowAssault){
                for(var i=1;i<=4;i++){
                    var posY=this.peakLength+(i-1)*this.routeHeight+(i-1)*this.routeInterval;
                    this.spawnCow(-242,posY);
                }
                MyGame.cowAssault=false;
            }
            //设置游戏进行的时间
            MyGame.beginTime+=ig.system.tick;
            var tempTime=Math.floor(MyGame.beginTime);
            if(tempTime!==gameState.getGameTotalTime()){
                gameState.setGameTotalTime(tempTime);
                if(tempTime%this.cowsIntervalTime===0&&gameState.getCowsCount()===0){
                    gameState.setCowsCount(this.cowsCount);
                }
            }
            //绘制牛群冲锋按钮
            if(gameState.getCowsCount()>0&&!MyGame.isCow){
                //todo 绘制牛群按钮
                this.spawCowButton(750,153,60,60,this.ntButton);
                MyGame.isCow=true;
            }
            //更新飘金币动画
            for(var i=0;i<MyGame.coinPosInfo.length;i++){
                if(!MyGame.coinPosInfo[i][2]){
                    MyGame.coinPosInfo[i][2]=new ig.Animation( this.rotateAnimSheet, 0.1, [0,1,2,3,4,5,6]);
                    //this.coinFollowSound.play();
                }
                if(MyGame.coinPosInfo[i][2].loopCount<this.rotateAnimLoopCount){
                    MyGame.coinPosInfo[i][2].update();
                }
            }
            //ig.show("length",MyGame.collideEnemyInfo.length);
            //更新动物碰撞动画
            for(var i=0;i<MyGame.collideEnemyInfo.length;i++){
                if(!MyGame.collideEnemyInfo[i][2]){
                    MyGame.collideEnemyInfo[i][2]=new ig.Animation( this.fightAnimSheet, 0.1, [0,1,2]);
                }
                if(MyGame.collideEnemyInfo[i][2].loopCount<=this.fightAnimLoopCount){
                    MyGame.collideEnemyInfo[i][2].update();
                }
            }
            ig.show("intervalTime",Math.floor(this.intervalTime.delta()));
            //ig.show("collide",MyGame.collideEnemyInfo.length);
            //ig.show("roundTimer",Math.floor(roundTimer.delta()));
            //更新屏幕中动物的信息
            if(existEnemyAnimals.length!=0||existMyAnimals.length!=0){
                existEnemyAnimals=new Array();
                existMyAnimals=new Array();
                var enemyAnimals=ig.game.getEntitiesByType(EntityAnimal);
                for(var i=0;i<enemyAnimals.length;i++){
                    if(enemyAnimals[i].myEnemy=="enemy"){
                        existEnemyAnimals.push([enemyAnimals[i].animalID,enemyAnimals[i].pos.x,enemyAnimals[i].pos.y,enemyAnimals[i].health]);
                    }
                    else{
                        existMyAnimals.push([enemyAnimals[i].animalID,enemyAnimals[i].pos.x,enemyAnimals[i].pos.y,enemyAnimals[i].health])
                    }
                };
                gameState.setExistEnemyAnimals(existEnemyAnimals);
                gameState.setExistMyAnimals(existMyAnimals);
            }
            //更新屏幕中金币位置信息
            if(existDownCoins.length!=0){
                existDownCoins=new Array();
                var roundDownCoins=ig.game.getEntitiesByType(EntityDownCoin);
                for(var i=0;i<roundDownCoins.length;i++){
                    existDownCoins.push([roundDownCoins[i].pos.x,roundDownCoins[i].pos.y]);
                }
                gameState.setExistDownCoins(existDownCoins);
            }
            //根据点击生成我方动物
            if(ig.input.pressed("click")){
                if(MyGame.animalID!=undefined&&this.generateAnimalPos()&&animalPos!=null){
                    var myAnimal=this.getMyAnimalByID(MyGame.animalID);
                    var animalCoin= myAnimal.cost,animalCount=myAnimal.population;
                    //扣除总金币
                    gameState.setTotalCoin(gameState.getTotalCoin()-animalCoin);
                    //扣除回合人口
                    gameState.setRoundCount(gameState.getRoundCount()-animalCount);
                    //生成实体
                    ig.game.spawnEntity(myAnimal.name,animalPos[0],animalPos[1],{
                        //animalID:MyGame.animalID,
                        size:{x:animalPos[2],y:animalPos[3]},
                        flip:false,
                        //被杀时设置当前位置不被占用
                        setPosEmpty:function(){
                            //我方动物被杀将所占位置设置为无
                            for(var i=0;i<MyGame.animalListPos.length;i++){
                                if(MyGame.animalListPos[i][0]==this.pos.x&&
                                    MyGame.animalListPos[i][1]==this.pos.y&&
                                    MyGame.animalListPos[i][2]==this.size.x&&
                                    MyGame.animalListPos[i][3]==this.size.y){
                                    MyGame.animalListPos[i][4]=false;
                                    break;
                                }
                            }
                        },
                        //被杀时删除屏幕中的动物存储
                        deleteExistAnimal:function(){
                            //删除屏幕中的动物存储
                            existMyAnimals=gameState.getExistMyAnimals();
                            for(var i=0;i<existMyAnimals.length;i++){
                                if(existMyAnimals[i][0]==this.animalID&&existMyAnimals[i][1]==this.pos.x&&existMyAnimals[i][2]==this.pos.y){
                                    existMyAnimals.splice(i,1);
                                    gameState.setExistMyAnimals(existMyAnimals);
                                    break;
                                }
                            }
                        }
                    });
                    //将屏幕中的我方动物添加至本地存储
                    existMyAnimals.push([MyGame.animalID,animalPos[0],animalPos[1]],myAnimal.health);
                    gameState.setExistMyAnimals(existMyAnimals);
                    MyGame.animalID=undefined;
                }
            }
            //一个产生动物间隔时间结束，产生敌方动物
            if(Math.floor(this.intervalTime.delta())==0){
                //添加金币本地存储
                //existDownCoins.push([coinPosX,coinPosY]);
                //gameState.setExistDownCoins(existDownCoins);
                //生成敌方动物
                var animal=animals.shift();
                var animalSound=null;
                this.intervalTime.reset();
                if(animal!=undefined){
                    var entityEnemyAnimal="";
                    switch(animal.id){
                        case 1:
                            entityEnemyAnimal="EntityEnemyMouse";
                            animalSound=this.mouseSound;
                            break;
                        case 2:
                            entityEnemyAnimal="EntityEnemyCat";
                            animalSound=this.catSound;
                            break;
                        case 3:
                            entityEnemyAnimal="EntityEnemyDog";
                            animalSound=this.dogSound;
                            break;
                        case 4:
                            entityEnemyAnimal="EntityEnemyTiger";
                            animalSound=this.tigerSound;
                            break;
                        case 5:
                            entityEnemyAnimal="EntityEnemyLion";
                            animalSound=this.lionSound;
                            break;
                        case 6:
                            entityEnemyAnimal="EntityEnemyElephant";
                            animalSound=this.elephantSound;
                            break;
                    };
                    var animalPosX=ig.game.screen.x+ig.system.width;
                    var animalPosY=this.peakLength+(animal.route-1)*this.routeHeight+(animal.route-1)*this.routeInterval;
                    var gameAnimal=ig.game.spawnEntity(entityEnemyAnimal,animalPosX,animalPosY,{
                        flip:false,
                        //敌方动物 全部被杀，开始下一回合 (动物实体被杀时执行)
                       /* isRoundTimeReset:function(){
                            var enemyAnimals=ig.game.getEntitiesByType(EntityAnimal);
                            var enemyCount=0;
                            for( var i=0; i<enemyAnimals.length;i++){
                                if(enemyAnimals[i].myEnemy=="enemy"){
                                    enemyCount++;
                                }
                            }
                            if(enemyCount==0&&animals.length==0){
                                roundTimer.set(1.5);
                            }
                        },*/
                        //被杀时设置当前位置不被占用
                        setPosEmpty:function(){
                            //我方动物被杀将所占位置设置为无
                            //ig.log("1"+" "+this.pos.x);
                            for(var i=0;i<MyGame.animalListPos.length;i++){
                                if(MyGame.animalListPos[i][0]==this.checkPosX+15&&
                                    MyGame.animalListPos[i][1]==this.pos.y&&
                                    MyGame.animalListPos[i][2]==this.size.x&&
                                    MyGame.animalListPos[i][3]==this.size.y){
                                    MyGame.animalListPos[i][4]=false;
                                    //MyGame.animalListPos[i][5]=false;
                                    break;
                                }
                            }
                        },
                        //敌方动物进入格子后不可点击
                        animalCannotPoint:function(){
                            for(var i=0;i<MyGame.animalListPos.length;i++){
                                if(this.pos.x>MyGame.animalListPos[i][0]&&this.pos.x<MyGame.animalListPos[i][0]+ MyGame.animalListPos[i][2]&&this.pos.y==MyGame.animalListPos[i][1]){
                                    if(!this.isDie){
                                        MyGame.animalListPos[i][4]=true;
                                    }
                                    else{
                                        MyGame.animalListPos[i][4]=false;
                                    }
                                }
                                else if(this.pos.x+this.size.x>MyGame.animalListPos[i][0]&&this.pos.x+this.size.x<MyGame.animalListPos[i][0]+ MyGame.animalListPos[i][2]&&this.pos.y==MyGame.animalListPos[i][1]){
                                    if(!this.isDie){
                                        MyGame.animalListPos[i][4]=true;
                                    }
                                    else{
                                        MyGame.animalListPos[i][4]=false;
                                    }
                                }
                                else if(this.pos.x+this.size.x<MyGame.animalListPos[i][0]&&this.pos.y==MyGame.animalListPos[i][1]){
                                    MyGame.animalListPos[i][4]=false;
                                }
                            }
                        }
                    });
                    animalSound.play();
                    //添加在屏幕中的敌方动物的本地存储
                    existEnemyAnimals.push([animal.id,animalPosX,animalPosY,gameAnimal.health]);
                    gameState.setExistEnemyAnimals(existEnemyAnimals);
                    //存储游戏用户状态
                    gameState.setRoundRemainAnimals(animals);
                }
            }
            //一个产生金币的时间间隔结束
            if(Math.floor(this.coinDownTimer.delta())==0){
                //产生下落的金币
                var coinVertical=Math.floor(Math.random()*(this.maxCoinVertical-this.minCoinVertical+1))+this.minCoinVertical;
                //var coinVertical=0;
                var coinPosY=this.peakLength;
                var coinPosX=this.verticalLength+(coinVertical-1)*this.verticalWidth+(coinVertical-1)*this.verticalInterval;
                coinPosX+=(this.verticalWidth-this.downCoinWidth)/2;
                //ig.log(coinVertical+"  "+coinPosX);
                this.spawnCoin(coinPosX,coinPosY);
                this.coinDownTimer.reset();
            }
            //一个回合时间结束
            if(Math.floor(roundTimer.delta())==0){
                //清空屏幕中的我方动物
                var myAnimals=ig.game.getEntitiesByType(EntityAnimal);
                for(var i=0;i<myAnimals.length;i++){
                    if(myAnimals[i].myEnemy=="my")
                    myAnimals[i].kill();
                }
                //清空屏幕中的下落金币
                var roundDownCoins=ig.game.getEntitiesByType(EntityDownCoin);
                for(var i=0;i<roundDownCoins.length;i++){
                    roundDownCoins[i].isClear=true;
                    roundDownCoins[i].kill();
                }
                // 重置位置信息
                MyGame.animalListPos= [[50,170,100,100,false,false],[50,283,100,100,false,false],[50,396,100,100,false,false],[50,509,100,100,false,false],
                    [165,170,100,100,false,false],[165,283,100,100,false,false],[165,396,100,100,false,false],[165,509,100,100,false,false],
                    [280,170,100,100,false,false],[280,283,100,100,false,false],[280,396,100,100,false,false],[280,509,100,100,false,false],
                    [395,170,100,100,false,false],[395,283,100,100,false,false],[395,396,100,100,false,false],[395,509,100,100,false,false],
                    [510,170,100,100,false,false],[510,283,100,100,false,false],[510,396,100,100,false,false],[510,509,100,100,false,false],
                    [625,170,100,100,false,false],[625,283,100,100,false,false],[625,396,100,100,false,false],[625,509,100,100,false,false]];
                animalPos =null;
                if(!isChallenge){
                    //对比回合最高获得金币数并更新
                    var roundHighestCoin=gameState.getRoundCoin()>gameState.getRoundHighestCoin()?gameState.getRoundCoin():gameState.getRoundHighestCoin();
                    gameState.setRoundHighestCoin(roundHighestCoin);
                }
                else{
                    var roundCoin=gameState.getRoundCoin();
                    //挑战成功
                    if(roundCoin>challengeCoin){
                        isChallengeSuccess=true;
                        //关卡加1
                        gameState.setChallengeRound(gameState.getChallengeRound()+1);
                    }
                    else{
                        isChallengeSuccess=false;
                        //删除关卡记录
                        gameState.removeChallengeRound();
                    }
                    //对比挑战最高获得金币数并更新
                    var challlengeHighestCoin=gameState.getRoundCoin()>gameState.getHighChallengeCoin()?gameState.getRoundCoin():gameState.getHighChallengeCoin();
                    gameState.setHighChallengeCoin(challlengeHighestCoin);
                }
                //重置屏幕中的动物为空,删除本地存储
                existEnemyAnimals=new Array();
                existMyAnimals=new Array();
                gameState.removeExistMyAnimals();
                gameState.removeExistEnemyAnimals();
                //重置屏幕中的金币为空，删除本地存储
                existDownCoins=new Array();
                gameState.removeExistDownCoins();
                //todo 将当前获得金币数上传至服务器
                if(!isChallenge){
                    ig.system.setGame(GameRound);
                }
                else{
                    ig.system.setGame(GameChallenge);
                }
            }
            this.parent();
        },
        draw: function() {
            this.parent();
            //绘制飘金币动画
            for(var i=0;i<MyGame.coinPosInfo.length;i++){
                if(!MyGame.coinPosInfo[i][2]){
                    MyGame.coinPosInfo[i][2]=new ig.Animation( this.rotateAnimSheet, 0.1, [0,1,2,3,4,5,6]);
                }
                if(MyGame.coinPosInfo[i][2].loopCount<this.rotateAnimLoopCount){
                    MyGame.coinPosInfo[i][2].draw( MyGame.coinPosInfo[i][0]+10, MyGame.coinPosInfo[i][1]+10);
                    MyGame.coinPosInfo[i][0]+=2;
                    MyGame.coinPosInfo[i][1]-=1;
                }
            }
            //绘制打斗动画
            for(var i=0;i<MyGame.collideEnemyInfo.length;i++){
                if(!MyGame.collideEnemyInfo[i][2]){
                    MyGame.collideEnemyInfo[i][2]=new ig.Animation( this.fightAnimSheet, 0.1, [0,1,2]);
                }
                if(MyGame.collideEnemyInfo[i][2].loopCount<=this.fightAnimLoopCount){
                    MyGame.collideEnemyInfo[i][2].draw(MyGame.collideEnemyInfo[i][0]-80,MyGame.collideEnemyInfo[i][1]-40);
                }
            }
            //绘制可放置的回合动物数文本
            this.drawHeadText((gameState.getRoundCount()<10?"0"+gameState.getRoundCount():gameState.getRoundCount()),825,45);
            //绘制回合时间
            this.drawHeadText((-Math.floor(roundTimer.delta())),820,95);
            //绘制总金币数文本
            this.drawHeadText(gameState.getTotalCoin(),818,140);
            //绘制动物需要的金币数
            this.drawCostText(1,98,155);
            this.drawCostText(2,220,155);
            this.drawCostText(3,329,155);
            this.drawCostText(4,441,155);
            this.drawCostText(5,558,155);
            this.drawCostText(6,671,155);
            //绘制动物需要的人口数
            this.drawPopulationText(1,136,115);
            this.drawPopulationText(2,250,115);
            this.drawPopulationText(3,365,115);
            this.drawPopulationText(4,480,115);
            this.drawPopulationText(5,595,115);
            this.drawPopulationText(6,710,115);
            //挑战模式显示目标金币
            if(isChallenge){
                this.targetCoinImg.draw(599,584,0,0,this.targetCoinImg.width,this.targetCoinImg.height);
                this.drawHeadText(challengeCoin,831,629);
            }
        },
        //绘制动物需要的金币数
        drawCostText:function(animalID,x,y){
            ig.system.context.font="30px Arial Red";
            ig.system.context.fillStyle="#ff0000";
            var animal=this.getMyAnimalByID(animalID);
            ig.system.context.fillText(animal.cost,x,y);
        },
        //绘制动物需要的消耗人口数
        drawPopulationText:function(animalID,x,y){
            ig.system.context.font="arial bold 30px";
            ig.system.context.fillStyle="#ff0000";
            var animal=this.getMyAnimalByID(animalID);
            ig.system.context.fillText(animal.population,x,y);
        },
        //绘制顶部文本
        drawHeadText:function(text,x,y){
            ig.system.context.font="30px Arial Red";
            ig.system.context.fillStyle="#ff0000";
            ig.system.context.fillText(text,x,y);
        },
        run:function () {
            //判断动物按钮是否可选
             this.animalButtons=ig.game.getEntitiesByType(Button);
             var totalCoin=gameState.getTotalCoin();
             var roundRemainCount=gameState.getRoundCount();
             for(var i=0;i<this.animalButtons.length;i++){
                 if(this.animalButtons[i].id!==0){
                     var myAnimal=this.getMyAnimalByID(this.animalButtons[i].id);
                     if(totalCoin-myAnimal.cost<0||roundRemainCount-myAnimal.population<0){
                         this.animalButtons[i].state="deactive";
                     }
                 }
             }
            this.update();
            this.draw();
        },
        //生成动物
        generateAnimal:function(){
            //产生随机的动物数及动物的排序
            var randomGenerate=new RandomGenerate(this.minRandomAnimals,this.maxRandomAnimals,this.minRandomRoute,this.maxRandomRoute,[{id:1,rate:20},{id:2,rate:35},{id:3,rate:24},
                {id:4,rate:9},{id:5,rate:7},{id:6,rate:5}]);
            //生成动物
            randomGenerate.generate();
            ig.log("生成动物数:"+randomGenerate.count);
            animals=randomGenerate.animals;
        },
        //生成回合时间
        generateTimer:function(){
            //生成当前回合的时间
            var maxTime=0;
            var runTime=this.interval;
            if(existEnemyAnimals.length>0){
                runTime=0;
                for(var i=0;i<existEnemyAnimals.length;i++){
                    var animal=this.getEnemyAnimalByID(existEnemyAnimals[i][0]);
                    var time=(existEnemyAnimals[i][1] +  animal.size.x)/(animal.maxVel.x<0?-animal.maxVel.x:animal.maxVel.x);
                    var timeTemp=time+(animal.length>0?i:0)*this.interval;
                    if(timeTemp>maxTime){
                        maxTime=timeTemp;
                    }
                }
            }
            for(var i=0;i<=animals.length-1;i++){
                var animal=this.getEnemyAnimalByID(animals[i].id);
                var time=(ig.game.screen.x + ig.system.width +  animal.size.x)/(animal.maxVel.x<0?-animal.maxVel.x:animal.maxVel.x);
                //屏幕中的地方动物大于等于2个是才会有间隔时间产生，在小于2个时是没有间隔的
                var animalInterval=existEnemyAnimals.length>=2?existEnemyAnimals.length-1:0;
                var timeTemp=time+(i+animalInterval)*this.interval;
                if(timeTemp>maxTime){
                    maxTime=timeTemp;
                }
            }
            runTime+=maxTime+2;
            ig.log("回合时间: "+runTime);
            //ig.log("回合时间1: "+(this.interval+maxTime));
            roundTimer=new ig.Timer(Math.floor(runTime));
            //重置间隔时间
            this.intervalTime.reset();
            //设置最后一个回合的时间
            roundTimeCount=Math.floor(runTime);
        },
        //绘制动物按钮
        spawButton:function(animalID,posX,posY,width,height,animSheet){
            ig.game.spawnEntity(Button, posX, posY, {
                id:animalID,
                size:{ x:width, y:height },
                animSheet:animSheet,
                pressedUp:function () {
                    //按钮点击动画
                    if (MyGame.animalID==this.id) {
                        this.currentAnim = this.anims.active;
                    }
                    else {
                        if(this.currentAnim != this.anims.deactive){
                            this.currentAnim = this.anims.idle;
                        }
                    }
                },
                pressedDown:function () {
                    MyGame.animalID=this.id;
                },
                backgroundChange:function(){
                    if (MyGame.animalID==this.id) {
                        this.currentAnim = this.anims.active;
                    }
                    else {
                        if(this.currentAnim != this.anims.deactive){
                            this.currentAnim = this.anims.idle;
                        }
                    }
                }
            });
        },
        //绘制牛群按钮
        spawCowButton:function(posX,posY,width,height,animSheet){
            ig.game.spawnEntity(Button, posX, posY, {
                id:0,
                size:{ x:width, y:height },
                animSheet:animSheet,
                otherAnim:true,
                doOtherAnim:function(){
                    this.addAnim('idle', 0.2, [0,1]);
                     this.currentAnim=this.anims["idle"];
                },
                pressedUp:function () {
                    this.kill();
                    gameState.setCowsCount(gameState.getCowsCount()-1);
                    MyGame.isCow=false;
                    //牛群开始冲锋标志
                    MyGame.cowAssault=true;
                    //运行时间设为0
                    gameState.setGameTotalTime(0);
                    MyGame.beginTime=0;
                }
            });
        },
        //确定动物摆放的位置
        generateAnimalPos:function(){
            var j;
            for(j =0 ; j <MyGame.animalListPos.length;j++) {
                if(ig.input.mouse.x > MyGame.animalListPos[j][0] &&
                    ig.input.mouse.x < (MyGame.animalListPos[j][0] + MyGame.animalListPos[j][2]) &&
                    ig.input.mouse.y > MyGame.animalListPos[j][1] &&
                    ig.input.mouse.y < (MyGame.animalListPos[j][1] + MyGame.animalListPos[j][3])) {
                        if(!MyGame.animalListPos[j][4]){
                            animalPos = MyGame.animalListPos[j];
                            MyGame.animalListPos[j][4] = true;
                            return true;
                        }
                        else{
                            ig.log("can not repeat");
                            return false;
                        }
                }
            }
            if(j==MyGame.animalListPos.length){
                ig.log("position is unvalid");
                return false;
            }
        },
        //根据敌方动物ID获取敌方动物实体类
        getEnemyAnimalByID:function(animalID){
            var animal=null;
            switch(animalID){
                case 1:
                    animal=new EntityEnemyMouse(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 2:
                    animal=new EntityEnemyCat(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 3:
                    animal=new EntityEnemyDog(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 4:
                    animal=new EntityEnemyTiger(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 5:
                    animal=new EntityEnemyLion(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 6:
                    animal=new EntityEnemyElephant(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
            }
            return animal;
        },
        //根据我方动物ID获取我方动物实体类
        getMyAnimalByID:function(animalID){
            var animal=null;
            switch(animalID){
                case 1:
                    animal=new EntityMyMouse(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 2:
                    animal=new EntityMyCat(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 3:
                    animal=new EntityMyDog(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 4:
                    animal=new EntityMyTiger(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 5:
                    animal=new EntityMyLion(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 6:
                    animal=new EntityMyElephant(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 7:
                    animal=new EntityCow(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
            }
            return animal;
        },
        //产生下落的金币
        spawnCoin:function(posX,posY){
            ig.game.spawnEntity(EntityDownCoin, posX, posY, {
                flip:false
            });
        },
        //产生牛
        spawnCow:function(x,y){
            //生成实体
            ig.game.spawnEntity(EntityCow,x,y,{
                flip:false
            });
        },
        //数组随机排序
        randomArray:function(arr){
            var _arr = [];
            var length = arr.length;
            for(var i=0; i<length; i++)
            {
                var random = Math.random() * arr.length;
                _arr.push(arr.splice(random, 1)[0]);
            }
            return _arr;
        }
    });
    GameRound=ig.Game.extend({
        //需要增加的金币
        addCoin:0,
        //按钮动画原图
        animSheetStart:new ig.AnimationSheet("media/roundButton.png",156,58),
        //背景
        back:new ig.Image("media/roundBackground.png"),
        init:function(){
            var totalCoin=gameState.getTotalCoin();
            if(totalCoin<initCoin){
                //金币少于200 增加金币
                this.addCoin=roundTimeCount*1
                gameState.setTotalCoin(totalCoin+this.addCoin);
            }
            //绘制背景
            this.back.draw(0,0,0,0,960,640);
            this.drawRoundInfo(roundCount-gameState.getRoundCount(),530,270);
            this.drawRoundInfo(gameState.getRoundCoin(),520,340);
            this.drawRoundInfo(gameState.getRoundHighestCoin(),550,410);
            this.drawRoundInfo(this.addCoin,660,453);
            this.spawButton(458,156,58,this.animSheetStart);
            //删除上个回合金币的存储
            gameState.removeRoundCoinStorage();
            //删除上一个回合的本地存储的动物列表
            gameState.removeAnimalsStorage();
            //重新设置回合可放置动物数
            gameState.setRoundCount(roundCount);
        },
        run:function(){
            this.entities = ig.game.getEntitiesByType(Button);
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
                this.entities[i].draw();
            };
        },
        //绘制回合信息
        drawRoundInfo:function(text,x,y){
            ig.system.context.font="30px Arial Red";
            ig.system.context.fillStyle="#ff0000";
            //ig.system.context.textAlign="center";
            ig.system.context.fillText(text,x,y);
        },
        //绘制按钮
        spawButton:function(y,width,height,animSheet){
            //继续游戏按钮
            ig.game.spawnEntity(Button,((ig.system.width+ig.game.screen.x)-width)/2, y, {
                size:{ x:width, y:height },
                animSheet:animSheet,
                pressedUp:function () {
                    isChallenge=false;
                    MyGame.isInit=true;
                    ig.system.setGame(MyGame);
                }
            });
        }
    });
    GameChallenge=ig.Game.extend({
        //开始挑战动画原图
        animSheetStart:new ig.AnimationSheet("media/beginChallenge.png",156,58),
        //返回菜单动画原图
        animSheetback:new ig.AnimationSheet("media/backMenu.png",156,58),
        //挑战成功背景
        backSuccess:new ig.Image("media/backSuccess.png"),
        //挑战失败背景
        backEnd:new ig.Image("media/backEnd.png"),
        //初始金币
        initCoin:40,
        //递增金币
        incrementCoin:45,
        //挑战的金币数
        //challengeCoin:0,
        init:function(){
            //不存在挑战关数时设置为1
            if(!gameState.isExistChallengeRound()){
                gameState.setChallengeRound(1);
            }
            var challengeRound=gameState.getChallengeRound();
            var currentChallengeCoin=this.initCoin+(challengeRound-1)*this.incrementCoin;
            challengeCoin=currentChallengeCoin;
            var roundCoin=gameState.getRoundCoin();
            var highChallengeCoin=gameState.getHighChallengeCoin();
            //绘制背景
            if(isChallengeSuccess){
                this.backSuccess.draw(0,0,0,0,this.backSuccess.width,this.backSuccess.height);
                this.drawChallengeInfo(challengeRound,358,342);
                this.drawChallengeInfo(challengeCoin,550,344);
                //绘制按钮
                this.spawnButton(286,458,156,58,this.animSheetStart,1);
                this.spawnButton(538,458,156,58,this.animSheetback,2);
            }
            else{
                this.backEnd.draw(0,0,0,0,this.backEnd.width,this.backEnd.height);
                //绘制按钮
                this.drawChallengeInfo(roundCoin,500,310);
                this.drawChallengeInfo(highChallengeCoin,500,365);
                this.spawnButton(((ig.system.width+ig.game.screen.x)-156)/2,458,156,58,this.animSheetback,2);
            }
            //删除上个回合金币的存储
            gameState.removeRoundCoinStorage();
            //删除上一个回合的本地存储的动物列表
            gameState.removeAnimalsStorage();
            //重新设置回合可放置动物数
            gameState.setRoundCount(roundCount);
        },
        run:function(){
            this.entities = ig.game.getEntitiesByType(Button);
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
                this.entities[i].draw();
            };
        },
        //绘制回合信息
        drawChallengeInfo:function(text,x,y){
            ig.system.context.font="30px Arial Red";
            ig.system.context.fillStyle="#ff0000";
            //ig.system.context.textAlign="center";
            ig.system.context.fillText(text,x,y);
        },
        //绘制按钮
        spawnButton:function(x,y,width,height,animSheet,gameID){
            //继续游戏按钮
            ig.game.spawnEntity(Button,x, y, {
                size:{ x:width, y:height },
                animSheet:animSheet,
                pressedUp:function () {
                    if(gameID==1){
                        isChallenge=true;
                        MyGame.isInit=true;
                        ig.system.setGame(MyGame);
                    }
                    else{
                        MyGameTitle.initialized=false;
                        isChallengeSuccess=true;
                        ig.system.setGame(MyGameTitle);
                    }
                }
            });
        }
    });
    MyGameTitle=ig.Game.extend({
        //背景
        back:new ig.Image("media/titleBackground.png"),
        //是否需要绘制按钮
        isFirst:true,
        introTimer:null,
        //开始按钮动画原图
        animSheetStart:new ig.AnimationSheet("media/start.png",369,77),
        //排名按钮动画原图
        animSheetRank:new ig.AnimationSheet("media/rank.png",369,77),
        //挑战模式按钮动画原型
        animSheetChallenge:new ig.AnimationSheet("media/challenge.png",369,77),
        //帮助按钮动画原图
        animSheetHelp:new ig.AnimationSheet("media/help.png",348,77),
        //背景音乐
        //bgSound:new ig.Sound('media/sound/bgSound2.mp3', false),
        //font:new ig.Font("media/font.png"),
        init:function(){
            if(!MyGameTitle.initialized){
                ig.system.clear("#000000");
                //绑定按钮
                ig.input.bind(ig.KEY.MOUSE1, 'click');
                //绘制按钮
                this.spawButton(392,113,369,77,this.animSheetStart,0);
                this.spawButton(419,375,369,77,this.animSheetRank,1);
                this.spawButton(531,513,348,77,this.animSheetHelp,2);
                this.spawButton(186,256,369,77,this.animSheetChallenge,4);
                //绘制背景
                this.back.draw(0,0,0,0,this.back.width,this.back.height);
                //this.font.draw(125,100,100,ig.Font.ALIGN.LEFT);
                // 游戏初始化完毕
                MyGameTitle.initialized = true;
            };
            this.introTimer = new ig.Timer(1);
        },
        //绘制按钮
        spawButton:function(posX,posY,width,height,animSheet,gameTitle){
            ig.game.spawnEntity(Button, posX, posY, {
                size:{ x:width, y:height },
                animSheet:animSheet,
                /*update:function(){
                    this.parent();
                },*/
                pressedDown:function () {
                    switch(gameTitle){
                        case 0:
                            if(gameState.isExistIsFirst()){
                                isChallenge=false;
                                MyGame.isInit=false;
                                ig.system.setGame(MyGame);
                            }
                            else{
                                ig.system.setGame(GameDescription);
                            }
                            break;
                        case 1:
                            if(gameState.isExistIsFirst()){
                                isChallenge=false;
                                MyGame.isInit=true;
                                ig.system.setGame(MyGame);
                            }
                            else{
                                ig.system.setGame(GameDescription);
                            }
                            break;
                        case 2:
                            if(gameState.isExistIsFirst()){
                                isChallenge=false;
                                MyGame.isInit=true;
                                ig.system.setGame(MyGame);
                            }
                            else{
                                ig.system.setGame(GameDescription);
                            }
                            break;
                        case 4:
                            if(gameState.isExistIsFirst()){
                                isChallenge=true;
                                MyGame.isInit=true;
                                //开始挑战失败了就从第一关开始
                                if(!isChallengeSuccess){
                                    gameState.setChallengeRound(1);
                                }
                                ig.system.setGame(GameChallenge);
                            }
                            else{
                                ig.system.setGame(GameDescription);
                            }
                            break;
                    }
                    gameState.setIsFirst(1);
                }
            });
        },
        run:function () {
            this.entities = ig.game.getEntitiesByType(Button);
            for (var i = 0; i < this.entities.length; i++) {
                this.entities[i].update();
                this.entities[i].draw();
            };
            var d = this.introTimer.delta();
            if (!this.soundPlayed && d > -0.3) {
                this.soundPlayed = true;
                //this.bgSound.play();
            }
        }
    });
    GameDescription=ig.Game.extend({
        //老鼠按钮动画
        animSheetMouseButton:new ig.AnimationSheet("media/mouse_button.png",100,100),
        //猫按钮动画
        animSheetCatButton:new ig.AnimationSheet("media/cat_button.png",100,100),
        //狗按钮动画
        animSheetDogButton:new ig.AnimationSheet("media/dog_button.png",100,100),
        //老虎按钮动画
        animSheetTigerButton:new ig.AnimationSheet("media/tiger_button.png",100,100),
        //狮子按钮动画
        animSheetLionButton:new ig.AnimationSheet("media/lion_button.png",100,100),
        //大象按钮动画
        animSheetElephantButton:new ig.AnimationSheet("media/elephant_button.png",100,100),
        //
        init: function() {
            //加载关卡
            this.loadLevel(LevelTest1);
            ig.input.bind(ig.KEY.MOUSE1,"click");
            // 绘制动物按钮
            this.spawButton(1,50,20,100,100,this.animSheetMouseButton);
            this.spawButton(2,165,20,100,100,this.animSheetCatButton);
            this.spawButton(3,280,20,100,100,this.animSheetDogButton);
            this.spawButton(4,395,20,100,100,this.animSheetTigerButton);
            this.spawButton(5,510,20,100,100,this.animSheetLionButton);
            this.spawButton(6,625,20,100,100,this.animSheetElephantButton);
        },
        loadLevel:function (level) {
            this.parent(level);
            /*for (var i = 0; i < this.backgroundMaps.length; i++) {
             this.backgroundMaps[i].preRender = true;
             }*/
        },
        update:function(){
            this.parent();
        },
        draw:function(){
            this.parent();
            //绘制可放置的回合动物数文本
            this.drawHeadText((gameState.getRoundCount()<10?"0"+gameState.getRoundCount():gameState.getRoundCount()),825,45);
            //todo 时间写死
            // 绘制回合时间
            this.drawHeadText(150,820,95);
            //绘制总金币数文本
            this.drawHeadText(gameState.getTotalCoin(),818,140);
            //绘制动物需要的金币数
            this.drawCostText(1,98,155);
            this.drawCostText(2,220,155);
            this.drawCostText(3,329,155);
            this.drawCostText(4,441,155);
            this.drawCostText(5,558,155);
            this.drawCostText(6,671,155);
            //绘制动物需要的人口数
            this.drawPopulationText(1,136,115);
            this.drawPopulationText(2,250,115);
            this.drawPopulationText(3,365,115);
            this.drawPopulationText(4,480,115);
            this.drawPopulationText(5,595,115);
            this.drawPopulationText(6,710,115);
        },
        drawCostText:function(animalID,x,y){
            ig.system.context.font="30px Arial Red";
            ig.system.context.fillStyle="#ff0000";
            var animal=this.getMyAnimalByID(animalID);
            ig.system.context.fillText(animal.cost,x,y);
        },
        //绘制动物需要的消耗人口数
        drawPopulationText:function(animalID,x,y){
            ig.system.context.font="arial bold 30px";
            ig.system.context.fillStyle="#ff0000";
            var animal=this.getMyAnimalByID(animalID);
            ig.system.context.fillText(animal.population,x,y);
        },
        //绘制顶部文本
        drawHeadText:function(text,x,y){
            ig.system.context.font="30px Arial Red";
            ig.system.context.fillStyle="#ff0000";
            ig.system.context.fillText(text,x,y);
        },
        //根据我方动物ID获取我方动物实体类
        getMyAnimalByID:function(animalID){
            var animal=null;
            switch(animalID){
                case 1:
                    animal=new EntityMyMouse(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 2:
                    animal=new EntityMyCat(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 3:
                    animal=new EntityMyDog(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 4:
                    animal=new EntityMyTiger(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 5:
                    animal=new EntityMyLion(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 6:
                    animal=new EntityMyElephant(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
                case 7:
                    animal=new EntityCow(0,0,{
                        flip:false,
                        animalID:animalID
                    });
                    break;
            }
            return animal;
        },
        spawButton:function(animalID,posX,posY,width,height,animSheet){
            ig.game.spawnEntity(Button, posX, posY, {
                id:animalID,
                size:{ x:width, y:height },
                animSheet:animSheet,
                pressedUp:function () {
                    //按钮点击动画
                    if (GameDescription.animalID==this.id) {
                        this.currentAnim = this.anims.active;
                    }
                    else {
                        if(this.currentAnim != this.anims.deactive){
                            this.currentAnim = this.anims.idle;
                        }
                    }
                },
                pressedDown:function () {
                    GameDescription.animalID=this.id;
                },
                backgroundChange:function(){
                    if (GameDescription.animalID==this.id) {
                        this.currentAnim = this.anims.active;
                    }
                    else {
                        if(this.currentAnim != this.anims.deactive){
                            this.currentAnim = this.anims.idle;
                        }
                    }
                }
            });
        }
    });
        MyGameTitle.initialized = false;
        //是否重新开始
        MyGame.isInit=true;
        //游戏状态
        var gameState=new GameState();
        // 动物摆放的区域对象 x,y坐标 + x长 y长
        MyGame.animalListPos= [[50,170,100,100,false,false],[50,283,100,100,false,false],[50,396,100,100,false,false],[50,509,100,100,false,false],
            [165,170,100,100,false,false],[165,283,100,100,false,false],[165,396,100,100,false,false],[165,509,100,100,false,false],
            [280,170,100,100,false,false],[280,283,100,100,false,false],[280,396,100,100,false,false],[280,509,100,100,false,false],
            [395,170,100,100,false,false],[395,283,100,100,false,false],[395,396,100,100,false,false],[395,509,100,100,false,false],
            [510,170,100,100,false,false],[510,283,100,100,false,false],[510,396,100,100,false,false],[510,509,100,100,false,false],
            [625,170,100,100,false,false],[625,283,100,100,false,false],[625,396,100,100,false,false],[625,509,100,100,false,false]];
            //确定的动物摆放位置
        var animalPos =null;
        //回合动物限制数
        var roundCount=30;
        //初始化金币数
        var initCoin=200;
        //动物数组
        var animals=null;
        //一个回合的时间类
        var roundTimer=null;
        //最后一回合时间
        var roundTimeCount=0;
        //存在屏幕中的我方动物
        var existMyAnimals=new Array();
        //存在屏幕中的敌方动物
        var existEnemyAnimals=new Array();
        //存在屏幕中的下落金币
        var existDownCoins=new Array();
        //是否挑战模式
        var isChallenge=false;
        //挑战的金币
        var challengeCoin=0;
        //是否挑战成功
        var isChallengeSuccess=true;
        /*if( ig.ua.mobile ) {
            // Disable sound for all mobile devices
            ig.sound.enabled = false;
        }     */

        /*if( ig.ua.iPhone4 ) {
            // The iPhone 4 has more pixels - we'll scale the
            // game up by a factor of 4
            ig.main('#canvas', MyGameTitle, 60, 960, 640, 2);
        }
        else {
            // Desktop browsers
            ig.main('#canvas', MyGameTitle, 60, 960, 640,1);
        }*/
        //ig.Sound.enabled=false;
        ig.main( '#canvas', MyGameTitle, 60, 960, 640, 1,ig.ImpactSplashLoader);
});
