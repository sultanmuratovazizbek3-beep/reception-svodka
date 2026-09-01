import type { Department, SummaryData, Totals } from "../types";

export function formatDateDot(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function formatNow() {
  return new Date().toLocaleString("uz-UZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatKeldi(n: number) {
  return n > 0 ? `+${n}` : String(n);
}

export function calcTotals(departments: Department[]): Totals {
  const base = departments.reduce(
    (acc, d) => {
      acc.bemor += Number(d.bemor) || 0;
      acc.qarovchi += Number(d.qarovchi) || 0;
      acc.vipiska += Number(d.vipiska) || 0;
      acc.keldi += Number(d.keldi) || 0;
      return acc;
    },
    { bemor: 0, qarovchi: 0, vipiska: 0, keldi: 0 }
  );
  return { ...base, jami: base.bemor + base.qarovchi };
}

export function buildPlainText(data: SummaryData): string {
  const totals = calcTotals(data.departments);
  const lines: string[] = [];

  lines.push(data.greeting || "Assalomu alaykum");
  lines.push(formatDateDot(data.date) + ".");
  lines.push(data.title || "📌 Navbatchi shifokorlar");
  lines.push("");

  data.departments.forEach((d) => {
    if (d.name) lines.push(d.name);
    if (d.doctors) {
      lines.push("");
      lines.push(d.doctors);
    }
    lines.push("");
    lines.push(`#Bemor -${d.bemor}`);
    lines.push(`#qarovchi -${d.qarovchi}`);
    lines.push(`vipiska -${d.vipiska}`);
    lines.push(d.keldi > 0 ? `keldi+${d.keldi}` : `keldi-${d.keldi}`);
    lines.push("");
  });

  lines.push("Tez yordam jamoasi");
  lines.push("");
  if (data.amb_driver) {
    lines.push("🚑 Haydovchi");
    lines.push(data.amb_driver);
    lines.push("");
  }
  if (data.amb_doctor) {
    lines.push("📌 Vrach");
    lines.push(data.amb_doctor);
  }
  if (data.amb_nurse) {
    lines.push("Medbrat");
    lines.push(data.amb_nurse);
    lines.push("");
  }
  if (data.amb_contact) lines.push(data.amb_contact);
  lines.push("");

  if (data.security) {
    lines.push(`👨🏻‍✈️ ${data.security}`);
    lines.push("");
  }
  if (data.plumber) {
    lines.push(`🔧 Santexnik — ${data.plumber}`);
    lines.push("");
  }
  if (data.electrician) {
    lines.push(`⚡️ Elektrik — ${data.electrician}`);
    lines.push("");
  }

  if (data.note?.trim()) {
    lines.push(data.note.trim());
    lines.push("");
  }

  lines.push(`#Bemorlar -${totals.bemor}`);
  lines.push(`#Qarovchi -${totals.qarovchi}`);
  lines.push(`vipiska-${totals.vipiska}`);
  lines.push(`keldi-${totals.keldi}`);
  lines.push(`Jami -${totals.jami}`);

  return lines.join("\n");
}
