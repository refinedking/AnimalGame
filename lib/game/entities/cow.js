/**
 * Content: 我方猫
 * User: gjh
 * Date: 12-5-25
 * CreateTime: a.m 11:10
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.cow"
).requires(
    "interface.animal"
).defines(function(){
        EntityCow=EntityAnimal.extend({
            //offset:{x:19,y:0},
            //大小
            size:{x:242, y:100},
            //动物ID
            animalID:7,
            //动物名称
            name:"EntityCow",
            //动物的血量
            health:20000,
            //移动速度
            maxVel:{x:160,y:0},
            //动物敌我
            myEnemy:"cow",
            //我方动物碰撞类型为A类
            type:ig.Entity.TYPE.B,
            //定义碰撞检测类型为B
            checkAgainst:ig.Entity.TYPE.B,
            //定义为主动碰撞
            collides:ig.Entity.COLLIDES.NONE,
            //判断出屏幕没有
            isOut:false,
            //死亡动画播放时间
            dieTime:1.4,
            //动画元素
            animSheet:new ig.AnimationSheet("media/cow2.png",242,100),
            init:function(x,y,settings){
                this.vel.x=(settings.flip ? -this.maxVel.x : this.maxVel.x);
                this.addAnim("idle",0.1,[0,1,2]);
                /*this.addAnim("fight",0.1,[7]);
                this.addAnim("die",0.2,[2,3,4,5,6]);*/
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
                //this.animalCannotPoint();
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
                if(this.name==="EntityCow"){
                    other.receiveDamage(other.health+1,this);
                }
                this.parent(other);
            },
            collideWith:function(other,axis)
            {
                /*if(other.myEnemy==="enemy"){
                    this.vel.x=0;
                }*/
                this.parent(other,axis);
            },
            receiveDamage:function (amount, from)
            {
                this.parent(amount,from);
            },
            kill:function()
            {
                this.parent();
                //this.deleteExistAnimal();
            },
            deleteExistAnimal:function(){}
        })
    })

