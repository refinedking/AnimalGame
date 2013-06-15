/**
 * Content: 产生随机数帮助类
 * User: gjh
 * Date: 12-5-25
 * CreateTime: p.m 16:05
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "plugins.randomGenerate"
).requires(
    "impact.impact"
).defines(function(){
        RandomGenerate=ig.Class.extend({
            //产生的动物数
            count:0,
            //产生的动物id及路线id的数组
            animals:new Array(),
            //产生动物最小数
            minCount:0,
            //产生动物最大数
            maxCount:0,
            //产生的最小路线值
            minRoute:0,
            //产生的最大路线值
            maxRoute:0,
            //动物id及概率的详细信息数组
            animalDetails:new Array(),
            init:function (minCount,maxCount,minRoute,maxRoute,animalDetails) {
                this.minCount=minCount;
                this.maxCount=maxCount;
                this.minRoute=minRoute;
                this.maxRoute=maxRoute;
                for(var i=0;i<animalDetails.length;i++){
                    this.animalDetails.push({id:animalDetails[i].id,rate:animalDetails[i].rate});
                }
            },
            generate:function(){
                this.count=Math.floor(Math.random()*(this.maxCount-this.minCount+1))+this.minCount;
//                var id=this.animalDetails[0].id;
                var animalRandom=new Array();
                for(var i=0;i<=this.animalDetails.length-1;i++){
                    if(i==0){
                        animalRandom.push({id:this.animalDetails[i].id,random:this.animalDetails[i].rate});
                    }
                    else if(i>0&&i<this.animalDetails.length-1){
                        animalRandom.push({id:this.animalDetails[i].id,random:animalRandom[animalRandom.length-1].random+this.animalDetails[i].rate});
                    }
                    else{
                        animalRandom.push({id:this.animalDetails[i].id,random:100});
                    }
                }
                for(var j=0;j<=this.count-1;j++){
                    var randomCount=Math.ceil(Math.random()*100);
                    for(var k=0;k<=animalRandom.length-1;k++){
                        if(randomCount>(k == 0 ? 0 : animalRandom[k-1].random ) && randomCount <= animalRandom[k].random){
                            var randomRoute= Math.floor(Math.random()*(this.maxRoute-this.minRoute+1))+this.minRoute;
//                            var randomRoute= 5;
                            this.animals.push({id:animalRandom[k].id,route:randomRoute});
                            break;
                        }
                    }
                }
            }
        })

    })
