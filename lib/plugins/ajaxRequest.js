/**
 * Created with JetBrains WebStorm.
 * User: gjh
 * Date: 12-6-26
 * Time: 上午9:57
 * To change this template use File | Settings | File Templates.
 */
ig.module(
    "plugins.ajaxRequest"
).requires(
    "impact.impact"
).defines(function(){
        AjaxRequest=ig.Class.extend({
            //XMLHttpRequest对象
            //xmlHttpRequest:null,
            //请求类型
            requestType:"",
            //url地址
            url:"",
            //是否异步
            async:false,
            init:function(requestType,url,async){
                this.requestType=requestType;
                this.url=url;
                this.async=async;
            },
            send:function(string,callback){
                var xmlHttpRequest;
                if(window.XMLHttpRequest){
                    xmlHttpRequest=new XMLHttpRequest();
                }
                else{
                    xmlHttpRequest=new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlHttpRequest.onreadystatechange=function(){
                    ig.log(xmlHttpRequest.readyState+"   "+xmlHttpRequest.status);
                    if(xmlHttpRequest.readyState==4&&xmlHttpRequest.status==200){
                        callback(xmlHttpRequest.responseText);
                    }
                }
                if(this.requestType=="GET"){
                    xmlHttpRequest.open(this.requestType,this.url+"?t="+Math.random(),this.async);
                    xmlHttpRequest.send();
                }
                else if(this.requestType=="POST"){
                    xmlHttpRequest.open(this.requestType,this.url,this.async);
                    xmlHttpRequest.send(string);
                }
            }
        })
    })
