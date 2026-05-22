"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { LocationSearchResponse, LocationSearchResult } from "../types";
import { useSavedLocationStore } from "@/lib/stores/savedLocationStore";
import { LOCATION_MESSAGE } from "@/lib/messages/location";

export default function LocationSearch() {
  const [query, setQuery] = useState("");
  const [locationResults, setLocationResults] = useState<LocationSearchResponse>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const addLocation = useSavedLocationStore((state) => state.addLocation);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      setError(LOCATION_MESSAGE.emptySearchQuery);
      setLocationResults([]);
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/location-search?q=${encodeURIComponent(trimmedQuery)}`);

      if (!response.ok) {
        throw new Error(LOCATION_MESSAGE.searchFailed);
      }

      const data: LocationSearchResponse = await response.json();
      setLocationResults(data);
    } catch (error) {
      setLocationResults([]);
      setError(error instanceof Error ? error.message : LOCATION_MESSAGE.searchFailed);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextQuery = event.target.value;
    setQuery(nextQuery);

    if (!nextQuery.trim()) {
      setLocationResults([]);
      setError("");
    }
  };

  const handleAddLocation = (location: LocationSearchResult) => {
    const added = addLocation({
      name: location.name,
      region: location.region,
      country: location.country,
      query: location.name,
    });

    setMessage(added ? LOCATION_MESSAGE.addSuccess : LOCATION_MESSAGE.alreadyAdded);
  };

  return (
    <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">도시 검색</h2>
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={query}
          onChange={handleQueryChange}
          placeholder="예: London, Seoul, Tokyo"
          className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-950 transition outline-none placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-700 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isLoading ? "검색 중" : "검색"}
        </button>
      </form>

      {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}
      {message ? <p className="mt-3 text-sm font-medium text-sky-700">{message}</p> : null}
      {locationResults.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {locationResults.map((location) => (
            <li
              key={location.id}
              className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-slate-950">{location.name}</p>
                <p className="text-sm text-slate-500">
                  {location.region}, {location.country}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddLocation(location)}
                className="inline-flex min-h-9 shrink-0 items-center justify-center self-start rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700 sm:self-auto"
              >
                추가하기
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
