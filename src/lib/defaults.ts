import type { Department, SummaryData } from "../types";

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export function todayISO() {
  const d = new Date();
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, "0"),
    String(d.getDate()).padStart(2, "0"),
  ].join("-");
}

export function emptyDept(partial: Partial<Department> = {}): Department {
  return {
    id: uid(),
    name: "",
    doctors: "",
    bemor: 0,
    qarovchi: 0,
    vipiska: 0,
    keldi: 0,
    ...partial,
  };
}

export const DEFAULT_DEPT_NAMES = [
  "#🏥🏥🏥 3-JONLANTIRISH BO'LIMI {REANIMATSIYA}",
  "#🏥🏥🏥 JARROXLIK BO'LIMI",
  "🏨🏨🏨 4-qavat\n📌👨🏻‍⚕️ Reanimatsiya",
  "#🏥🏥🏥 DAVOLASH BO'LIMI {TERAPIYA}",
  "#🏥🏥🏥 BOLALAR BO'LIMI {PEDIATRIYA}",
];

export function createEmptySummary(): SummaryData {
  return {
    date: todayISO(),
    greeting: "Assalomu alaykum",
    title: "📌 Navbatchi shifokorlar",
    amb_driver: "",
    amb_doctor: "",
    amb_nurse: "",
    amb_contact: "",
    security: "",
    plumber: "",
    electrician: "",
    note: "",
    departments: DEFAULT_DEPT_NAMES.map((name) => emptyDept({ name })),
  };
}

export function createDemoSummary(): SummaryData {
  return {
    date: "2026-07-20",
    greeting: "Assalomu alaykum",
    title: "📌 Navbatchi shifokorlar",
    amb_driver: "Abdullayev A  24s",
    amb_doctor: "Atajanov U  24s",
    amb_nurse: "Isajonov O  24",
    amb_contact: "Moxira  +998 33 916 17 97",
    security: "Murod aka  97 782 07 35",
    plumber: "Anvar  +998 70 012 67 58",
    electrician: "Yusuf aka  +998 94 196 92 31",
    note: "",
    departments: [
      emptyDept({
        name: "#🏥🏥🏥 3-JONLANTIRISH BO'LIMI {REANIMATSIYA}",
        doctors: "📌 Asrorov D  +998 94 327 67 67",
        bemor: 7,
        qarovchi: 3,
        vipiska: 2,
        keldi: 0,
      }),
      emptyDept({
        name: "#🏥🏥🏥 JARROXLIK BO'LIMI",
        doctors: "Burxonov Samandar  99 831 60 31",
        bemor: 3,
        qarovchi: 0,
        vipiska: 0,
        keldi: 2,
      }),
      emptyDept({
        name: "🏨🏨🏨 4-qavat\n📌👨🏻‍⚕️ Reanimatsiya",
        doctors: "",
        bemor: 0,
        qarovchi: 0,
        vipiska: 0,
        keldi: 0,
      }),
      emptyDept({
        name: "#🏥🏥🏥 DAVOLASH BO'LIMI {TERAPIYA}",
        doctors: "📌 Anarkulov M  +998 99 695 67 98",
        bemor: 11,
        qarovchi: 2,
        vipiska: 3,
        keldi: 5,
      }),
      emptyDept({
        name: "#🏥🏥🏥 BOLALAR BO'LIMI {PEDIATRIYA}",
        doctors: "Sadikova Muyassar  93-550-09-92\nAlijonova Dono  88-701-43-44",
        bemor: 1,
        qarovchi: 1,
        vipiska: 0,
        keldi: 1,
      }),
    ],
  };
}

export const STORAGE_KEY = "hospital-svodka-lovable-v1";
