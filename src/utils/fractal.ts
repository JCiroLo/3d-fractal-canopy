import * as THREE from "three";
import RandomUtils from "./random";

import { type TSettingsValues } from "../providers/SettingsProvider";

type ExtraSettings = { rotationFactor?: number };
type GlobalSettings = TSettingsValues & ExtraSettings;

export type TBranch = {
  from: THREE.Vector3;
  to: THREE.Vector3;
  thicknessFactor?: number;
};

const FractalUtils = {
  createBranch(parent: TBranch, settings: GlobalSettings): TBranch {
    const direction = new THREE.Vector3().subVectors(parent.to, parent.from).normalize();
    const auxiliaryVector = new THREE.Vector3(0, 0, 1);

    if (direction.equals(auxiliaryVector) || direction.equals(auxiliaryVector.negate())) {
      auxiliaryVector.set(0, 1, 0);
    }

    const currentAngle = RandomUtils.rangeBoolean(settings.angle, settings.angleRandomness);
    const currentLength = RandomUtils.rangeBoolean(settings.length, settings.growthRandomness);

    const axisZ = new THREE.Vector3().crossVectors(direction, auxiliaryVector).normalize();
    const angleZInRadians = THREE.MathUtils.degToRad(currentAngle);
    const quaternionZ = new THREE.Quaternion().setFromAxisAngle(axisZ, angleZInRadians);
    const fixedDirection = direction.clone().applyQuaternion(quaternionZ);
    const length = direction.length() * currentLength;

    fixedDirection.setLength(length);

    const from = parent.to.clone();
    const to = from.clone().add(fixedDirection);
    const axisY = direction.clone().normalize();
    const angleYInRadians = THREE.MathUtils.degToRad(settings.rotationFactor || 0);
    const quaternionY = new THREE.Quaternion().setFromAxisAngle(axisY, angleYInRadians);
    const rotatedTo = to.clone().sub(from).applyQuaternion(quaternionY).add(from);

    return {
      from,
      to: rotatedTo,
      thicknessFactor: (parent.thicknessFactor || 1) / settings.thicknessFactor,
    };
  },
  generateTree(parent: TBranch, settings: GlobalSettings): TBranch[] {
    const { depth } = settings;

    if (depth === 0) return [];

    const quantity = RandomUtils.boolean(settings.branchQuantity, settings.branchQuantityRandomness);
    const growth = settings.length * settings.growthFactor;
    const angle = settings.angle * settings.angleFactor;

    const newSettings = {
      ...settings,
      depth: settings.depth - 1,
      length: growth,
      angle,
    };

    const nodes = Array.from({ length: quantity }, (_, index) =>
      this.generateTree(
        this.createBranch(parent, { ...newSettings, rotationFactor: (settings.rotationFactor || 0) + index * (360 / quantity) }),
        newSettings
      )
    );

    return [parent, ...nodes.flat(), parent];
  },
  createCylinderGeometry(branch: TBranch, settings: GlobalSettings) {
    const direction = new THREE.Vector3().subVectors(branch.to, branch.from);
    const length = direction.length();
    const thickness = {
      x: (settings.thickness.x / 10) * (branch.thicknessFactor || 1),
      y: (settings.thickness.y / 10) * (branch.thicknessFactor || 1),
    };
    const cylinderGeometry = new THREE.CylinderGeometry(thickness.x, thickness.y, length, 8);

    // cylinderGeometry.translate(0, length / 2, 0);

    const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
    cylinderGeometry.applyQuaternion(quaternion);

    const midpoint = new THREE.Vector3().addVectors(branch.from, branch.to).multiplyScalar(0.5);
    cylinderGeometry.translate(midpoint.x, midpoint.y, midpoint.z);

    return cylinderGeometry;
  },
};

export default FractalUtils;
