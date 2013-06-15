ig.module(
    "game.entities.smallGameEle2"
).requires(
    "impact.entity"
).defines(
    function(){
        EntitySmallGameEle2=ig.Entity.extend({
            //动物ID
            animalID:8,
            size:{x:240, y:200},
            offset:{x:20, y:0}, //偏移量
            //动物名称
            name:"smallGameEle2",
            //动物类型
            animalType:"elephant",
            //动物的血量
            health:60,
            healthTotal:60,
            //移动速度
            maxVel:{x:-150,y:0},
            //动物敌我
            myEnemy:"enemy",
            //敌方动物碰撞类型为B
            type:ig.Entity.TYPE.B,
            //定义碰撞检测类型为A
            //checkAgainst:ig.Entity.TYPE.A,
            //动态碰撞定义为被动碰撞
            collides:ig.Entity.COLLIDES.ACTIVE,
            //是否为静态碰撞
            hasStaticCollide:false,
            //游戏对象类
            gameState:null,
            //判断子弹飞出屏幕没有
            isOut:false,
            //敌方大象动画元素
            isDie:false,
            isOver:false,
            animSheet:new ig.AnimationSheet("media/smallgame/tigerwar/elephant2.png",240,200),
            init:function(x,y,settings){
                this.addAnim("idle",0.2,[0,1,2,3]);
                this.addAnim("fight",0.1,[24]);
                this.addAnim("die",0.3,[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]);
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
                    this.isOut = !!(this.pos.x > ig.game.screen.x + ig.system.width + this.size.x);
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
                this.vel.x = 0;
                if(this.isDie && !this.isOver)
                {
                    this.currentAnim=this.anims.die;
                }
                else if(!this.isDie && !this.isOver)
                {
                    this.currentAnim=this.anims.fight;
                }
                else
                {
                    this.currentAnim=this.anims.idle;
                }
                this.parent(other,axis);
            },
            receiveDamage:function(amount, from)
            {
                this.parent(amount,from);
            },
            kill:function()
            {
                this.parent();
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
