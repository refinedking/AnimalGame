/**
* Content: 动物基类
* User: gjh
* Date: 12-5-23
* CreateTime: a.m 10:30
* UpdateTime:
* UpdateContent:
*/
ig.module(
    "smallgame.tigerwar.zhuahen"
).requires(
    "impact.entity"
).defines(function(){
    EntityZhuaHen=ig.Entity.extend({
        //大小
        size:{x:678, y:468},
        // 检测偏移
        offset:{x:0, y:0},
        //动物打斗动画原型
        //animSheet:new ig.AnimationSheet("media/smallgame/tigerwar/zhuahen.png",678,468),
        init:function (x, y, settings){
            this.addAnim("left",0.1,[0,1,2]);
            this.addAnim("right",0.1,[3,4,5]);
            this.parent(x, y, settings);
        },
        update:function (){
            this.parent();
        }
    })
});