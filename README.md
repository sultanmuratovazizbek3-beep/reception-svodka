# Reception Svodka (Lovable / React)

Kundalik shifoxona svodkasi — React + Vite. Lovable.dev uchun tayyor.

## Lovable ga yuklash

### Variant A — GitHub orqali (tavsiya)

1. Bu papkani GitHub repoga push qiling
2. [lovable.dev](https://lovable.dev) → **Import from GitHub**
3. Reponi tanlang → ochiladi

### Variant B — Lovable chat

Yangi project ochib shunday yozing:

> Import this React Vite app: hospital reception daily summary form with live preview, PNG export, print. Departments, duty doctors, ambulance team, totals.

Keyin `src/` dagi kodlarni joylashtiring yoki GitHub import qiling.

## Lokal ishga tushirish

```bash
cd reception-svodka-lovable
npm install
npm run dev
```

## Imkoniyatlar

- Bo'limlar: bemor / qarovchi / vipiska / keldi
- Tez yordam jamoasi + xizmat xodimlari
- Avto **Jami** (bemor + qarovchi)
- PNG yuklab olish
- Chop etish (A4)
- Telegram matn nusxasi
- Qoralama (localStorage)

## Fayllar

```
src/
  App.tsx                 # asosiy logika
  components/
    SummaryForm.tsx       # chap forma
    ReportPreview.tsx     # o'ng hisobot
  lib/
    defaults.ts           # namuna ma'lumotlar
    format.ts             # jami, matn, sana
  index.css               # dizayn + print
```
