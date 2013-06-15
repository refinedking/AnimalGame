/**
 * Content: 小游戏打地鼠实体
 * User: wangbing
 * Date: 12-6-12
 * CreateTime: p.m 13:51
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    "game.entities.smallGameDog"
).requires(
    "impact.entity"
).defines(function(){
    EntitySmallGameDog = ig.Entity.extend({
        //大小 177 156
        size:{x:119, y:119},
        // 检测偏移
        offset:{x:0, y:0},
        //动物ID
        animalID:7,
        //动物名称
        name:"EntitySmallGameDog",
        //动物类型
        animalType:"smallgamedog",
        //动物的血量
        health:99999,
        //花费金币
        cost:0,
        //消耗的人口
        population:0,
        //动物敌我
        myEnemy:"my",
        //我方动物碰撞类型为A类
        type:ig.Entity.TYPE.A,
        //定义碰撞检测类型为B
        checkAgainst:ig.Entity.TYPE.B,
        //动态碰撞定义为被动碰撞
        collides:ig.Entity.COLLIDES.ACTIVE,
        //我方狼犬动画元素
        animSheet:new ig.AnimationSheet("media/smallgame/eatbone/dog.png",159,140),
        eatTimer:null,
        eat:null,
        overnum:0,
        eatboneSound:new ig.Sound('media/sound/smallgame/eatbone.mp3', false),
        init:function(x,y,settings){
            this.addAnim("idle",0.1,[0]);
            this.addAnim("eat1",0.2,[0,2,3,4,5,0])
            this.addAnim("eat2",0.15,[0,1,0,1]);
            this.overnum = 0;
            this.eatTimer = new ig.Timer(3);
            this.parent(x,y,settings);
        },
        update:function ()
        {
            if(this.eatTimer.delta() < -1)
            {
                this.eat = Math.random() > 0.5 ? "eat1":"eat2";
                this.currentAnim=this.anims.idle;
            }
            else if(this.eatTimer.delta() > -1 && this.eatTimer.delta() < 0)
            {
                this.currentAnim=this.anims[this.eat];
            }
            else if(this.eatTimer.delta() > 0)
            {
                this.eatTimer.reset();
            }

            this.parent();
        },
        collideWith:function(other,axis)
        {
            this.eatboneSound.play();
            this.overnum++;
            other.receiveDamage(other.health,this);
            this.parent(other,axis);
        },
//        check:function(other){
//            this.parent(other);
//        },
//        collideWith:function(other,axis)
//        {
//            this.parent(other,axis);
//        },
//        receiveDamage:function (amount, from)
//        {
//            this.parent(amount,from);
//        },
//        kill:function()
//        {
//            this.parent();
//            this.setPosEmpty();
//            this.deleteExistAnimal();
//        },
        //被杀时设置当前位置不被占用
        setPosEmpty:function(){},
        //被杀时删除屏幕中的动物存储
        deleteExistAnimal:function(){}
    });
})