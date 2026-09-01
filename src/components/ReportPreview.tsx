import { forwardRef } from "react";
import type { SummaryData } from "../types";
import {
  calcTotals,
  formatDateDot,
  formatKeldi,
  formatNow,
} from "../lib/format";

type Props = {
  data: SummaryData;
  downloading: boolean;
  onDownloadPng: () => void;
  onPrint: () => void;
};

const ReportPreview = forwardRef<HTMLDivElement, Props>(function ReportPreview(
  { data, downloading, onDownloadPng, onPrint },
  ref
) {
  const totals = calcTotals(data.departments);

  return (
    <section className="panel preview-panel" aria-live="polite">
      <div className="preview-toolbar no-print">
        <span className="preview-toolbar-label">Tayyor hisobot</span>
        <div className="preview-toolbar-actions">
          <button
            type="button"
            className="btn small primary"
            disabled={downloading}
            onClick={onDownloadPng}
          >
            {downloading ? "Tayyorlanmoqda…" : "⬇️ PNG yuklab olish"}
          </button>
          <button type="button" className="btn small" onClick={onPrint}>
            🖨️ Chop etish
          </button>
        </div>
      </div>

      <div className="report-sheet" id="report-sheet" ref={ref}>
        <div className="report-top">
          <div className="report-brand-line">
            <span className="report-logo">🏥</span>
            <span className="report-brand-text">Kundalik svodka</span>
          </div>
          <p className="report-greeting">
            {data.greeting || "Assalomu alaykum"}
          </p>
          <p className="report-date">{formatDateDot(data.date)}</p>
          <h2 className="report-heading">
            {data.title || "📌 Navbatchi shifokorlar"}
          </h2>
        </div>

        <div className="pv-depts">
          {data.departments.length === 0 ? (
            <p className="empty-hint">Bo'limlar kiritilmagan</p>
          ) : (
            data.departments.map((d) => (
              <article className="pv-dept" key={d.id}>
                <h3 className="pv-dept-name">{d.name || "Bo'lim"}</h3>
                {d.doctors ? (
                  <p className="pv-dept-docs">{d.doctors}</p>
                ) : null}
                <div className="pv-stats">
                  <div className="stat-chip">
                    <span className="s-val">{d.bemor}</span>
                    <span className="s-lab">#Bemor</span>
                  </div>
                  <div className="stat-chip">
                    <span className="s-val">{d.qarovchi}</span>
                    <span className="s-lab">#Qarovchi</span>
                  </div>
                  <div className="stat-chip">
                    <span
                      className={`s-val${d.vipiska > 0 ? " warn" : ""}`}
                    >
                      {d.vipiska}
                    </span>
                    <span className="s-lab">Vipiska</span>
                  </div>
                  <div className="stat-chip">
                    <span className={`s-val${d.keldi > 0 ? " plus" : ""}`}>
                      {formatKeldi(d.keldi)}
                    </span>
                    <span className="s-lab">Keldi</span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="pv-block">
          <h3>🚑 Tez yordam jamoasi</h3>
          <div className="staff-lines">
            {data.amb_driver ||
            data.amb_doctor ||
            data.amb_nurse ||
            data.amb_contact ? (
              <>
                {data.amb_driver ? (
                  <div className="amb-row">
                    <span className="role">🚑 Haydovchi</span>
                    <span className="val">{data.amb_driver}</span>
                  </div>
                ) : null}
                {data.amb_doctor ? (
                  <div className="amb-row">
                    <span className="role">📌 Vrach</span>
                    <span className="val">{data.amb_doctor}</span>
                  </div>
                ) : null}
                {data.amb_nurse ? (
                  <div className="amb-row">
                    <span className="role">Medbrat</span>
                    <span className="val">{data.amb_nurse}</span>
                  </div>
                ) : null}
                {data.amb_contact ? (
                  <div className="amb-row">
                    <span className="role">Aloqa</span>
                    <span className="val">{data.amb_contact}</span>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="empty-hint">Tez yordam ma'lumoti yo'q</p>
            )}
          </div>
        </div>

        <div className="pv-block">
          <h3>Xizmat xodimlari</h3>
          <div className="staff-lines">
            {data.security || data.plumber || data.electrician ? (
              <>
                {data.security ? (
                  <div className="staff-row">
                    <span className="role">👨🏻‍✈️ Qo'riqchi</span>
                    <span className="val">{data.security}</span>
                  </div>
                ) : null}
                {data.plumber ? (
                  <div className="staff-row">
                    <span className="role">🔧 Santexnik</span>
                    <span className="val">{data.plumber}</span>
                  </div>
                ) : null}
                {data.electrician ? (
                  <div className="staff-row">
                    <span className="role">⚡️ Elektrik</span>
                    <span className="val">{data.electrician}</span>
                  </div>
                ) : null}
              </>
            ) : (
              <p className="empty-hint">Xizmat xodimlari ko'rsatilmagan</p>
            )}
          </div>
        </div>

        {data.note?.trim() ? (
          <div className="pv-note">
            <p style={{ margin: 0 }}>{data.note}</p>
          </div>
        ) : null}

        <div className="totals-card">
          <div className="total-item">
            <span className="t-label">#Bemorlar</span>
            <strong>{totals.bemor}</strong>
          </div>
          <div className="total-item">
            <span className="t-label">#Qarovchi</span>
            <strong>{totals.qarovchi}</strong>
          </div>
          <div className="total-item">
            <span className="t-label">Vipiska</span>
            <strong>{totals.vipiska}</strong>
          </div>
          <div className="total-item">
            <span className="t-label">Keldi</span>
            <strong>{formatKeldi(totals.keldi)}</strong>
          </div>
          <div className="total-item jami">
            <span className="t-label">Jami</span>
            <strong>{totals.jami}</strong>
          </div>
        </div>

        <footer className="report-footer">
          <div className="footer-line" />
          <div className="footer-row">
            <span>
              Shakllantirilgan: <strong>{formatNow()}</strong>
            </span>
            <span className="footer-brand">Hospital Daily Summary</span>
          </div>
        </footer>
      </div>
    </section>
  );
});

export default ReportPreview;
