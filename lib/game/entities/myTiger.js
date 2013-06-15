/**
 * Content: 我方老虎
 * User: gjh
 * Date: 12-5-24
 * CreateTime: p.m 14:10
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "game.entities.myTiger"
).requires(
    "interface.animal"
).defines(function(){
        EntityMyTiger=EntityAnimal.extend({
            offset:{x:17,y:0},
            //动物ID
            animalID:4,
            //动物名称
            name:"EntityMyTiger",
            //动物类型
            animalType:"tiger",
            //可以直接杀死自己的动物类型
            againstAnimalType:"lion",
            //自己可以直接杀死的动物类型
            killAnimalType :"dog",
            //动物的血量
            health:40,
            healthTotal:40,
            //花费金币
            cost:10,
            //消耗的人口
            population:4,
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
            //我方老虎动画元素
            animSheet:new ig.AnimationSheet("media/tiger.png",130,100),
            init:function(x,y,settings){
                this.addAnim("idle",0.3,[10,11,12,13]);
                this.addAnim("fight",0.1,[9]);
                this.addAnim("die",0.2,[4,5,6,7,8]);
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
