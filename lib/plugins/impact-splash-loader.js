// plugins/impact-splash-loader.js
ig.baked = true;
ig.module(
    'plugins.impact-splash-loader'
).requires(
    'impact.loader'
).defines(function () {
    ig.ImpactSplashLoader = ig.Loader.extend({
        logoWidth:239,
        logoHeight:487,
        _drawStatus:0,
        draw:function () {
            this._drawStatus += (this.status - this._drawStatus)/5;
            //ig.log(this.status+"  "+this._drawStatus);
            var ctx = ig.system.context;
            var w = ig.system.realWidth;
            var h = ig.system.realHeight;
            ctx.drawImage(ig.ImpactSplashLoader.LOADER_background, 0, 0);
            ctx.fillStyle = '#ff0000';
            ctx.textAlign = 'right';
            ctx.font = '20px Arial';
            ctx.fillText('openSystem china', w - 10, h - 10);
            ctx.textAlign = 'left';
            ctx.save();
            ctx.drawImage(ig.ImpactSplashLoader.LOADER_progressBar,
                0,
                0,
                ig.ImpactSplashLoader.LOADER_progressBar.width * this.status,
                ig.ImpactSplashLoader.LOADER_progressBar.height,
                this.logoWidth,
                this.logoHeight,
                ig.ImpactSplashLoader.LOADER_progressBar.width * this.status,
                ig.ImpactSplashLoader.LOADER_progressBar.height);
            ctx.restore();
        }
    });
    var back = new Image();
    back.src = 'media/loaderBack.png';
    var progressBar = new Image();
    progressBar.src = 'media/progressBar.png';
    ig.ImpactSplashLoader.LOADER_background = back;
    ig.ImpactSplashLoader.LOADER_progressBar = progressBar;
});