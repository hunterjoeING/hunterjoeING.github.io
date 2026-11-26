import type * as Phaser from 'phaser';
import { passFollowingCap, passOvertake, passVehiclePose, type PassLayout } from '../sim/AlpineHazards';
import { passOffset, passRoadPosition, passSample } from '../sim/AlpineRoad';
import { capsulesOverlap, orientedCapsule, vehicleCapsule, type Capsule, type Point } from './CityCollision';

type Pose = NonNullable<ReturnType<typeof passVehiclePose>>;

export class AlpinePassTraffic {
  readonly parked: Capsule;
  private elapsed = 0;
  private truckPose?: Pose;
  private opposing: Pose[] = [];
  private readonly truck: Phaser.GameObjects.Image;
  private readonly cars: Phaser.GameObjects.Image[];
  private readonly lamps: Phaser.GameObjects.Graphics;

  constructor(private readonly road: PassLayout, scene: Phaser.Scene) {
    const makeCar = (texture: string) => scene.add.image(0, 0, texture).setDepth(14);
    this.truck = makeCar('npc_truck').setScale(0.78);
    const colors = ['npc_sedan_blue', 'npc_van_white', 'npc_compact_green'];
    this.cars = road.oncoming.map((_, index) => makeCar(colors[index % colors.length]));
    const broken = passVehiclePose(road, road.breakdown, 0)!;
    makeCar('npc_sedan_blue').setPosition(broken.x, broken.y).setRotation(broken.rotation).setTint(0xdfa0a0);
    this.parked = vehicleCapsule(broken.x, broken.y, broken.rotation);

    const warning = passOffset(passSample(road, road.breakdown.trianglePx), 41);
    const triangle = [{ x: warning.x, y: warning.y - 11 }, { x: warning.x - 12, y: warning.y + 9 },
      { x: warning.x + 12, y: warning.y + 9 }];
    scene.add.graphics().setDepth(13).fillStyle(0xfff1d8).fillPoints(triangle, true)
      .lineStyle(4, 0xe14440).strokePoints(triangle, true);
    this.lamps = scene.add.graphics().setDepth(15);
    this.step(0);
  }

  step(dt: number): void {
    this.elapsed += dt;
    this.lamps.clear();
    const position = (sprite: Phaser.GameObjects.Image, pose: Pose | undefined) => {
      sprite.setVisible(!!pose);
      if (pose) sprite.setPosition(pose.x, pose.y).setRotation(pose.rotation);
    };
    this.truckPose = passVehiclePose(this.road, this.road.truck, this.elapsed);
    position(this.truck, this.truckPose);
    this.opposing = this.road.oncoming.flatMap((car, i) => {
      const pose = passVehiclePose(this.road, car, this.elapsed);
      position(this.cars[i], pose);
      if (!pose) return [];
      this.drawLights(pose, 20, 0xfff5c8);
      return [pose];
    });
    if (this.road.breakdown.hazardLights && Math.floor(this.elapsed / 0.42) % 2 === 0) {
      this.drawLights(passVehiclePose(this.road, this.road.breakdown, 0)!, -21, 0xffa82e);
    }
  }

  private drawLights(pose: Pose, forward: number, color: number): void {
    const { x, y, rotation } = pose;
    const fx = Math.sin(rotation);
    const fy = -Math.cos(rotation);
    for (const side of [-9, 9]) {
      const cx = x + fx * forward - fy * side;
      const cy = y + fy * forward + fx * side;
      this.lamps.fillStyle(color, 0.3).fillCircle(cx, cy, 9);
      this.lamps.fillStyle(color).fillCircle(cx, cy, 3.5);
    }
  }

  collision(shape: Capsule): Pose | undefined {
    const truck = this.truckPose;
    if (truck && capsulesOverlap(shape, orientedCapsule(truck.x, truck.y, truck.rotation, 16 * 0.78, 42 * 0.78))) {
      return truck;
    }
    return this.opposing.find(car => capsulesOverlap(shape, vehicleCapsule(car.x, car.y, car.rotation)));
  }

  situation(point: Point) {
    const { along, side } = passRoadPosition(this.road, point);
    const { inZone, allowed, conflict } = passOvertake(this.road, along, this.opposing.map(car => car.along));
    const breakdownGap = this.road.breakdown.startPx - along;
    const truckGap = (this.truckPose?.along ?? Infinity) - along;
    const hint = conflict ? 'Gegenverkehr · rechts bleiben' :
      breakdownGap >= -20 && breakdownGap < 245 ? 'Panne voraus · langsam vorbei' :
      truckGap > -45 && truckGap < 245
        ? allowed ? 'Lkw voraus · Überholen möglich' : 'Lkw voraus · Überholverbot'
        : inZone ? 'Gestrichelte Linie · Überholzone' : '';
    return { unsafe: side < -6 && !allowed, hint, cap: passFollowingCap(this.truckPose, along, side) };
  }
}
