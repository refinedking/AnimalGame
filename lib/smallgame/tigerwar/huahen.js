/**
* Content: 动物基类
* User: gjh
* Date: 12-5-23
* CreateTime: a.m 10:30
* UpdateTime:
* UpdateContent:
*/
ig.module(
    "smallgame.tigerwar.huahen"
).requires(
    "impact.entity"
).defines(function(){
    EntityHuaHen=ig.Entity.extend({
        //大小
        size:{x:8, y:8},
        // 检测偏移
        offset:{x:0, y:0},
        //动物打斗动画原型
        //animSheet:new ig.AnimationSheet("media/smallgame/tigerwar/huahen.png",8,8),
        intervalTime:null,
        init:function (x, y, settings){
            this.addAnim("idle",0.1,[0]);
            this.intervalTime = new ig.Timer(1);
            this.parent(x, y, settings);
        },
        update:function (){
            this.currentAnim=this.anims.idle;
            if(this.intervalTime.delta() >= 0)
            {
                ig.game.removeEntity(this);
            }
            this.parent();
        }
    })
});