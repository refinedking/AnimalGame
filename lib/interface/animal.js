/**
 * Content: 动物基类
 * User: gjh
 * Date: 12-5-23
 * CreateTime: a.m 10:30
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "interface.animal"
).requires(
     "impact.entity"
).defines(function(){
        EntityAnimal=ig.Entity.extend({
            //动物ID
            animalID:-1,
            //动物名称
            name:"",
            //动物的血量
            health:0,
            healthTotal:0,
            //大小
            size:{x:100, y:100},
            // 检测偏移
            offset:{x:0, y:0},
            //是否为静态碰撞
            hasStaticCollide:false,
            //动物打斗动画原型
            //fightAnimSheet:new ig.AnimationSheet("media/animalFight.png",150,150),
            //播放战斗动画的时间类
            fightTimer:null,
            //战斗动画播放时间
            fightTime:0.6,
            //播放死亡动画的时间类
            dieTimer:null,
            //是否死亡
            isDie:false,
            //是否第一次碰撞
            isFirstCollision:true,
            //碰撞音效
            fightSound:new ig.Sound('media/sound/fight.mp3', false),
            //血条动画原型
            bloodImage:new ig.Image("media/blood.png"),
            blueBloodImage:new ig.Image("media/blueBlood.png"),
            bloodBorderImage:new ig.Image("media/bloodBorder.png"),
            //重叠的位置
            checkPosX:0,
            //是否狂暴
            isFrantic:false,
            //狂暴时战胜克制本身的动物的概率
            franticDefeatPercentage:0.5,
            //敌方动物狂暴概率
            enemyFranticPercentage:0.1,
            //我方动物狂暴概率
            myFranticPercentage:0.2,
            //我方动物狂暴需要等待的时间
            franticWaitTime:10,
            //我方动物狂暴需要等待的时间类
            franticWaitTimer:null,
            //碰撞动物名称
            //otherAnimal:null,
           init:function (x, y, settings){
                //todo 添加狂暴状态动画
                //敌方动物狂暴状态处理
                if(this.myEnemy === "enemy"){
                    var franticPercentage=Math.random();
                    //狂暴概率之内
                    if(franticPercentage<=this.enemyFranticPercentage){
                        //this.isFrantic=true;
                        //todo 设置当前动画为狂暴动画
                    }
                }
                this.franticWaitTimer=new ig.Timer(this.franticWaitTime);
                this.parent(x, y, settings);
            },
            update:function (){
                //我方动物狂暴状态处理
                if(this.myEnemy === "my"&&Math.floor(this.franticWaitTimer.delta())==0){
                    var franticPercentage=Math.random();
                    //狂暴概率之内
                    if(franticPercentage<=this.myFranticPercentage){
                        //this.isFrantic=true;
                        //todo 设置当前动画为狂暴动画
                    }
                }
                if(this.name!=="EntityCow"){
                    if(this.isDie){
                        if(this.currentAnim==this.anims.fight&&this.fightTimer&&this.fightTimer.delta()>=this.fightTime){
                            //ig.show("fight2",this.fightTimer.delta().round(1));
                            if(!this.dieTimer){
                                this.currentAnim=this.anims.die;
                                this.dieTimer=new ig.Timer();
                                //this.fightSound.stop();
                            }
                        }
                        if(this.dieTimer&&this.dieTimer.delta()>=this.dieTime){
                            this.kill();
                        }
                    }
                    else{
//                    var deltaTime=this.dieTimer?this.fightTime+this.dieTime:this.fightTime;
                        if(this.fightTimer&&this.fightTimer.delta()>=this.fightTime){
                            //ig.show("fight3",this.fightTimer.delta().round(1));
                            //this.fightSound.stop();
                            this.currentAnim=this.anims.idle;
                            this.fightTimer=null;
                            this.dieTimer=null;
                            this.isFirstCollision=true;
                            this.isFrantic=false;
                        }
                    }
                }
                this.parent();
            },
            draw:function(){
                this.parent();
                if(this.currentAnim==this.anims.idle&&this.name!=="EntityCow"){
                    var percentage=this.health/this.healthTotal;
                    var ctx = ig.system.context;
                    ctx.save();
                    this.bloodBorderImage.draw(this.pos.x+5,this.pos.y+101,0,0,this.bloodBorderImage.width,this.bloodBorderImage.height);
                    if(this.myEnemy==="enemy"){
                        this.bloodImage.draw(this.pos.x+6,this.pos.y+103,0,0,this.bloodImage.width*percentage,this.bloodImage.height);
                    }
                    else if(this.myEnemy==="my"){
                        this.blueBloodImage.draw(this.pos.x+6,this.pos.y+103,0,0,this.blueBloodImage.width*percentage,this.blueBloodImage.height);
                    }
                    ctx.restore();
                }
            },
            check:function(other){
                if(this.animalType == other.animalType)
                {
                    //ig.log(MyGame.smallgame);
                    if(MyGame.smallgame==2){
                        MyGame.smallgame=0;
                        //用于更新位置可用
                        other.isDie=true;
                        other.checkPosX=this.pos.x+100;
                        other.kill();
                    }
                    else if(MyGame.smallgame==1){
                        MyGame.smallgame=0;
                        //用于更新位置可用
                        this.isDie=true;
                        this.kill();
                    }
                    else if(MyGame.smallgame==0||MyGame.smallgame==undefined){
                        switch(this.animalType)
                        {
                            case "mouse":
                                // 暂停之前的游戏,转入另一个场景
                                ig.system.setGame(MyTigerWarGame);
                                break;
                            case "cat":
                                // 暂停之前的游戏,转入另一个场景
                                ig.system.setGame(MyTigerWarGame);
                                break;
                            case "dog":
                                // 暂停之前的游戏,转入另一个场景
                                ig.system.setGame(MyTigerWarGame);
                                break;
                            case "lion":
                                // 暂停之前的游戏,转入另一个场景
                                ig.system.setGame(MyTigerWarGame);
                                break;
                            case "tiger":
                                // 暂停之前的游戏,转入另一个场景
                                ig.system.setGame(MyTigerWarGame);
                                break;
                            case "elephant":
                                // 暂停之前的游戏,转入另一个场景
                                ig.system.setGame(MyTigerWarGame);
                                break;
                        }
                    }
                }
            },
            collideWith:function(other,axis){
                if(!this.hasStaticCollide&&this.animalType != other.animalType&&other instanceof EntityAnimal&&this.isFirstCollision)
                {
                    this.checkPosX=this.pos.x;
                    this.currentAnim=this.anims.fight;
                    this.isFirstCollision=false;
                    if(!this.fightTimer){
                        this.fightTimer=new ig.Timer();
                    }
                    this.fightSound.play();
                    if(this.animalType=="mouse"&&other.animalType=="elephant")
                    {
                        other.receiveDamage(other.health+1,this);
                    }
                    else if(this.animalType=="elephant"&&other.animalType=="mouse"){

                    }
                    else
                    {
                        other.receiveDamage(this.health,this);
                    }
                }
                this.parent(other,axis);
            },
            receiveDamage:function (amount, from) {
                if(from instanceof EntityAnimal)
                {
                    //敌方是牛，直接被杀
                    if(from.name==="EntityCow"){
                        this.kill();
                    }
                    else if(this.name==="EntityCow"){
                        from.kill();
                    }
                    else{
                        //双方都是狂暴时取消双方狂暴
                        if(this.isFrantic&&from.isFrantic){
                            this.isFrantic=false;
                            from.isFrantic=false;
                        }
                        //对方是直接杀死自己的动物
                        if(from.animalType==this.againstAnimalType){
                            //不是狂暴状态自己被杀
                            if(!this.isFrantic){
                                if(!this.isDie){
                                    this.isDie=true;
                                }
                            }
                            //狂暴状态时有一定的概率杀死对方
                            else{
                                var killPercentage=Math.random();
                                //在概率之内
                                if(killPercentage<=this.franticDefeatPercentage){
                                    if(!from.isDie){
                                        from.isDie=true;
                                    }
                                }
                                //在概率之外
                                else{
                                    if(!this.isDie){
                                        this.isDie=true;
                                    }
                                }
                            }
                        }
                        //对方是我可以自己杀死的动物
                        else if(from.animalType==this.killAnimalType){}
                        //无直接杀或者被杀关系
                        else{
                            //不是狂暴状态时减血，狂暴时不减血
                            if(!this.isFrantic){
                                if(this.health<=amount)
                                {
                                    if(!this.isDie){
                                        this.isDie=true;
                                    }
                                }
                                else{
                                    this.health-=amount;
                                }
                            }
                        }
                    }
                   //ig.log(this.name+"   "+this.isDie+"  "+this.health);
                }
            },
            kill:function(){
                this.parent();
                if(!this.isOut){
                    this.setPosEmpty();
                   /* if(this.myEnemy==="enemy"&&this.otherAnimal.name==="EntityCow"){
                        this.otherAnimal.vel.x=(this.otherAnimal.settings.flip ? -this.otherAnimal.maxVel.x : this.otherAnimal.maxVel.x);
                    }*/
                }
            },
            //被杀时设置当前位置不被占用
            setPosEmpty:function(){}
        })
    })