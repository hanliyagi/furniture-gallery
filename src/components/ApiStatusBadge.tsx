import type { ApiStatus } from '../types/furniture';

const STATUS_COPY = {
  loading: 'API 연결 중',
  connected: 'API 연결됨',
  fallback: '내장 데이터 사용 중',
} as const satisfies Readonly<Record<ApiStatus, string>>;

export interface ApiStatusBadgeProps {
  status: ApiStatus;
  errorMessage?: string;
}

export function ApiStatusBadge({ status, errorMessage }: ApiStatusBadgeProps) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={`api-status api-status--${status}`}
      title={errorMessage}
    >
      <span className="api-status__dot" aria-hidden="true" />
      <span>{STATUS_COPY[status]}</span>
      {errorMessage ? <span className="visually-hidden">: {errorMessage}</span> : null}
    </span>
  );
}
