export const WEATHER_MESSAGE = {
  currentFetchFailed: (status: number) => `날씨 정보를 가져올 수 없습니다. (status: ${status})`,
  forecastFetchFailed: (status: number) => `예보 정보를 가져올 수 없습니다. (status: ${status})`,
  locationSearchFetchFailed: (status: number) =>
    `위치 검색 정보를 가져올 수 없습니다. (status: ${status})`,
  apiKeyMissing: "WEATHER_API_KEY가 설정되어 있지 않습니다.",
  emptyLocation: "도시명이 비어있습니다.",
  currentLocationFetchFailed: "현재 위치의 날씨를 불러오지 못했습니다.",
  currentLocationLoading: "현재 위치 날씨를 불러오는 중입니다.",
} as const;
