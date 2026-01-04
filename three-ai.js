const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,100);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("aiCanvas"),
  alpha:true,
  antialias:true
});
renderer.setSize(window.innerWidth,window.innerHeight);

// Lights
scene.add(new THREE.AmbientLight(0xd4af37,.4));
const light = new THREE.PointLight(0xffffff,1);
light.position.set(3,3,4);
scene.add(light);

// Core
const core = new THREE.Mesh(
  new THREE.SphereGeometry(.6,64,64),
  new THREE.MeshStandardMaterial({
    color:0xd4af37,
    metalness:1,
    roughness:.2
  })
);
scene.add(core);

// Rings
const rings=[];
for(let i=0;i<4;i++){
  const ring=new THREE.Mesh(
    new THREE.TorusGeometry(1+i*.15,.01,16,100),
    new THREE.MeshStandardMaterial({color:0xd4af37})
  );
  ring.rotation.x=Math.random()*Math.PI;
  scene.add(ring);
  rings.push(ring);
}

function animate(){
  requestAnimationFrame(animate);
  core.rotation.y += .004;
  rings.forEach(r=>r.rotation.z += .002);
  renderer.render(scene,camera);
}
animate();

window.addEventListener("resize",()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
});
