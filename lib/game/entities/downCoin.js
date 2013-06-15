/**
 * Content: 下落的金币
 * User: gjh
 * Date: 12-6-13
 * CreateTime: p.m 17:05
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.downCoin"
).requires(
    "impact.entity",
    "plugins.gameState"
).defines(
    function(){
        EntityDownCoin=ig.Entity.extend({
            size:{x:32,y:32},
            //奖励金币数
            reward:5,
            //移动速度
            maxVel:{x:0,y:50},
            //下落的金币的动画元素
            animSheet:new ig.AnimationSheet("media/downCoin.png",32,32),
            //碰撞类型为B
            //type:ig.Entity.TYPE.B,
            //定义碰撞检测类型为A
            checkAgainst:ig.Entity.TYPE.A,
            //动态碰撞定义为被动碰撞
            //collides:ig.Entity.COLLIDES.LITE,
            //是否为静态碰撞
            hasStaticCollide:false,
            //判断飞出屏幕没有
            isOut:false,
            //是否是清屏时删除
            isClear:false,
            health:0,
            //游戏对象类
            gameState:null,
            //金币获得音效
            coinGetSound:new ig.Sound('media/sound/coinGet.mp3', false),
            init:function (x, y, settings)
            {
                this.gameState=new GameState();
                this.vel.y=(settings.flip ? -this.maxVel.y : this.maxVel.y);
                this.addAnim("idle",0.1,[0,1,2]);
                this.parent(x, y, settings);
            },
            update:function ()
            {
                //判断是否出屏幕了
                if (this.vel.y < 0) {//向上飞行
                    this.isOut = !!(this.pos.y < ig.game.screen.y - this.size.y);
                }
                else {
                    this.isOut = !!(this.pos.y > ig.game.screen.y + ig.system.height +  this.size.y);
                }
                //静态碰撞并播放完动画
                if((this.hasStaticCollide&&this.currentAnim.loopCount>0)||this.isOut)
                {
                    this.kill();
                }
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
                if(!this.hasStaticCollide)
                {
                    this.receiveDamage(this.health,other);
                }
                this.parent(other);
            },
            collideWith:function(other,axis)
            {
                if(!this.hasStaticCollide)
                {
                    this.receiveDamage(this.health,other);
                }
                this.parent(other,axis);
            },
            receiveDamage:function (amount, from)
            {
                if(from.myEnemy=="my")
                {
                    this.kill();
                }
            },
            kill:function()
            {
                this.parent();
                if(!this.isOut&&!this.isClear){
                    //敌方动物被杀添加回合金币
                    this.gameState.setRoundCoin(this.gameState.getRoundCoin()+this.reward)
                    //敌方动物被杀添加总金币
                    this.gameState.setTotalCoin(this.gameState.getTotalCoin()+this.reward);
                    //播放金币获得音效
                    this.coinGetSound.play();
                };
            }
        })
    }
)
