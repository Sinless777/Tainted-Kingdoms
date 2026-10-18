import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3, Color3, Color4 } from '@babylonjs/core/Maths/math';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { DirectionalLight } from '@babylonjs/core/Lights/directionalLight';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import type { AbstractEngine } from '@babylonjs/core/Engines/abstractEngine';
export function createStartScene(engine: AbstractEngine): Scene {
  const scene = new Scene(engine);
  scene.clearColor = new Color4(0.04, 0.05, 0.06, 1);
  const camera = new ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 3,
    12,
    new Vector3(0, 1, 0),
    scene,
  );
  camera.lowerRadiusLimit = 3;
  camera.upperRadiusLimit = 30;
  new HemisphericLight('ambient', Vector3.Up(), scene).intensity = 0.65;
  new DirectionalLight('sun', new Vector3(-1, -2, 1), scene).intensity = 1.2;
  const ground = MeshBuilder.CreateGround(
    'ground',
    { width: 20, height: 20 },
    scene,
  );
  const groundMaterial = new StandardMaterial('ground-material', scene);
  groundMaterial.diffuseColor = new Color3(0.16, 0.19, 0.16);
  ground.material = groundMaterial;
  const marker = MeshBuilder.CreateBox('placeholder', { size: 2 }, scene);
  marker.position.y = 1;
  const markerMaterial = new StandardMaterial('placeholder-material', scene);
  markerMaterial.diffuseColor = new Color3(0.45, 0.28, 0.19);
  marker.material = markerMaterial;
  return scene;
}
