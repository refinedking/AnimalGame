/**
 * Content: 我方狼犬
 * User: gjh
 * Date: 12-5-25
 * CreateTime: a.m 11:50
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.myDog"
).requires(
    "interface.animal"
).defines(function(){
        EntityMyDog=EntityAnimal.extend({
            offset:{x:2,y:0},
            //动物ID
            animalID:3,
            //动物名称
            name:"EntityMyDog",
            //动物类型
            animalType:"dog",
            //可以直接杀死自己的动物类型
            againstAnimalType:"tiger",
            //自己可以直接杀死的动物类型
            killAnimalType :"cat",
            //动物的血量
            health:30,
            healthTotal:30,
            //花费金币
            cost:5,
            //消耗的人口
            population:2,
            //动物敌我
            myEnemy:"my",
            //我方动物碰撞类型为A类
            type:ig.Entity.TYPE.A,
            //定义碰撞检测类型为B
            checkAgainst:ig.Entity.TYPE.B,
            //定义为主动碰撞
            collides:ig.Entity.COLLIDES.ACTIVE,
            //死亡动画播放时间
            dieTime:1.0,
            //我方狼犬动画元素
            animSheet:new ig.AnimationSheet("media/dog.png",102,100),
            init:function(x,y,settings){
                this.addAnim("idle",0.3,[8,9,10,9,8,11]);
                this.addAnim("fight",0.1,[7]);
                this.addAnim("die",0.2,[2,3,4,5,6]);
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
//                this.setPosEmpty();
                this.deleteExistAnimal();
            },
            //被杀时设置当前位置不被占用
//            setPosEmpty:function(){},
            //被杀时删除屏幕中的动物存储
            deleteExistAnimal:function(){}
        })
    })
