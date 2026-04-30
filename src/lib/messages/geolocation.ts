export const GEOLOCATION_MESSAGE = {
  unsupported: "이 브라우저에서는 위치 정보를 지원하지 않습니다.",
  permissionDenied:
    "위치 권한이 거부되었습니다. 브라우저에서 위치 권한을 허용하면 현재 위치의 날씨를 확인할 수 있습니다.",
  positionUnavailable: "현재 위치를 확인할 수 없습니다.",
  timeout: "위치 정보를 가져오는 시간이 초과되었습니다.",
  unknown: "현재 위치 정보를 불러오지 못했습니다.",
} as const;
