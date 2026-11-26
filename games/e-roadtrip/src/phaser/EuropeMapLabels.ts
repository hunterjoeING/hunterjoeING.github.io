import type * as Phaser from 'phaser';
import { COUNTRY_LABELS, MAJOR_CITIES } from '../data/europeGeoData.generated';
import { projectMapPoint } from '../data/europeGeography';
import type { MapPoint } from '../data/europeProjection';
import { NORTH_COAST_500_NAME, NORTH_COAST_500_STOPS } from '../data/routes/northCoast500';
import type { CityNode } from '../types';
import { getMapThemePalette } from './EuropePixelMap';
import {
  CITY_LABEL_ANCHORS, KOELN_LABEL_ANCHORS, SIRMIONE_LABEL_ANCHORS, cityLabelScale, layoutMapLabels, mapScreenPoint,
  type MapLabelAnchor, type MapLabelCandidate, type MapLabelViewport
} from './EuropeMapLabelLayout';
import type { BoxRect } from './MapLayout';

interface MapLabel extends MapPoint {
  id: string;
  text: Phaser.GameObjects.Text;
  priority: number;
  minZoom: number;
  anchors: readonly MapLabelAnchor[];
  kind: 'active' | 'graph' | 'major' | 'scenic' | 'country';
  dot?: Phaser.GameObjects.Arc;
  /** Radius in world pixels of the existing game city marker. */
  graphRadius?: number;
}

export interface MapDecoration extends MapPoint {
  id: string;
  object: Phaser.GameObjects.Container;
  width: number;
  height: number;
  kind: 'shield' | 'route' | 'stage';
  minZoom?: number;
  hitTarget?: Phaser.GameObjects.Rectangle;
}

export const SCENIC_LABEL_ZOOM = 1.15;
export const northCoastLine = NORTH_COAST_500_STOPS.flatMap(stop =>
  [...(stop.via ?? []), stop.mapCoordinate ?? stop.coordinate].map(projectMapPoint));

export function scenicMapColor(isLight: boolean): number {
  return isLight ? 0x9d174d : 0xf9a8d4;
}

export class EuropeMapLabels {
  private readonly labels: MapLabel[] = [];
  private readonly byId = new Map<string, MapLabel>();
  private worldBoxes: BoxRect[] = [];
  private lastViewport?: MapLabelViewport;

  constructor(private readonly scene: Phaser.Scene, private readonly layer: Phaser.GameObjects.Container) {}

  private addLabel(
    label: Omit<MapLabel, 'text'>,
    content: string,
    fontSize: string,
    fontStyle = 'normal'
  ): void {
    const country = label.kind === 'country';
    const text = this.scene.add.text(label.x, label.y, content, {
      fontFamily: country ? 'Outfit, sans-serif' : 'Plus Jakarta Sans, sans-serif',
      fontSize, fontStyle, letterSpacing: country ? 1.4 : 0,
      padding: country ? undefined : { x: 3, y: 1 },
      resolution: 3
    }).setOrigin(0.5).setVisible(false);
    this.layer.add(text);
    this.labels.push({ ...label, text });
    this.byId.set(label.id, this.labels[this.labels.length - 1]);
  }

  addGraphCity(city: CityNode, active: boolean, radius: number): void {
    const scenicStart = city.id === 'inverness';
    const gardaArrival = active && city.id === 'sirmione';
    this.addLabel({
      id: city.id, x: city.mapX, y: city.mapY, graphRadius: radius,
      priority: gardaArrival ? 540 : active ? 500 : city.isMajor ? 400 : scenicStart ? 390 : 380,
      minZoom: active || city.isMajor ? 0 : scenicStart ? SCENIC_LABEL_ZOOM : 0.73,
      anchors: gardaArrival ? SIRMIONE_LABEL_ANCHORS : city.id === 'koeln' ? KOELN_LABEL_ANCHORS : CITY_LABEL_ANCHORS,
      kind: active ? 'active' : 'graph'
    }, city.name, active ? '11.5px' : city.isMajor ? '10px' : '9px', active || city.isMajor ? 'bold' : 'normal');
  }

  addReferencePlaces(): void {
    for (const [name, x, y, capital, population, country] of MAJOR_CITIES) {
      const dot = this.scene.add.circle(x, y, 2, 0, 0).setVisible(false);
      this.layer.add(dot);
      this.addLabel({
        id: `place-${country}-${name}`, x, y, dot, kind: 'major',
        priority: (capital ? 280 : 220) + Math.log10(Math.max(1, population)),
        minZoom: capital ? 0 : 0.24, anchors: CITY_LABEL_ANCHORS
      }, name, capital ? '9px' : '8.5px', capital ? 'bold' : 'normal');
    }

    for (const stop of NORTH_COAST_500_STOPS) {
      // Inverness already has a graph marker and shares this layout.
      if (!stop.label || stop.name === 'Inverness') continue;
      const { x, y } = projectMapPoint(stop.mapCoordinate ?? stop.coordinate);
      const dot = this.scene.add.circle(x, y, 2.6, 0, 0).setVisible(false);
      this.layer.add(dot);
      this.addLabel({
        id: `scenic-${stop.name}`, x, y, dot, kind: 'scenic', priority: 365,
        minZoom: SCENIC_LABEL_ZOOM, anchors: CITY_LABEL_ANCHORS
      }, stop.name, '9px');
    }
    this.addLabel({
      id: 'north-coast-500', ...projectMapPoint([58.0, -4.54]), kind: 'scenic',
      priority: 370, minZoom: SCENIC_LABEL_ZOOM, anchors: ['centre', ...CITY_LABEL_ANCHORS]
    }, NORTH_COAST_500_NAME, '10px', 'bold');

    for (const [name, x, y, small] of COUNTRY_LABELS) {
      this.addLabel({
        id: `country-${name}`, x, y, kind: 'country', priority: small ? 100 : 110,
        minZoom: small ? 0.25 : 0, anchors: ['centre']
      }, name, small ? '10px' : '12px', 'bold');
    }
  }

  applyTheme(isLight: boolean): void {
    const pal = getMapThemePalette(isLight);
    for (const label of this.labels) {
      const { text, kind, dot } = label;
      if (kind === 'active' || kind === 'graph') {
        text.setColor(kind === 'active' ? pal.cityLabelActiveColor : pal.cityLabelMutedColor);
        text.setBackgroundColor(kind === 'active' ? pal.cityLabelActiveBg : pal.cityLabelMutedBg);
      } else if (kind === 'country') {
        text.setColor(pal.countryLabelColor);
      } else {
        const stroke = kind === 'scenic' ? scenicMapColor(isLight) : isLight ? 0x475569 : 0xb7c8c3;
        text.setColor('#' + stroke.toString(16).padStart(6, '0'));
        text.setStroke(isLight ? '#eff6e9' : '#203b32', 2);
        dot?.setStrokeStyle(1, stroke);
      }
    }
  }

  layout(viewport: MapLabelViewport, decorations: readonly MapDecoration[], force = false): BoxRect[] {
    const old = this.lastViewport;
    if (!force && old && old.zoom === viewport.zoom && old.scrollX === viewport.scrollX &&
        old.scrollY === viewport.scrollY && old.width === viewport.width && old.height === viewport.height) {
      return this.worldBoxes;
    }
    this.lastViewport = viewport;

    const zoom = viewport.zoom;
    const scale = cityLabelScale(zoom);
    const cityMarkers: BoxRect[] = [];
    const candidates: MapLabelCandidate[] = [];
    for (const label of this.labels) {
      label.text.setVisible(false);
      label.dot?.setVisible(false);
      if (label.graphRadius) {
        const diameter = label.graphRadius * 2 * zoom;
        cityMarkers.push({ ...mapScreenPoint(label, viewport), w: diameter, h: diameter });
      }
      if (zoom < label.minZoom) continue;
      const textScale = this.scaleFor(label, scale);
      const halo = label.dot || label.kind === 'scenic' ? 2 : 0;
      candidates.push({
        id: label.id, x: label.x, y: label.y, priority: label.priority, anchors: label.anchors,
        width: (label.text.width + halo) * textScale * zoom,
        height: (label.text.height + halo) * textScale * zoom,
        distance: label.graphRadius && label.graphRadius * zoom,
        radius: label.dot ? (label.dot.radius + 0.5) * scale * zoom : undefined
      });
    }

    const decorationById = new Map<string, MapDecoration>();
    const decorationScale = Math.min(1, scale);
    for (const decoration of decorations) {
      const { id, x, y, width, height, kind, object, hitTarget } = decoration;
      object.setVisible(false);
      if (hitTarget?.input) hitTarget.input.enabled = false;
      if (zoom < (decoration.minZoom ?? 0)) continue;
      decorationById.set(id, decoration);
      // The stage badge can shift around its anchor to keep city names readable.
      candidates.push({
        id, x, y, width: width * decorationScale * zoom, height: height * decorationScale * zoom,
        priority: kind === 'stage' ? 345 : kind === 'route' ? 320 : 200,
        anchors: kind === 'stage' ? ['centre', ...CITY_LABEL_ANCHORS] : ['centre']
      });
    }

    this.worldBoxes = layoutMapLabels(candidates, viewport, cityMarkers).map(({ id, x, y, box }) => {
      const label = this.byId.get(id);
      if (label) {
        label.text.setPosition(x, y).setScale(this.scaleFor(label, scale)).setVisible(true);
        label.dot?.setScale(scale).setVisible(true);
      } else {
        const decoration = decorationById.get(id)!;
        decoration.object.setPosition(x, y).setScale(decorationScale).setVisible(true);
        if (decoration.hitTarget?.input) decoration.hitTarget.input.enabled = true;
      }
      return { x, y, w: box.w / zoom, h: box.h / zoom };
    });
    return this.worldBoxes;
  }

  private scaleFor(label: MapLabel, cityScale: number): number {
    return label.kind === 'country' ? Math.min(6, cityScale) : cityScale;
  }
}
