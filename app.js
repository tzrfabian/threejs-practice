import * as THREE from './three.js/build/three.module.js';

function Run(){
    const scene = new THREE.Scene();
    const camera = createCamera();
    const renderer = createRenderer();
    const loader = new THREE.TextureLoader();

    // call object
    const leftPlane = createLeftPlane(loader);
    const rightPlane = createRightPlane(loader);
    const floorPlane = createFloorPlane(loader);
    const topSphere = createTopSphere();
    const bottomSphere = createBottomSphere();
    const cylinder = createCylinder();

    // call light
    const ambient = createAmbient();
    const pointLight = createPointLight();

    // add scene
    scene.add(leftPlane);
    scene.add(rightPlane);
    scene.add(floorPlane);
    scene.add(topSphere);
    scene.add(bottomSphere);
    scene.add(cylinder);
    scene.add(ambient);
    scene.add(pointLight);

    function render(){
        requestAnimationFrame(render);
        renderer.render(scene,camera);
    }
    render();
}

function createCamera(){
    const camera = new THREE.PerspectiveCamera(100,window.innerWidth/window.innerHeight,0.1,10000);
    camera.position.set(0,500,-550);
    camera.lookAt(0,0,0);

    return camera;
}

function createRenderer(){
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        background: '#555555',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    return renderer;
}

// Making Object
function createLeftPlane(loader){
    const texture = loader.load('Background.jpg');
    const geometry = new THREE.PlaneGeometry(500,500);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry,material);
    plane.position.set(175,250,175);
    plane.rotation.set(0, Math.PI/4,0);
    plane.receiveShadow = true;

    return plane;
}

function createRightPlane(loader){
    const texture = loader.load('Background.jpg');
    const geometry = new THREE.PlaneGeometry(500,500);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry,material);
    plane.position.set(-175,250,175);
    plane.rotation.set(0, -Math.PI/4,0);
    plane.receiveShadow = true;

    return plane;
}

function createFloorPlane(loader){
    const texture = loader.load('Wood.jpg');
    const geometry = new THREE.PlaneGeometry(500,500);
    const material = new THREE.MeshPhongMaterial({
        map: texture,
        side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geometry,material);
    plane.position.set(0,0,0);
    plane.rotation.set(Math.PI/2,0,-Math.PI/4);
    plane.receiveShadow = true;

    return plane;
}

function createTopSphere(){
    const geometry = new THREE.SphereGeometry(150,32,32,0,6.3,0,1.5);
    const material = new THREE.MeshPhongMaterial({
        color: '#9D4806',
        specular: '#FFFFFF',
        shininess: 3,
    });
    const sphere = new THREE.Mesh(geometry,material);
    sphere.position.set(0,100,0);
    sphere.castShadow = true;

    return sphere;
}

function createBottomSphere(){
    const geometry = new THREE.SphereGeometry(150,32,32,0,6.3,3,1.5);
    const material = new THREE.MeshPhongMaterial({
        color: '#9D4806',
        specular: '#FFFFFF',
        shininess: 3,
    });
    const sphere = new THREE.Mesh(geometry,material);
    sphere.position.set(0,160,0);
    sphere.castShadow = true;

    return sphere;
}

function createCylinder(){
    const geometry = new THREE.CylinderGeometry(155,155,25,64,64);
    const material = new THREE.MeshPhongMaterial({
        color: '#5C1B0E',

    });
    const cylinder = new THREE.Mesh(geometry,material);
    cylinder.position.set(0,130,0);
    cylinder.castShadow = true;

    return cylinder;
}

// Making Light
function createAmbient(){
    const ambient = new THREE.AmbientLight('#FFFCD1', 0.8);

    return ambient
}

function createPointLight(){
    const pointLight = new THREE.PointLight('#FFFCD1', 0.7, 1000);
    pointLight.position.set(100,600,-150);
    pointLight.castShadow =true;
    pointLight.shadow.camera.far = 1000;

    return pointLight;
}


Run();