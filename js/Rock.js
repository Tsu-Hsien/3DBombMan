var rockgeometry = new THREE.CubeGeometry( UNITWIDTH, UNITWIDTH, UNITWIDTH);
var rockmaterial = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('texture/rock.jpg') } );

// 柱子
var Rock = function() {
	this.mesh=new THREE.Mesh(rockgeometry,rockmaterial);
	this.mesh.alive=true;  //??沒有用 

	// 柱子大小
	this.length=UNITWIDTH;
	this.width=UNITWIDTH;
	this.height=UNITWIDTH;

	// 載入柱子
	this.add=function(x,z){
    this.mesh.position.set(x,2.5,z);
    scene.add(this.mesh);
	}
}
