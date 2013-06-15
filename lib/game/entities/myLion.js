/**
 * Content: 我方狮子
 * User: gjh
 * Date: 12-5-25
 * CreateTime: a.m 11:52
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.myLion"
).requires(
    "interface.animal"
).defines(function(){
        EntityMyLion=EntityAnimal.extend({
            offset:{x:19,y:0},
            //动物ID
            animalID:5,
            //动物名称
            name:"EntityMyLion",
            //动物类型
            animalType:"lion",
            //可以直接杀死自己的动物类型
            againstAnimalType:"elephant",
            //自己可以直接杀死的动物类型
            killAnimalType :"tiger",
            //动物的血量
            health:50,
            healthTotal:50,
            //花费金币
            cost:17,
            //消耗的人口
            population:7,
            //动物敌我
            myEnemy:"my",
            //我方动物碰撞类型为A类
            type:ig.Entity.TYPE.A,
            //定义碰撞检测类型为B
            checkAgainst:ig.Entity.TYPE.B,
            //定义为主动碰撞
            collides:ig.Entity.COLLIDES.ACTIVE,
            //我方狮子动画元素
            animSheet:new ig.AnimationSheet("media/lion2.png",139,100),
            //死亡动画播放时间
            dieTime:1.2,
            init:function(x,y,settings){
                this.addAnim("idle",0.2,[11,11,11,12,13]);
                this.addAnim("fight",0.1,[10]);
                this.addAnim("die",0.2,[4,5,6,7,8,9]);
                this.gameState=new GameState();
                this.parent(x,y,settings);
            },
            update:function ()
            {
                this.parent();
            },
            collideWith:function(other,axis)
            {
                //MyGame.collideEnemyInfo.push([this.pos.x-this.size.x,this.pos.y,null]);
                this.parent(other,axis);
            },
            check:function(other){
                this.parent(other);
            },
            receiveDamage:function (amount, from)
            {
                this.parent(amount,from);
            },
            kill:function()
            {
                this.parent();
//                this.setPosEmpty();
                this.deleteExistAnimal();
            },
            //被杀时设置当前位置不被占用
            //setPosEmpty:function(){},
            //被杀时删除屏幕中的动物存储
            deleteExistAnimal:function(){}
        })
    })
