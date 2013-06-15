/**
 * Content: 小游戏打地鼠实体
 * User: wangbing
 * Date: 12-6-12
 * CreateTime: p.m 13:51
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    "game.entities.smallGameFight"
).requires(
    "impact.entity"
).defines(function(){
        EntitySmallGameFight = ig.Entity.extend({
            //大小 177 156
            size:{x:150, y:150},
            // 检测偏移
            offset:{x:0, y:0},
            //动物ID
            animalID:9,
            //动物名称
            name:"EntitySmallGameFight",
            //动物类型
            animalType:"smallgamefight",
            //动物的血量
            health:99999,
            //花费金币
            cost:0,
            //消耗的人口
            population:0,
            //动物敌我
            myEnemy:"my",
            //我方动物碰撞类型为A类
            //type:ig.Entity.TYPE.A,
            //定义碰撞检测类型为B
            //checkAgainst:ig.Entity.TYPE.B,
            //动态碰撞定义为被动碰撞
            //collides:ig.Entity.COLLIDES.ACTIVE,
            //我方狼犬动画元素
            isDie:false,
            animSheet:new ig.AnimationSheet("media/animalFight.png",150,150),
            fightTimer:null,
            init:function(x,y,settings){
                this.addAnim("idle",0.1,[0,1,2]);
                this.parent(x,y,settings);
            },
            update:function ()
            {
                this.currentAnim=this.anims.idle;
                if(this.isDie)
                {
                    this.kill();
                }
                this.parent();
            }
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
//        }
        });
    })