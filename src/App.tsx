import { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import SummaryForm from "./components/SummaryForm";
import ReportPreview from "./components/ReportPreview";
import {
  createDemoSummary,
  createEmptySummary,
  STORAGE_KEY,
} from "./lib/defaults";
import { buildPlainText, formatDateDot, formatNow } from "./lib/format";
import type { SummaryData } from "./types";

function loadDraft(): SummaryData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SummaryData;
  } catch {
    return null;
  }
}

export default function App() {
  const [data, setData] = useState<SummaryData>(
    () => loadDraft() ?? createEmptySummary()
  );
  const [hint, setHint] = useState("Qoralama avtomatik saqlanadi");
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setHint("Qoralama saqlandi · " + formatNow());
    } catch {
      /* ignore */
    }
  }, [data]);

  const fileBase = useMemo(
    () => `svodka-${formatDateDot(data.date || "").replace(/\./g, "-")}`,
    [data.date]
  );

  const handleDemo = () => {
    setData(createDemoSummary());
    setHint("Namuna yuklandi");
  };

  const handleClear = () => {
    if (!confirm("Formani tozalash? Qoralama o'chiriladi.")) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setData(createEmptySummary());
    setHint("Forma tozalandi");
  };

  const handleCopy = async () => {
    const text = buildPlainText(data);
    try {
      await navigator.clipboard.writeText(text);
      setHint("Matn nusxalandi (Telegram uchun)");
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
      setHint("Matn nusxalandi");
    }
  };

  const handlePrint = () => {
    setHint("Chop etish oynasi ochildi");
    window.print();
  };

  const handleDownloadPng = async () => {
    const sheet = reportRef.current;
    if (!sheet) return;
    setDownloading(true);
    setHint("PNG tayyorlanmoqda…");
    try {
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 80)));
      const canvas = await html2canvas(sheet, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
      });
      const link = document.createElement("a");
      link.download = `${fileBase}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      setHint("PNG yuklab olindi ✓");
    } catch (err) {
      console.error(err);
      setHint("PNG xato");
      alert("PNG yuklab bo'lmadi.\n\n" + ((err as Error).message || ""));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <div className="bg-glow" aria-hidden="true" />

      <header className="topbar no-print">
        <div className="brand">
          <div className="brand-mark">🏥</div>
          <div>
            <p className="brand-kicker">Kundalik hisobot</p>
            <h1>Reseption svodka</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <button type="button" className="btn ghost" onClick={handleDemo}>
            Namuna
          </button>
          <button type="button" className="btn ghost" onClick={handleClear}>
            Tozalash
          </button>
          <button type="button" className="btn ghost" onClick={handleCopy}>
            Nusxa olish
          </button>
          <button
            type="button"
            className="btn primary"
            disabled={downloading}
            onClick={handleDownloadPng}
          >
            ⬇️ PNG yuklab olish
          </button>
          <button type="button" className="btn ghost" onClick={handlePrint}>
            🖨️ Chop etish
          </button>
        </div>
      </header>

      <main className="layout">
        <SummaryForm data={data} onChange={setData} hint={hint} />
        <ReportPreview
          ref={reportRef}
          data={data}
          downloading={downloading}
          onDownloadPng={handleDownloadPng}
          onPrint={handlePrint}
        />
      </main>
    </>
  );
}
