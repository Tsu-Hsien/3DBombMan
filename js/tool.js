function loadRandomItem( randomNumber , position ) {
  //隨機生成道具
  switch ( randomNumber ) {
    case 1:
      loadFirePowerItem(position);
      break;
    case 2:
      loadSpeedItem(position);
      break;
    case 3:
      break;
    default:
  }
}

function loadFirePowerItem(position) {
  var item=models.tool.power.mesh.clone();
  item.scale.set(2,2,2);
  //載入
  item.position.set(position.x,position.y-0.5,position.z);
  item.alive = true;
  scene.add(item);
  toolFirstMesh.push(item);
}


function loadSpeedItem(position) {
  var item=models.tool.speed.mesh.clone();
  item.scale.set(.05,.05,.05);

  //載入
  item.position.set(position.x,position.y-0.5,position.z);
  item.alive = true;
  scene.add(item);
  toolSecondMesh.push(item);
}

function checkToolFirstMesh(Vector){
  //console.log(Vector);
  for(var index=0; index<toolFirstMesh.length; index++){
    console.log(toolFirstMesh[index].position.distanceTo(Vector));
    if( toolFirstMesh[index].position.distanceTo(Vector)<UNITWIDTH*1.5 ){
      scene.remove(toolFirstMesh[index]);
      toolFirstMesh.splice(index,1);//Array移除內容

    }
  }
}

function checkToolSecondMesh(Vector){
  //console.log(Vector);
  for(var index=0; index<toolSecondMesh.length; index++){
    if( toolSecondMesh[index].position.distanceTo(Vector)<UNITWIDTH*1.5 ){
      scene.remove(toolSecondMesh[index]);
      toolFirstMesh.splice(index,1);//Array移除內容

    }
  }
}
