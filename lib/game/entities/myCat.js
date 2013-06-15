/**
 * Content: 我方猫
 * User: gjh
 * Date: 12-5-25
 * CreateTime: a.m 11:10
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.myCat"
).requires(
    "interface.animal"
).defines(function(){
        EntityMyCat=EntityAnimal.extend({
            offset:{x:10,y:0},
            //动物ID
            animalID:2,
            //动物名称
            name:"EntityMyCat",
            //动物类型
            animalType:"cat",
            //可以直接杀死自己的动物类型
            againstAnimalType:"dog",
            //自己可以直接杀死的动物类型
            killAnimalType :"mouse",
            //动物的血量
            health:20,
            healthTotal:20,
            //花费金币
            cost:4,
            //消耗的人口
            population:1,
            //动物敌我
            myEnemy:"my",
            //我方动物碰撞类型为A类
            type:ig.Entity.TYPE.A,
            //定义碰撞检测类型为B
            checkAgainst:ig.Entity.TYPE.B,
            //定义为主动碰撞
            collides:ig.Entity.COLLIDES.ACTIVE,
            //死亡动画播放时间
            dieTime:1.4,
            //我方猫动画元素
            animSheet:new ig.AnimationSheet("media/cat.png",111,100),
            init:function(x,y,settings){
                this.addAnim("idle",0.2,[12,12,12,13,14,15]);
                this.addAnim("fight",0.1,[11]);
                this.addAnim("die",0.2,[4,5,6,7,8,9,10]);
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
                //MyGame.collideEnemyInfo.push([this.pos.x-this.size.x,this.pos.y,null]);
                this.parent(other,axis);
            },
            receiveDamage:function (amount, from)
            {
                this.parent(amount,from);
            },
            kill:function()
            {
                this.parent();
                //this.setPosEmpty();
//                this.deleteExistAnimal();
            },
            //被杀时设置当前位置不被占用
           // setPosEmpty:function(){},
            //被杀时删除屏幕中的动物存储
            deleteExistAnimal:function(){}
        })
    })
