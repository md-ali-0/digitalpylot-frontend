import Link from "next/link";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="auth-shell">
      <div className="auth-shell__aurora auth-shell__aurora--left"></div>
      <div className="auth-shell__aurora auth-shell__aurora--right"></div>

      <div className="auth-shell__panel">
        <div className="auth-shell__form-column">
          <div className="auth-shell__brand-row">
            <Link href="/" className="auth-shell__brand">
              <span className="auth-shell__brand-mark" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="auth-shell__brand-copy">
                <span className="auth-shell__brand-name">Digital Pylot</span>
                <span className="auth-shell__brand-tag">
                  Dynamic access platform
                </span>
              </span>
            </Link>
          </div>

          <div className="auth-shell__content">{children}</div>

          <div className="auth-shell__footer">
            <p>
              &copy; {new Date().getFullYear()} Digital Pylot. Secure login
              experience for modern RBAC systems.
            </p>
          </div>
        </div>

        <div className="auth-shell__showcase">
          <div className="auth-shell__showcase-grid"></div>
          <div className="auth-shell__showcase-inner">
            <div className="auth-shell__eyebrow">RBAC System v2.0</div>
            <h2 className="auth-shell__headline">
              Permissions define every screen, route, and action.
            </h2>
            <p className="auth-shell__description">
              One shared platform where Admins and Managers control access atom
              by atom without hard-coded role walls.
            </p>

            <div className="auth-shell__stat-card">
              <div className="auth-shell__stat-top">
                <span>Resolved access map</span>
                <span>Live</span>
              </div>
              <div className="auth-shell__stat-metric">148 atoms</div>
              <div className="auth-shell__stat-bars">
                <span className="is-active"></span>
                <span className="is-active"></span>
                <span className="is-active"></span>
                <span></span>
                <span></span>
                <span className="is-accent"></span>
              </div>
              <div className="auth-shell__stat-foot">
                <span>Grant ceiling enforced</span>
                <span>Audit trail ready</span>
              </div>
            </div>

            <div className="auth-shell__feature-list">
              <div>
                <strong>Dynamic routing</strong>
                <span>Every page is guarded by permission atoms.</span>
              </div>
              <div>
                <strong>Flexible delegation</strong>
                <span>Managers can only assign access they already hold.</span>
              </div>
              <div>
                <strong>Single source of truth</strong>
                <span>UI, APIs, and audit actions stay aligned.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
