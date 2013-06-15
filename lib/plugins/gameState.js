/**
 * Content: 游戏状态实体
 * User: gjh
 * Date: 12-5-23
 * CreateTime: a.m 11:00
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "plugins.gameState"
).requires(
    "impact.impact",
    "impact.storage",
    "impact.json"
).defines(function(){
        GameState=ig.Class.extend({
            //金币总和
            totalCoin:0,
            //当前回合金币数
            roundCoin:0,
            //回合获得最高金币数
            roundHighestCoin:0,
            //当前回合剩余动物数组
            roundRemainAnimals:null,
            //回合人口
            roundCount:0,
            //当前排行
            rank:0,
            //击败的百分比
            defeatPercentage:0,
            //本地存储类
            storage:null,
            //json类
            json:null,
            //存在屏幕中的我方动物
            existMyAnimals:null,
            //存在屏幕中的地方动物
            existEnemyAnimals:null,
            //屏幕中下落的金币
            downCoins:null,
            //挑战的关数
            challengeRound:0,
            //挑战最高获得的金币数
            highChallengeCoin:0,
            //获得牛群冲击次数
            cowsCount:0,
            //玩游戏的总时间
            gameTotalTime:0,
            //是否第一次玩游戏
            isFirst:0,
            init:function(){
                this.storage=new ig.Storage();
                this.json=new ig.Json();
            },
            setIsFirst:function(isFirst){
                this.storage.set("isFirst",isFirst);
                this.isFirst=isFirst;
            },
            isExistIsFirst:function(){
                return this.storage.get("isFirst")!=null;
            },
            getCowsCount:function(){
                this.cowsCount=(this.storage.get("cowsCount")==null?0:parseInt(this.storage.get("cowsCount")));
                return this.cowsCount;
            },
            setCowsCount:function(cowsCount){
                this.storage.set("cowsCount",cowsCount);
                this.cowsCount=cowsCount;
            },
            isExistCowsCount:function(){
                return this.storage.get("cowsCount")!=null;
            },
            getGameTotalTime:function(){
                this.gameTotalTime=(this.storage.get("gameTotalTime")==null?0:parseInt(this.storage.get("gameTotalTime")));
                return this.gameTotalTime;
            },
            setGameTotalTime:function(gameTotalTime){
                this.storage.set("gameTotalTime",gameTotalTime);
                this.gameTotalTime=gameTotalTime;
            },
            isExistGameTotalTime:function(){
                return this.storage.get("gameTotalTime")!=null;
            },
            getTotalCoin:function(){
                this.totalCoin=(this.storage.get("totalCoin")==null?0:parseInt(this.storage.get("totalCoin")));
                return this.totalCoin;
            },
            setTotalCoin:function(totalCoin){
                this.storage.set("totalCoin",totalCoin);
                this.totalCoin=totalCoin;
            },
            isExistTotalCoin:function(){
                return this.storage.get("totalCoin")!=null;
            },
            getChallengeRound:function(){
                this.challengeRound=(this.storage.get("challengeRound")==null?0:parseInt(this.storage.get("challengeRound")));
                return this.challengeRound;
            },
            setChallengeRound:function(challengeRound){
                this.storage.set("challengeRound",challengeRound);
                this.challengeRound=challengeRound;
            },
            isExistChallengeRound:function(){
                return this.storage.get("challengeRound")!=null;
            },
            removeChallengeRound:function(){
                this.storage.remove("challengeRound");
            },
            getHighChallengeCoin:function(){
                this.highChallengeCoin=(this.storage.get("highChallengeCoin")==null?0:parseInt(this.storage.get("highChallengeCoin")));
                return this.highChallengeCoin;
            },
            setHighChallengeCoin:function(highChallengeCoin){
                this.storage.set("highChallengeCoin",highChallengeCoin);
                this.highChallengeCoin=highChallengeCoin;
            },
            isExistHighChallengeCoin:function(){
                return this.storage.get("highChallengeCoin")!=null;
            },
            getRoundCoin:function(){
//                var x=this.storage.get("roundCoin")==null;
                this.roundCoin=(this.storage.get("roundCoin")==null?0:parseInt(this.storage.get("roundCoin")));
                return this.roundCoin;
            },
            setRoundCoin:function(roundCoin){
                this.storage.set("roundCoin",roundCoin);
                this.roundCoin=roundCoin;
            },
            getRoundHighestCoin:function(){
                this.roundHighestCoin=this.storage.get("roundHighestCoin")==null?0:parseInt(this.storage.get("roundHighestCoin"));
                return this.roundHighestCoin;
            },
            setRoundHighestCoin:function(roundHighestCoin){
                this.storage.set("roundHighestCoin",roundHighestCoin);
                this.roundHighestCoin=roundHighestCoin;
            },
            getRoundRemainAnimals:function(){
                this.roundRemainAnimals=this.json.parse(this.storage.get("roundRemainAnimals"));
                return this.roundRemainAnimals;
            },
            setRoundRemainAnimals:function(roundRemainAnimals){
                this.storage.set("roundRemainAnimals",this.json.stringify(roundRemainAnimals));
                this.roundRemainAnimals=roundRemainAnimals;
            },
            isExistRoundRemainAnimals:function(){
                return this.storage.get("roundRemainAnimals")!=null;
            },
            getExistMyAnimals:function(){
                this.existMyAnimals=this.json.parse(this.storage.get("existMyAnimals"));
                return this.existMyAnimals;
            },
            setExistMyAnimals:function(existMyAnimals){
                this.storage.set("existMyAnimals",this.json.stringify(existMyAnimals));
                this.existMyAnimals=existMyAnimals;
            },
            isExistExistMyAnimals:function(){
                return this.storage.get("existMyAnimals")!=null;
            },
            removeExistMyAnimals:function(){
                this.storage.remove("existMyAnimals");
            },
            getExistEnemyAnimals:function(){
                this.existEnemyAnimals=this.json.parse(this.storage.get("existEnemyAnimals"));
                return this.existEnemyAnimals;
            },
            setExistEnemyAnimals:function(existEnemyAnimals){
                this.storage.set("existEnemyAnimals",this.json.stringify(existEnemyAnimals));
                this.existEnemyAnimals=existEnemyAnimals;
            },
            isExistExistEnemyAnimals:function(){
                return this.storage.get("existEnemyAnimals")!=null;
            },
            removeExistEnemyAnimals:function(){
                this.storage.remove("existEnemyAnimals");
            },
            getExistDownCoins:function(){
                this.downCoins=this.json.parse(this.storage.get("downCoins"));
                return this.downCoins;
            },
            setExistDownCoins:function(downCoins){
                this.storage.set("downCoins",this.json.stringify(downCoins));
                this.downCoins=downCoins;
            },
            removeExistDownCoins:function(){
                this.storage.remove("downCoins");
            },
            isExistDownCoins:function(){
                return this.storage.get("downCoins")!=null;
            },
            getRoundCount:function(){
                this.roundCount=this.storage.get("roundCount")==null?0:parseInt(this.storage.get("roundCount"));
                return this.roundCount;
            },
            setRoundCount:function(roundCount){
                this.storage.set("roundCount",roundCount);
                this.roundCount=roundCount;
            },
            isExistRoundCount:function(){
                return this.storage.get("roundCount")!=null;
            },
            getRank:function(){
                this.rank=this.storage.get("rank")==null?0:parseInt(this.storage.get("rank"));
                return this.rank;
            },
            setRank:function(rank){
                this.storage.set("rank",rank);
                this.rank=rank;
            },
            getDefeatPercentage:function(){
                this.defeatPercentage=this.storage.get("defeatPercentage")==null?0:parseInt(this.storage.get("defeatPercentage"));
                return this.defeatPercentage;
            },
            setDefeatPercentage:function(defeatPercentage){
                this.storage.set("defeatPercentage",defeatPercentage);
                this.defeatPercentage=defeatPercentage;
            },
            removeAnimalsStorage:function(){
                this.storage.remove("roundRemainAnimals");
            },
            removeRoundCoinStorage:function(){
                this.storage.remove("roundCoin");
            }
        })
    })