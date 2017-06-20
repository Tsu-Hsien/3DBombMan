var BombFires = [] ;
//var

// 每個炸彈的火焰特效

var BombFire = function() {
  this.fireNumber = 0 ;
  this.fireTex = THREE.ImageUtils.loadTexture("texture/Fire.png"); //火焰圖片
  this.alive = true;
  this.fires=[];//火焰的陣列

  this.setPosition=function(bomb){
    var x=UNITWIDTH*parseInt(bomb.position.x/UNITWIDTH)-2.5;
		var z=UNITWIDTH*parseInt(bomb.position.z/UNITWIDTH)+2.5;
    for(var j=0;j<direct.length;j++)
    {
      for(var i=1;i<=myPlayer.fire;i++) // myPlayer.fire = 火焰範圍
      {
        // 生成火焰
        var fire= new THREE.Fire(this.fireTex);
        fire.position.set(x,2.5,z).add(direct[j].clone().multiplyScalar(i*UNITWIDTH));
        fire.scale.set(5,9,5);
        fire.alive = true;
        this.fires.push(fire);
        scene.add(fire);
        this.fireNumber++;
        if(detectFireCollision(fire,direct[j])){//火焰的碰撞
          break;
        }
      }
    }

    var fireNumber = this.fireNumber ;
    var fires = this.fires ;
    setTimeout(function(){
        // 設置火焰的燃燒時間
        for(var k=0;k<fireNumber;k++){//火焰消失
        fires[k].alive = false;}
    }, 1000);
  }

  // 檢查火焰是否已經燃燒完畢
  this.firesCheck = function(){//確認火焰是否alive
  	for(var index=0; index<this.fires.length; index++){
  		if( this.fires[index] === undefined ) continue;
  		if( this.fires[index].alive == false ){
  			scene.remove(this.fires[index]);
  			this.fires.splice(index,1);//Array移除內容
  		}
  		//else if(fires[index].alive)scene.add(fires[index]);
  	}
    if( this.fires.length == 0 ) this.alive = false ;
  }

}
