ig.module( 'game.levels.tigerwar' )
    .requires('impact.image')
    .defines(function(){
        LevelTigerwar=/*JSON[*/{"entities":[{"type":"EntitySmallGameEle1","x":-240,"y":320},{"type":"EntitySmallGameEle2","x":960,"y":320}],"layer":[{"name":"background","width":3,"height":2,"linkWithCollision":false,"visible":1,"tilesetName":"media/smallgame/tigerwar/background.png","repeat":false,"preRender":false,"distance":"1","tilesize":320,"foreground":false,"data":[[1,2,3],[4,5,6]]}]}/*]JSON*/;
        LevelTigerwarResources=[new ig.Image('media/smallgame/tigerwar/background.png')];
    });