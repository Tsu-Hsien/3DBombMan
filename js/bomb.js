var bombs=[];//炸彈陣列

// 載入炸彈
function loadBomb(){
	myPlayer.move.atk=false;
	var bomb=models.bomb.mesh.clone();
		var x=UNITWIDTH*parseInt(myPlayer.mesh.position.x/UNITWIDTH)+2.5+6;
		var z=UNITWIDTH*parseInt(myPlayer.mesh.position.z/UNITWIDTH)+4;
		bomb.scale.set(2.7,2.7,2.7);
    bomb.position.set(x,2.5,z);
    bombs.push(bomb);
		bomb.alive = true;
		setTimeout(function(){
			explode(bomb);
			bomb.alive = false;
			myPlayer.canAtk+=1;//可放的炸彈數量增加
		}, 1000);
	scene.add(bomb);
}

//檢查炸彈是否已經不存在
function bombsCheck(){//檢查那些炸彈已經不存在
	for(var index=0; index<bombs.length; index++){
		if( bombs[index] === undefined ) continue;
		if( bombs[index].alive == false ){
			scene.remove(bombs[index]);
			bombs.splice(index,1);//Array移除內容
			continue;
		}
	}
}

var fireNumber=0;
// 爆炸效果
function explode(bomb){//爆炸

	var bombfire = new BombFire() ;
	bombfire.setPosition(bomb) ;
	BombFires.push(bombfire) ;
}

// 檢查火焰是否已經燃燒完畢
function bombFiresCheck(){//確認火焰是否alive
	for(var index=0; index<BombFires.length; index++){
		if( BombFires[index] === undefined ) continue;
		if( BombFires[index].alive == false ){
			BombFires.splice(index,1);//Array移除內容
		}
		else { BombFires[index].firesCheck() ; }
	}
}

function detectFireCollision(fire,rotationMatrix) {
	var rayCaster = new THREE.Raycaster(fire.position.clone().sub(rotationMatrix.clone().multiplyScalar(UNITWIDTH)), rotationMatrix);
	var intersects= rayCaster.intersectObjects(playersMesh, true);
	for (var i = 0; i < intersects.length; i++) {
		if (intersects[i].distance < UNITWIDTH) { //火焰炸到玩家
				intersects[i].object.alive=false;
		}
	}
	rayCaster = new THREE.Raycaster(fire.position.clone().sub(rotationMatrix.clone().multiplyScalar(UNITWIDTH)), rotationMatrix);
	var intersects= rayCaster.intersectObjects(CrateMesh, true);
  for (var i = 0; i < intersects.length; i++) {
    if (intersects[i].distance < UNITWIDTH) { //火焰炸到箱子
			if (intersects[i].object.alive) {
				loadRandomItem( Math.floor(1 + (Math.random() * 5) ) , intersects[i].object.position ) ;
				intersects[i].object.alive=false;
					return true;
			}
    }
  }
	rayCaster = new THREE.Raycaster(fire.position, rotationMatrix);
	intersects= rayCaster.intersectObjects(rockMesh, true);
			  for (var i = 0; i < intersects.length; i++) {
			      if (intersects[i].distance < UNITWIDTH) { //火焰炸到柱子時不顯示火焰
			          return true;
			      }
			    }
			  return false;

}
