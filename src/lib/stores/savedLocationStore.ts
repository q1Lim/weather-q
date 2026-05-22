import { create } from "zustand";
import { SavedLocation } from "@/app/types";
import {
  addSavedLocation,
  getSavedLocations,
  removeSavedLocation,
} from "../storage/savedLocations";
import { DEFAULT_LOCATIONS } from "@/lib/location.constants";

type SavedLocationsStore = {
  locations: SavedLocation[];
  loadLocations: () => void;
  addLocation: (location: SavedLocation) => boolean;
  removeLocation: (query: string) => void;
};

export const useSavedLocationStore = create<SavedLocationsStore>((set) => ({
  locations: [],

  loadLocations: () => {
    set({ locations: getSavedLocations() });
  },

  addLocation: (location) => {
    const isDefaultLocation = DEFAULT_LOCATIONS.some(
      (defaultLocation) => defaultLocation.query.toLowerCase() === location.query.toLowerCase()
    );

    if (isDefaultLocation) {
      return false;
    }

    const result = addSavedLocation(location);
    set({ locations: result.locations });

    return result.added;
  },

  removeLocation: (query) => {
    const locations = removeSavedLocation(query);
    set({ locations });
  },
}));
