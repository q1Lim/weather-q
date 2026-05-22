import { SavedLocation } from "@/app/types";
import { STORAGE_KEYS } from "../storage.constants";

type AddSavedLocationResult = {
  locations: SavedLocation[];
  added: boolean;
};

export function getSavedLocations(): SavedLocation[] {
  if (typeof window === "undefined") {
    return [];
  }

  const savedLocations = localStorage.getItem(STORAGE_KEYS.savedLocations);

  if (!savedLocations) {
    return [];
  }

  try {
    return JSON.parse(savedLocations) as SavedLocation[];
  } catch {
    return [];
  }
}

export function setSavedLocations(locations: SavedLocation[]) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEYS.savedLocations, JSON.stringify(locations));
}

export function addSavedLocation(location: SavedLocation): AddSavedLocationResult {
  const savedLocations = getSavedLocations();
  const isAlreadySaved = savedLocations.some(
    (savedLocation) => savedLocation.query.toLowerCase() === location.query.toLowerCase()
  );

  if (isAlreadySaved) {
    return {
      locations: savedLocations,
      added: false,
    };
  }

  const nextLocations = [...savedLocations, location];
  setSavedLocations(nextLocations);

  return {
    locations: nextLocations,
    added: true,
  };
}

export function removeSavedLocation(query: string): SavedLocation[] {
  const savedLocations = getSavedLocations();
  const nextLocations = savedLocations.filter(
    (saveLocation) => saveLocation.query.toLowerCase() !== query.toLowerCase()
  );

  setSavedLocations(nextLocations);

  return nextLocations;
}
