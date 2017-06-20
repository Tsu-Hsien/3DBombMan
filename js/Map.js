var direct=[new THREE.Vector3(1,0,0),new THREE.Vector3(-1,0,0),new THREE.Vector3(0,0,1),new THREE.Vector3(0,0,-1)];
//new THREE.Vector3(0,0,0),

function createMap() {
  //地圖，1是箱子，2是不能破壞的格子
    var map = [
        [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,],
        [0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0,],
        [0, 1, 2, 0, 0, 0, 1, 0, 0, 0, 1, 1, 2, 1, 1, 0, 1, 1, 0, 0,],
        [0, 1, 0, 0, 2, 0, 1, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0,],
        [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0,],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,],
        [1, 1, 1, 0, 1, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0,],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0,],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1,],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0,],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 2, 0, 0, 0,],
        [1, 1, 2, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 2, 0, 0, 0,],
        [0, 0, 1, 0, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
        [1, 1, 1, 0, 0, 2, 0, 2, 0, 1, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0,],
        [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,],
        [0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0,]
    ];
	  totalCubesWide = map[0].length;
    for (var i = 0; i < totalCubesWide; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j]=="1") {
                var cube = new Crate();
                cube.add(i*5+cube.width/2,j*5+cube.length/2)
                CrateObjects.push(cube);
                CrateMesh.push(cube.mesh);
                collidableObjects.push(cube.mesh);
            }
            else if(map[i][j]=="2"){
              var rock = new Rock();
              rock.add(i*5+cube.width/2,j*5+cube.length/2)
              rockObjects.push(cube);
              rockMesh.push(rock.mesh);
              collidableObjects.push(rock.mesh);
            }
        }
    }
    mapSize = totalCubesWide * UNITWIDTH;
}
function collidableObjectsCheck(){//檢查玩家碰撞的物件中有那些已經不存在
    for(var i=0;i<collidableObjects.length;i++){
      if(collidableObjects[i].alive==false){
        scene.remove(collidableObjects[i]);
        collidableObjects.splice(i,1);//Array移除內容
      }
    }
}
