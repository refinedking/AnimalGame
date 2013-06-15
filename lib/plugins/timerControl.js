/**
 * Content: 时间控制类
 * User: gjh
 * Date: 12-5-29
 * CreateTime: a.m 11:05
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "plugins.timerControl"
).requires(
    "impact.impact"
).defines(function(){
        TimerControl=ig.Class.extend({
            //时间类间隔时间
            interval:0,
            //时间类
            intervalTime:null,
            init:function(interval){
                this.interval=interval;
                this.intervalTime=ig.Timer(this.interval);
            },
            delta:function(){
                return Math.ceil(this.intervalTime.delta());
            },
            reset:function(){
                this.intervalTime.reset();
            }
        })
    })