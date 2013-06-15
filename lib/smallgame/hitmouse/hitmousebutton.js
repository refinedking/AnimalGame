ig.module(
    'smallgame.hitmouse.hitmousebutton'
).requires(
    'impact.entity'
).defines(function () {
        HitMouseButton = ig.Entity.extend({
            // 大小
            size:{ x:96, y:96 },
            //位置
            //location:{x:0, y:0},
            //状态
            state:'idle',
            zIndex:10000,
            _oldPressed:false,
            _startedIn:false,

            areaArray:null,
//           animalID:null,
//            overNum:null,

//            disappearTimer:new ig.Timer(),
//            appearTimer:new ig.Timer(),
//            dieTimer:new ig.Timer(1),

            init:function (x, y, settings) {
                this.parent(x, y, settings);
                //this.addAnim('appera', 0.3, [0,1,2]);
                //this.addAnim('disappera', 0.5, [5]);
                this.addAnim('idle', 0.5, [3,4,3,4]);
                //this.addAnim('die', 0.5, [5,6,5,6,0]);
                // 时间管理
//                this.disappearTimer.set(1);
//                this.appearTimer.set(0.3);
//                this.dieTimer.set(0.5);
            },

            update:function () {
                for(var i=0; i < this.areaArray.length;i++)
                {
                    if(this.areaArray[i][2])
                    {
                        if(this.areaArray[i][3]==0){
                            this.areaArray[i][3] = new ig.Timer(1);
                        }
                        if(this.areaArray[i][3].delta() > 0)
                        {
                            ig.game.removeEntity(this);
                            this.areaArray[i][3] = 0
                            this.areaArray[i][2] = false;
                        }
                    }
                }

                //this.currentAnim = this.anims.idle;

//                for(var i=0; i < this.areaArray.length;i++)
//                {
//                    if(this.areaArray[i][2] && typeof this.areaArray[i][3] == "number")
//                    {
//                        this.areaArray[i][3] = new ig.Timer(1);
//                    }
//                    else if(this.areaArray[i][2] && typeof this.areaArray[i][3] == "object")
//                    {
//                        this.areaArray[i][3].delta();
//                        if(this.areaArray[i][3].delta() > 0)
//                        {
//                            //this.disappearTimer.reset();
//                            //if(this.disappearTimer.delta() > 0)
//                            //{
//                                //this.currentAnim = this.anims.disappera;
//                                ig.game.removeEntity(this);
//                                this.areaArray[i][3] = 0
//                                this.areaArray[i][2] = false;
//                            //}
//                            //this.currentAnim = this.anims.disappera;
////                            ig.game.removeEntity(this);
////                            this.areaArray[i][3] = 0
////                            this.areaArray[i][2] = false;
//                        }
//                        else
//                        {
//                            this.currentAnim = this.anims.idle;
//                        }
//                    }
//                }

                if (this.state !== 'hidden') {
                    //获取按下状态
                    var _clicked = ig.input.pressed('click');
                    //获取持续按下状态
                    var _stated = ig.input.state('click');
                    //获取松开状态
                    var _released = ig.input.released('click');
                    //发生在按钮内部
                    if(this.state !== 'deactive'&&this._inButton()){
                        if(_clicked){
                            //this.dieTimer.reset();
                            this.currentAnim = this.anims.die;
                            this.pressedDown();
                        }
                        if(_stated){
                            this.currentAnim = this.anims.die;
                            this.pressed();
                        }
                        if(_released){
                            this.currentAnim = this.anims.die;
                            this.pressedUp();
                        }
                    }
                    else if (this.state === 'active') {
                        this.setState('idle');
                    }
                    else if (this.state === 'deactive') {
                        this.setState('deactive');
                    }

                    this.backgroundChange();
                    this.parent();
                }
            },

            draw:function () {
                this.parent();
            },

            //设置动画
            setState:function (s) {
                this.state = s;
                if (this.state !== 'hidden') {
                    this.currentAnim = this.anims[ this.state ];
                }
            },

            //按下的方法
            pressedDown:function () {
            },
            //点击事件方法
            pressed:function () {
            },
            //释放方法
            pressedUp:function () {
            },

            //获取是不是在按钮范围内点击
            _inButton:function () {
                return ig.input.mouse.x + ig.game.screen.x > this.pos.x &&
                    ig.input.mouse.x + ig.game.screen.x < this.pos.x + this.size.x &&
                    ig.input.mouse.y + ig.game.screen.y > this.pos.y &&
                    ig.input.mouse.y + ig.game.screen.y < this.pos.y + this.size.y;
            },
            backgroundChange:function(){}
        });
    });