/**
 * Content: 小游戏骨头实体
 * User: wangbing
 * Date: 12-6-18
 * CreateTime: p.m 16:00
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    "smallgame.eatbone.bone"
).requires(
    "interface.animal"
).defines(function(){
    EntityBone = ig.Entity.extend({
        //大小
        size:{x:60, y:60},
        // 检测偏移
        offset:{x:0, y:0},
        //动物ID
        animalID:7,
        //动物名称
        name:"EntityBone",
        //动物类型
        animalType:"bone",
        //动物的血量
        health:1,
        //奖励金币
        reward:0,
        //移动速度
        maxVel:{x:-300,y:0},
        //消耗人口
        persons:0,
        //出现概率
        appearRate:100,
        //敌方动物碰撞类型为B
        type:ig.Entity.TYPE.B,
        //定义碰撞检测类型为B
        //checkAgainst:ig.Entity.TYPE.A,
        //动态碰撞定义为被动碰撞
        collides:ig.Entity.COLLIDES.LITE,
        //是否为静态碰撞
        hasStaticCollide:false,
        //敌方狼犬动画元素
        animSheet:new ig.AnimationSheet("media/smallgame/eatbone/bone.png",60,60),
        init:function(x,y,settings){
            this.addAnim("idle",0.2,[0,1,2]);
            this.gameState=new GameState();
            this.parent(x,y,settings);
        },
        update:function ()
        {
            this.parent();
        },
        check:function(other){
            this.parent(other);
        },
//        collideWith:function(other,axis)
//        {
//            other.receiveDamage(other.health,this);
//            this.parent(other,axis);
//        },
        receiveDamage:function (amount, from)
        {
            this.parent(amount,from);
        },
        kill:function()
        {
            this.parent();
        }
    })
})