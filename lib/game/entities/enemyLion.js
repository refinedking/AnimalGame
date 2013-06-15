/**
 * Content: 敌方狮子
 * User: gjh
 * Date: 12-5-24
 * CreateTime: p.m 13:50
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.enemyLion"
).requires(
    "interface.animal"
).defines(
    function(){
        EntityEnemyLion=EntityAnimal.extend({
            offset:{x:19,y:0},
            //动物ID
            animalID:5,
            //动物名称
            name:"EntityEnemyLion",
            //动物类型
            animalType:"lion",
            //可以直接杀死自己的动物类型
            againstAnimalType:"elephant",
            //自己可以直接杀死的动物类型
            killAnimalType :"tiger",
            //动物的血量
            health:50,
            healthTotal:50,
            //奖励金币
            reward:15,
            //移动速度
            maxVel:{x:-60,y:0},
            //消耗人口
            persons:2,
            //出现概率
            appearRate:50,
            //动物敌我
            myEnemy:"enemy",
            //敌方动物碰撞类型为B
            type:ig.Entity.TYPE.B,
            //定义碰撞检测类型为A
           // checkAgainst:ig.Entity.TYPE.A,
            //动态碰撞定义为被动碰撞
            collides:ig.Entity.COLLIDES.LITE,
            //是否为静态碰撞
            hasStaticCollide:false,
            //判断子弹飞出屏幕没有
            isOut:false,
            //游戏对象类
            gameState:null,
            //敌方狮子动画元素
            animSheet:new ig.AnimationSheet("media/lion2.png",139,100),
            //死亡动画播放时间
            dieTime:1.2,
            //金币飘起音效
            coinGetSound:new ig.Sound('media/sound/coinGet.mp3', false),
            init:function(x,y,settings){
                this.addAnim("idle",0.3,[0,1,2,3]);
                this.addAnim("fight",0.1,[10]);
                this.addAnim("die",0.2,[4,5,6,7,8,9]);
                this.gameState=new GameState();
                this.parent(x,y,settings);
            },
            update:function ()
            {
                //判断是否出屏幕了
                if (this.vel.x < 0) {//向左飞行
                    this.isOut = !!(this.pos.x < ig.game.screen.x - this.size.x);
                }
                else {
                    this.isOut = !!(this.pos.x > ig.game.screen.x + ig.system.width +  this.size.x);
                }
                //静态碰撞并播放完动画
                if(this.hasStaticCollide||this.isOut)
                {
                    this.kill();
                }
                this.animalCannotPoint();
                this.parent();
            },
            handleMovementTrace:function(res)
            {
                if(res.collision.x||res.collision.y||res.collision.slope)
                {
                    this.hasStaticCollide=true;
                }
                this.parent(res);
            },
            check:function(other){
                this.parent(other);
            },
            collideWith:function(other,axis)
            {
                if(MyGame.collideEnemyInfo.length==0)  {
                    MyGame.collideEnemyInfo.push([this.pos.x,this.pos.y,null]);
                }
                var j=0;
                for(var i=0;i<MyGame.collideEnemyInfo.length;i++){
                    if(this.pos.x==MyGame.collideEnemyInfo[i][0]&&this.pos.y==MyGame.collideEnemyInfo[i][1]){
                        j++;
                        break;
                    }
                }
                if(j==0){
                    MyGame.collideEnemyInfo.push([this.pos.x,this.pos.y,null]);
                }
                this.parent(other,axis);
            },
            receiveDamage:function (amount, from)
            {
                this.parent(amount,from);
            },
            kill:function()
            {
                this.parent();
                if(!this.isOut){
                    //敌方动物被杀添加回合金币
                    this.gameState.setRoundCoin(this.gameState.getRoundCoin()+this.reward)
                    //敌方动物被杀添加总金币
                    this.gameState.setTotalCoin(this.gameState.getTotalCoin()+this.reward);
                    this.isRoundTimeReset();
                    MyGame.coinPosInfo.push([this.pos.x,this.pos.y,null]);
                    //播放金币获得音效
                    this.coinGetSound.play();
                    //被杀时删除碰撞列表
                    for(var i=0;i<MyGame.collideEnemyInfo.length;i++){
                        if(this.pos.x==MyGame.collideEnemyInfo[i][0]&&this.pos.y==MyGame.collideEnemyInfo[i][1]){
                            MyGame.collideEnemyInfo.splice(i,1);
                            break;
                        }
                    }
                };
                //this.deleteExistAnimal();
            },
            //判断是否回合结束
            isRoundTimeReset:function(){},
            //被杀时删除屏幕中的动物存储
            deleteExistAnimal:function(){},
            //敌方动物进入格子后不可点击
            animalCannotPoint:function(){}
        })
    }
)
