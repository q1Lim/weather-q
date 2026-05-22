"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSavedLocationStore } from "@/lib/stores/savedLocationStore";
import { DEFAULT_LOCATIONS } from "@/lib/location.constants";

export default function LocationList() {
  const savedLocations = useSavedLocationStore((state) => state.locations);
  const loadLocations = useSavedLocationStore((state) => state.loadLocations);
  const removeLocation = useSavedLocationStore((state) => state.removeLocation);

  useEffect(() => {
    loadLocations();
  }, [loadLocations]);

  const locations = [
    ...DEFAULT_LOCATIONS.map((location) => ({
      ...location,
      isDefault: true,
    })),
    ...savedLocations
      .filter(
        (savedLocation) =>
          !DEFAULT_LOCATIONS.some(
            (DEFAULT_LOCATIONS) =>
              DEFAULT_LOCATIONS.query.toLowerCase() === savedLocation.query.toLowerCase()
          )
      )
      .map((location) => ({
        ...location,
        isDefault: false,
      })),
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {locations.map((location) => (
        <li key={location.query}>
          <Link
            href={`/${location.query}`}
            className="group relative flex min-h-36 items-center justify-center overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-2xl font-bold text-slate-900 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-lg"
          >
            {!location.isDefault ? (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  removeLocation(location.query);
                }}
                aria-label={`${location.name} 삭제`}
                className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-base font-bold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                ×
              </button>
            ) : null}

            <span className="relative">{location.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
