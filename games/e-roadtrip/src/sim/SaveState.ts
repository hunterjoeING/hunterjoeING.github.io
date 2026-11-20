import { CampaignSave } from '../types';
import { getVehicleById } from '../data/vehicles';

const SAVE_KEY = 'eroadtrip_campaign_v1';

export function loadCampaignSave(): CampaignSave {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CampaignSave>;
      return {
        cashEur: typeof parsed.cashEur === 'number' ? parsed.cashEur : 26000,
        ownedVehicleId: typeof parsed.ownedVehicleId === 'string' ? parsed.ownedVehicleId : null,
        unlockedLevelOrder: typeof parsed.unlockedLevelOrder === 'number' ? parsed.unlockedLevelOrder : 1,
        completedLevels: parsed.completedLevels && typeof parsed.completedLevels === 'object' ? parsed.completedLevels : {}
      };
    }
  } catch (_) {}
  return {
    cashEur: 26000,
    ownedVehicleId: null,
    unlockedLevelOrder: 1,
    completedLevels: {}
  };
}

export function saveCampaignState(save: CampaignSave): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(save));
  } catch (_) {}
}

export function getResaleValue(vehicleId: string): number {
  const v = getVehicleById(vehicleId);
  return Math.round(v.priceEur * (1 - v.depreciationRate));
}

export function resetCampaignSave(): CampaignSave {
  const fresh: CampaignSave = {
    cashEur: 26000,
    ownedVehicleId: null,
    unlockedLevelOrder: 1,
    completedLevels: {}
  };
  saveCampaignState(fresh);
  return fresh;
}
