//ig.module(
//    "game.entities.smallGameTiger"
//).requires(
//    "impact.entity"
//).defines(function(){
//        EntitySmallGameTiger = ig.Entity.extend({
//            //大小 177 156
//            size:{x:492, y:476},
//            // 检测偏移
//            offset:{x:0, y:0},
//            //动物ID
//            animalID:7,
//            //动物名称
//            name:"EntitySmallGameTiger",
//            //动物类型
//            animalType:"smallgameTiger",
//            //动物的血量
//            health:99999,
//            //花费金币
//            cost:0,
//            //消耗的人口
//            population:0,
//            //动物敌我
//            myEnemy:"my",
//            //我方动物碰撞类型为A类
//            type:ig.Entity.TYPE.A,
//            //定义碰撞检测类型为B
//            checkAgainst:ig.Entity.TYPE.B,
//            //动态碰撞定义为被动碰撞
//            collides:ig.Entity.COLLIDES.ACTIVE,
//            //我方狼犬动画元素
//            animSheet:new ig.AnimationSheet("media/smallgame/tigerwar/elephant.png",240,200),
//            eatTimer:null,
//            init:function(x,y,settings){
//                this.eatTimer = new ig.Timer(3);
//                this.addAnim("idle",0.2,[0]);
//                this.addAnim("eat1",0.2,[1,2,3,4]);
//                this.addAnim("eat2",0.2,[5,6,7,8]);
//                this.parent(x,y,settings);
//            },
//            update:function ()
//            {
//                if(this.eatTimer.delta() < -1)
//                {
//                    this.eat = Math.random() > 0.5 ? "eat1":"eat2";
//                    this.currentAnim=this.anims.idle;
//                }
//                else if(this.eatTimer.delta() > -1 && this.eatTimer.delta() < 0)
//                {
//                    this.currentAnim=this.anims[this.eat];
//                }
//                else if(this.eatTimer.delta() > 0)
//                {
//                    this.eatTimer.reset();
//                }
//                this.parent();
//            }
//        });
//    })