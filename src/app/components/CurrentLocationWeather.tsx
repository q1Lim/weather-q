"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CurrentWeatherResponse } from "../types";
import { COMMON_MESSAGE } from "@/lib/messages/common";
import { GEOLOCATION_MESSAGE } from "@/lib/messages/geolocation";
import { WEATHER_MESSAGE } from "@/lib/messages/weather";

export default function CurrentLocationWeather() {
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<CurrentWeatherResponse | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("error");
      setError(GEOLOCATION_MESSAGE.unsupported);
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `/api/current-location-weather?lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error(WEATHER_MESSAGE.currentLocationFetchFailed);
          }

          const data: CurrentWeatherResponse = await response.json();
          setWeather(data);
          setStatus("success");
        } catch (error) {
          setStatus("error");
          setError(
            error instanceof Error ? error.message : WEATHER_MESSAGE.currentLocationFetchFailed
          );
        }
      },
      () => {
        setStatus("error");
        setError(GEOLOCATION_MESSAGE.permissionDenied);
      }
    );
  }, []);

  if (status === "loading") {
    return (
      <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-sky-600 uppercase">
          Current Location
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight">
          {WEATHER_MESSAGE.currentLocationLoading}
        </h2>
        <p className="mt-2 text-sm text-slate-500">{COMMON_MESSAGE.waitingDescription}</p>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section className="mb-10 rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-red-500 uppercase">
          Location Weather
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
          {WEATHER_MESSAGE.currentLocationFetchFailed}
        </h2>
        <p className="mt-2 text-sm text-slate-600">{error}</p>
      </section>
    );
  }

  if (status === "success" && weather) {
    return (
      <section className="mb-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-sky-600 uppercase">
          Current Location
        </p>

        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              {weather.location.name}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {weather.location.region}, {weather.location.country}
            </p>
            <p className="mt-4 text-5xl font-bold text-slate-950">{weather.current.temp_c}°C</p>
            <p className="mt-2 text-base text-slate-600">{weather.current.condition.text}</p>
          </div>

          <Image
            className="h-20 w-20"
            src={`https:${weather.current.condition.icon}`}
            alt={weather.current.condition.text}
            width={80}
            height={80}
          />
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">체감 온도</dt>
            <dd className="mt-1 text-lg font-semibold">{weather.current.feelslike_c}°C</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">습도</dt>
            <dd className="mt-1 text-lg font-semibold">{weather.current.humidity}%</dd>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">풍속</dt>
            <dd className="mt-1 text-lg font-semibold">{weather.current.wind_kph}km/h</dd>
          </div>
        </dl>
      </section>
    );
  }

  return null;
}
