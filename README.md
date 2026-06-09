# Weather Q

도시별 현재 날씨와 예보를 확인하고, 원하는 도시를 저장할 수 있는 Next.js 기반 날씨 서비스입니다. 
([배포 페이지](https://weather-q-mauve.vercel.app/))

## 주요 기능

- 현재 위치 기반 날씨 조회
- 기본 도시 및 사용자 추가 도시 목록 제공
- 도시 검색 및 저장/삭제
- 도시 상세 페이지에서 현재 날씨, 시간별 예보, 3일 예보 제공

## 기술 스택

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Zustand
- WeatherAPI
- Nominatim
- Vitest
- GitHub Actions
- Vercel

## API 설계

API Key 보호를 위해 클라이언트 컴포넌트에서 WeatherAPI를 직접 호출하지 않고, Next.js 서버 계층에서 외부 API 요청을 처리했습니다.
WeatherAPI Key는 브라우저 저장소가 아니라 서버 환경변수로 관리합니다. 로컬 개발 환경에서는 `.env.local`에 저장하고, 배포 환경에서는 Vercel Environment Variables와 GitHub Actions Secrets에 등록합니다.
`.env.local`은 Git에 커밋하지 않으며, 서버 코드에서 `process.env.WEATHER_API_KEY`로만 접근합니다.

### WeatherAPI

날씨 데이터는 WeatherAPI를 사용합니다.

- 현재 날씨: `/current.json`
- 3일 예보: `/forecast.json`

WeatherAPI 호출은 `src/app/api/weather.ts`에서 담당합니다.

```txt
도시 상세 페이지
-> getCurrentWeather / getForecastWeather
-> WeatherAPI
```

### Nominatim
도시 검색은 Nominatim API를 사용합니다.
- 도시 검색: /search
- 좌표 기반 역조회: /reverse
nominatim 호출은 src/app/api/location.ts에서 담당합니다.

```txt
LocationSearch 컴포넌트
-> /api/location-search
-> getLocationSearchResults
-> Nominatim Search
-> Nominatim Reverse
```

Nominatim Search는 한국어 도시명을 얻기 위해 `accept-language=ko`를 사용하고, Reverse API는 WeatherAPI 호출에 사용할 영어 도시명을 얻기 위해 `accept-language=en`을 사용합니다.
검색 결과는 한글명과 영문명을 함께 저장합니다.

## 구조 설계

이 프로젝트는 Next.js App Router의 파일 기반 라우팅을 기준으로 화면, API Route Handler, 외부 API 호출 함수, 클라이언트 상태 관리 로직을 분리했습니다.
`src/app`은 라우팅과 화면 렌더링을 담당하고, `src/lib`는 화면과 직접 연결되지 않는 공통 로직, 상수, 메시지, 저장소 유틸을 담당합니다.

```txt
src/app
├── page.tsx
├── [location]/
│   ├── page.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   └── HomeButton.tsx
├── api/
│   ├── current-location-weather/
│   │   └── route.ts
│   ├── location-search/
│   │   └── route.ts
│   ├── weather.ts
│   └── location.ts
├── components/
│   ├── CurrentLocationWeather.tsx
│   ├── LocationSearch.tsx
│   └── LocationList.tsx
├── layout.tsx
├── not-found.tsx
├── robots.ts
├── sitemap.ts
└── types.ts

src/lib
├── messages/
├── storage/
├── stores/
├── util/
├── location.constants.ts
├── storage.constants.ts
└── weather.constants.ts
```

## 캐싱 전략
Next.js 서버 `fetch`의 `revalidate` 옵션을 사용해 외부 API 응답을 캐싱합니다.
```ts
export const WEATHER_REVALIDATE_SECONDS = {
  current: 300,
  forecast: 600,
} as const;

export const LOCATION_REVALIDATE_SECONDS = {
  search: 3600,
  reverse: 3600,
} as const;
```
- 현재 날씨는 자주 바뀌므로 짧게 캐싱합니다.
- 예보 데이터는 현재 날씨보다 덜 자주 바뀌므로 조금 더 길게 캐싱합니다.
- 도시 검색 결과는 상대적으로 변동이 적어 더 길게 캐싱합니다.

## Next.js 적용 포인트
### App Router
`src/app` 기반의 App Router 구조를 사용했습니다.
- `/` 홈페이지
- `/[location]` 도시 상세 페이지
- `/api/location-search` 도시 검색 API
- `/api/current-location-weather` 현재 위치 날씨 API

### Server Component와 Client Component 분리
도시 상세 페이지는 서버 컴포넌트에서 날씨 데이터를 가져오고, 검색/저장 기능은 클라이언트 컴포넌트에서 처리합니다.

```txt
Server Component
-> 초기 상세 페이지 데이터 조회

Client Component
-> 검색어 입력
-> 도시 추가/삭제
-> localStorage 연동
```

### Metadata 최적화
`generateMetadata`를 사용해 도시 상세 페이지별 metadata를 동적으로 생성합니다.
```txt
/Seoul
-> Seoul 날씨 예보 | Weather Q

/London
-> London 날씨 예보 | Weather Q
```
Open Graph와 Twitter metadata도 함께 설정해 링크 공유 시 페이지 정보가 전달되도록 했습니다.

### SEO 기본 설정
Next.js metadata file convention을 사용해 sitemap과 robots를 설정했습니다.
- `src/app/sitemap.ts`
- `src/app/robots.ts`

### Not Found 처리
존재하지 않는 도시 요청과 일반 API 오류를 구분했습니다.
```txt
WeatherAPI 400/404
-> notFound()
-> not-found.tsx

그 외 오류
-> error.tsx
```

## 상태 관리와 저장소
사용자가 추가한 도시는 Zustand store로 관리하고, localStorage에 저장합니다.
```txt
Zustand
-> 현재 화면의 저장 도시 상태 관리

localStorage
-> 브라우저 새로고침 후에도 저장 도시 유지
```
저장 데이터는 사용자 계정 기반 데이터가 아니라 “현재 브라우저에서 보고 싶은 도시 목록”에 가까워 localStorage를 선택했습니다.

## 실행 방법

### 의존성 설치

```bash
npm install
```
### 개발 서버 실행
```bash
npm run dev
```

### 개발 서버 실행
```txt
http://localhost:3000
```



