/**
 * Content: 小游戏找茬猫实体
 * User: wangbing
 * Date: 12-6-14
 * CreateTime: p.m 13:51
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    "smallgame.zhaocha.cat"
).requires(
    "game.entities.myCat"
).defines(function(){
    EntitySamllGameC=EntityMyCat.extend({
        animSheet:new ig.AnimationSheet("media/cat.png",100,100),
        position:{x:0,y:0},
        init:function(x,y,settings)
        {
            this.addAnim('idle',0.1,[0]);
            this.parent(x,y,settings);
        },
        update:function()
        {
            // TODO 设置一些动画  加深游戏趣味性
        }
    });
})
