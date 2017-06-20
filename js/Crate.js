var UNITWIDTH=5;
var crategeometry = new THREE.CubeGeometry( UNITWIDTH, UNITWIDTH, UNITWIDTH);
var cratematerial = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('texture/crate0/crate0_diffuse.png') } );

// 箱子
var Crate = function() {//箱子物件
	this.mesh=new THREE.Mesh(crategeometry,cratematerial);
	this.mesh.alive=true;

  // 箱子裡的道具 , 0代表沒道具
	this.toolNumber=0;

	// 箱子大小
	this.length=UNITWIDTH;
	this.width=UNITWIDTH;
	this.height=UNITWIDTH;

	//載入箱子
	this.add=function(x,z){
    this.mesh.position.set(x,2.5,z);
    scene.add(this.mesh);
	}


}
