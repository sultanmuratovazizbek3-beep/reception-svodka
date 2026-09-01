import type { Department, SummaryData } from "../types";
import { emptyDept } from "../lib/defaults";
import { calcTotals, formatKeldi } from "../lib/format";

type Props = {
  data: SummaryData;
  onChange: (next: SummaryData) => void;
  hint: string;
};

export default function SummaryForm({ data, onChange, hint }: Props) {
  const totals = calcTotals(data.departments);

  const setField = <K extends keyof SummaryData>(key: K, value: SummaryData[K]) => {
    onChange({ ...data, [key]: value });
  };

  const updateDept = (id: string, patch: Partial<Department>) => {
    onChange({
      ...data,
      departments: data.departments.map((d) =>
        d.id === id ? { ...d, ...patch } : d
      ),
    });
  };

  const removeDept = (id: string) => {
    onChange({
      ...data,
      departments: data.departments.filter((d) => d.id !== id),
    });
  };

  const addDept = () => {
    onChange({
      ...data,
      departments: [...data.departments, emptyDept()],
    });
  };

  return (
    <section className="panel form-panel no-print">
      <div className="panel-head">
        <h2>Ma'lumotlarni to'ldirish</h2>
        <p>
          Bo'limlar va navbatchilarni kiriting — o'ngda tayyor chiroyli svodka
          chiqadi
        </p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} autoComplete="off">
        <fieldset>
          <legend>Asosiy</legend>
          <div className="grid-2">
            <label>
              <span>Sana</span>
              <input
                type="date"
                value={data.date}
                onChange={(e) => setField("date", e.target.value)}
                required
              />
            </label>
            <label>
              <span>Salomlashuv</span>
              <input
                type="text"
                value={data.greeting}
                onChange={(e) => setField("greeting", e.target.value)}
              />
            </label>
          </div>
          <label className="full">
            <span>Sarlavha</span>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setField("title", e.target.value)}
            />
          </label>
        </fieldset>

        <fieldset>
          <legend>Bo'limlar</legend>
          <div className="dept-list">
            {data.departments.map((dept, i) => (
              <div className="dept-card" key={dept.id}>
                <div className="dept-card-head">
                  <strong className="dept-index">Bo'lim {i + 1}</strong>
                  <button
                    type="button"
                    className="btn-icon danger"
                    title="O'chirish"
                    onClick={() => removeDept(dept.id)}
                  >
                    ✕
                  </button>
                </div>
                <label>
                  <span>Nomi</span>
                  <input
                    type="text"
                    value={dept.name}
                    onChange={(e) => updateDept(dept.id, { name: e.target.value })}
                    placeholder="#🏥 3-JONLANTIRISH BO'LIMI {REANIMATSIYA}"
                  />
                </label>
                <label>
                  <span>Navbatchi shifokor(lar)</span>
                  <textarea
                    rows={2}
                    value={dept.doctors}
                    onChange={(e) =>
                      updateDept(dept.id, { doctors: e.target.value })
                    }
                    placeholder="Asrorov D  +998 94 327 67 67"
                  />
                </label>
                <div className="grid-4">
                  <label>
                    <span>#Bemor</span>
                    <input
                      type="number"
                      min={0}
                      value={dept.bemor}
                      onChange={(e) =>
                        updateDept(dept.id, { bemor: Number(e.target.value) || 0 })
                      }
                    />
                  </label>
                  <label>
                    <span>#Qarovchi</span>
                    <input
                      type="number"
                      min={0}
                      value={dept.qarovchi}
                      onChange={(e) =>
                        updateDept(dept.id, {
                          qarovchi: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>Vipiska</span>
                    <input
                      type="number"
                      min={0}
                      value={dept.vipiska}
                      onChange={(e) =>
                        updateDept(dept.id, {
                          vipiska: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </label>
                  <label>
                    <span>Keldi</span>
                    <input
                      type="number"
                      value={dept.keldi}
                      onChange={(e) =>
                        updateDept(dept.id, { keldi: Number(e.target.value) || 0 })
                      }
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button type="button" className="btn add-btn" onClick={addDept}>
            + Bo'lim qo'shish
          </button>
        </fieldset>

        <fieldset>
          <legend>Tez yordam jamoasi</legend>
          <div className="grid-2">
            <label>
              <span>🚑 Haydovchi</span>
              <input
                type="text"
                value={data.amb_driver}
                onChange={(e) => setField("amb_driver", e.target.value)}
                placeholder="Ism, smena"
              />
            </label>
            <label>
              <span>📌 Vrach</span>
              <input
                type="text"
                value={data.amb_doctor}
                onChange={(e) => setField("amb_doctor", e.target.value)}
                placeholder="Ism, smena"
              />
            </label>
            <label>
              <span>Medbrat / Medsestra</span>
              <input
                type="text"
                value={data.amb_nurse}
                onChange={(e) => setField("amb_nurse", e.target.value)}
                placeholder="Ism, smena"
              />
            </label>
            <label>
              <span>Aloqa (Moxira va b.)</span>
              <input
                type="text"
                value={data.amb_contact}
                onChange={(e) => setField("amb_contact", e.target.value)}
                placeholder="+998 …"
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Xizmat xodimlari</legend>
          <div className="grid-2">
            <label>
              <span>👨🏻‍✈️ Qo'riqchi / Murod aka</span>
              <input
                type="text"
                value={data.security}
                onChange={(e) => setField("security", e.target.value)}
                placeholder="Ism va telefon"
              />
            </label>
            <label>
              <span>🔧 Santexnik</span>
              <input
                type="text"
                value={data.plumber}
                onChange={(e) => setField("plumber", e.target.value)}
                placeholder="Ism va telefon"
              />
            </label>
            <label className="full">
              <span>⚡️ Elektrik</span>
              <input
                type="text"
                value={data.electrician}
                onChange={(e) => setField("electrician", e.target.value)}
                placeholder="Ism va telefon"
              />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend>Izoh (ixtiyoriy)</legend>
          <label className="full">
            <span>Qo'shimcha matn</span>
            <textarea
              rows={2}
              value={data.note}
              onChange={(e) => setField("note", e.target.value)}
              placeholder="Kerak bo'lsa yozing…"
            />
          </label>
        </fieldset>
      </form>

      <div className="totals-live no-print">
        <span>
          Jami bemor: <b>{totals.bemor}</b>
        </span>
        <span>
          Qarovchi: <b>{totals.qarovchi}</b>
        </span>
        <span>
          Vipiska: <b>{totals.vipiska}</b>
        </span>
        <span>
          Keldi: <b>{formatKeldi(totals.keldi)}</b>
        </span>
        <span>
          Jami: <b>{totals.jami}</b>
        </span>
      </div>
      <p className="autosave-hint">{hint}</p>
    </section>
  );
}
