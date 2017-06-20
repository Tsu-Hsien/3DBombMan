
var Player = function(mesh,id) {
	this.mesh=mesh;
	this.mesh.alive=true;
	this.id=id;
	this.fire=2;  // player的可爆炸範圍
	this.speed=1; // player的移動速度
	this.canAtk=2; // player的可放的炸彈數量
	this.mesh.scale.set( 0.05, 0.05, 0.05 );  // player物件object的放大倍率
	this.move={right:false,left:false,up:false,down:false,atk:false}
	this.mixer = new THREE.AnimationMixer( this.mesh );
	this.mixer.clipAction( this.mesh.geometry.animations[ 0 ] ).setDuration( 1 ).play();
	this.update=function(){
		if(!this.mesh.alive){
			scene.remove(this.mesh);
			this.fire=0;  // player的可爆炸範圍
			this.canAtk=0; // player的可放的炸彈數量
		}
		if(this.mixer)this.mixer.update( 0.02 );
	}
	// 玩家攻擊
	this.Attack=function(){
		if(this.canAtk>0){
			loadBomb();
			this.canAtk-=1;
		}
	}
	//this.update();
	// 判定玩家的行走方向是否可走
	this.detectPlayerCollision=function() {
    var rotationMatrix;

    if (this.move.down) {
        rotationMatrix = new THREE.Vector3(0,0,1);
    }
    else if (this.move.left) {
        rotationMatrix = new THREE.Vector3(-1,0,0);
    }
    else if (this.move.right) {
        rotationMatrix = new THREE.Vector3(1,0,0);
    }

    else if (this.move.up) {
			rotationMatrix = new THREE.Vector3(0,0,-1);
    }

    var rayCaster = new THREE.Raycaster(this.mesh.position, rotationMatrix);

    if (this.mesh.alive&&rayIntersect(this,rayCaster, PLAYERCOLLISIONDISTANCE)) {
        return true;
    } else {
        return false;
    }
	}
}


function rayIntersect(player,ray, distance) {
		var intersects = ray.intersectObjects(toolFirstMesh, true);
		for (var i = 0; i < intersects.length; i++) {
				if (intersects[i].distance < UNITWIDTH*1.5) {
						player.fire+=1;
						checkToolFirstMesh(player.mesh.position.clone());
				}
		}

		intersects = ray.intersectObjects(toolSecondMesh, true);
		for (var i = 0; i < intersects.length; i++) {
				if (intersects[i].distance < UNITWIDTH) {
						player.speed+=0.005;
						intersects[i].object.alive=false;
					  checkToolSecondMesh(player.mesh.position.clone());
				}
		}

    intersects = ray.intersectObjects(collidableObjects, true);
    for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].distance < distance) {
            return true;
        }
    }
    return false;
}
