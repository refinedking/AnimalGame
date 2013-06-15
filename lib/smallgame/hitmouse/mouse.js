/**
* Content: 小游戏打地鼠实体
* User: wangbing
* Date: 12-6-12
* CreateTime: p.m 13:51
* UpdateTime:
* UpdateContent:
*/

ig.module(
    "smallgame.hitmouse.mouse"
).requires(
    "game.entities.myMouse"
).defines(function(){
    EntitySamllGameMouse=EntityMyMouse.extend({

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
