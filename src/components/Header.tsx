import type { ReactNode } from 'react';
import type { ApiStatus } from '../types/furniture';
import { ApiStatusBadge } from './ApiStatusBadge';

export interface HeaderProps {
  status: ApiStatus;
  errorMessage?: string;
  children: ReactNode;
}

export function Header({ status, errorMessage, children }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__identity" aria-label="Furniture Gallery">
          <span className="site-header__brand">FURNITURE</span>
          <span className="site-header__product">Furniture Gallery</span>
        </div>
        <div
          className="site-header__controls"
          role="group"
          aria-label="갤러리 검색 및 정렬"
        >
          {children}
        </div>
        <ApiStatusBadge status={status} errorMessage={errorMessage} />
      </div>
    </header>
  );
}
