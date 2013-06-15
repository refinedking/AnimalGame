/**
 * Content: 小游戏锤子
 * User: wangbing
 * Date: 12-5-23
 * CreateTime: a.m 10:30
 * UpdateTime:
 * UpdateContent:
 */

ig.module(
    "smallgame.hitmouse.hitter"
).requires(
    "impact.entity"
).defines(function(){
        EntityMyHitter=ig.Entity.extend({
            //大小
            size:{x:100, y:100},
            // 检测偏移
            offset:{x:0, y:0},
            //动物打斗动画原型
            animSheet:new ig.AnimationSheet("media/smallgame/hitmouse/mouse.png",100,100),

            init:function (x, y, settings){
                this.parent(x, y, settings);
                this.addAnim('idle',[0]);
                this.addAnim('hit',[0,1,2,3]);
            },
            update:function (){
                if(ig.input.state("click"))
                {
                    this.currentAnim = this.anims.hit;
                }
                else
                {
                    this.currentAnim = this.anims.idle;
                }
            }
        })
    })