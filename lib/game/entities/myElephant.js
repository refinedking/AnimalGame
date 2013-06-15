/**
 * Content: 我方大象
 * User: gjh
 * Date: 12-5-25
 * CreateTime: a.m 11:53
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.myElephant"
).requires(
    "interface.animal"
).defines(function(){
        EntityMyElephant=EntityAnimal.extend({
            offset:{x:10,y:0},
            //动物ID
            animalID:6,
            //动物名称
            name:"EntityMyElephant",
            //动物类型
            animalType:"elephant",
            //可以直接杀死自己的动物类型
            againstAnimalType:"mouse",
            //自己可以直接杀死的动物类型
            killAnimalType :"lion",
            //动物的血量
            health:60,
            healthTotal:60,
            //花费金币
            cost:17,
            //消耗的人口
            population:8,
            //动物敌我
            myEnemy:"my",
            //我方动物碰撞类型为A类
            type:ig.Entity.TYPE.A,
            //定义碰撞检测类型为B
            checkAgainst:ig.Entity.TYPE.B,
            //定义为主动碰撞
            collides:ig.Entity.COLLIDES.ACTIVE,
            //我方大象动画元素
            animSheet:new ig.AnimationSheet("media/elephant2.png",118,100),
            //死亡动画播放时间
            dieTime:1.2,
            init:function(x,y,settings){
                this.addAnim("idle",0.3,[11,12,13,14,15,16,17,18,19]);
                this.addAnim("fight",0.1,[10]);
                this.addAnim("die",0.2,[4,5,6,7,8,9]);
                this.parent(x,y,settings);
            },
            update:function ()
            {
                this.parent();
            },
            check:function(other){
                this.parent(other);
            },
            collideWith:function(other,axis)
            {
                this.parent(other,axis);
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
//            setPosEmpty:function(){},
            //被杀时删除屏幕中的动物存储
            deleteExistAnimal:function(){}
        })
    })
