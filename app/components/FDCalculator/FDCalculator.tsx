"use client";
import React, { useState, useCallback, useRef, useMemo } from "react";
import * as htmlToImage from "html-to-image";
import styles from "./FDCalculator.module.css";

type CompFreq = "yearly" | "halfyearly" | "quarterly" | "monthly";
type Mode = "lumpsum" | "monthly";

const FREQ_LABELS: Record<CompFreq, string> = {
  yearly: "Yearly",
  halfyearly: "Half-Yearly",
  quarterly: "Quarterly",
  monthly: "Monthly",
};

const FREQ_N: Record<CompFreq, number> = {
  yearly: 1, halfyearly: 2, quarterly: 4, monthly: 12,
};

const SIZES = [
  { label: "HD (1920×1080)", w: 1920, h: 1080, suffix: "hd" },
  { label: "2K (2560×1440)", w: 2560, h: 1440, suffix: "2k" },
  { label: "4K (3840×2160)", w: 3840, h: 2160, suffix: "4k" },
];

function fmtINR(n: number): string {
  const s = Math.round(Math.abs(n)).toString();
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const c = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") : "";
  return `${n < 0 ? "-" : ""}${c ? c + "," : ""}${last3}`;
}

function totalMonths(y: number, m: number): number {
  return y * 12 + m;
}

function toYears(months: number): number {
  return months / 12;
}

const FDCalculator: React.FC = () => {
  const [mode, setMode] = useState<Mode>("lumpsum");
  const [amount, setAmount] = useState("100000");
  const [monthlyAmt, setMonthlyAmt] = useState("5000");
  const [rate, setRate] = useState("8.5");
  const [years, setYears] = useState("5");
  const [months, setMonths] = useState("0");
  const [freq, setFreq] = useState<CompFreq>("quarterly");
  const [taxRate, setTaxRate] = useState("0");
  const [sizeIdx, setSizeIdx] = useState(1);
  const [status, setStatus] = useState<"idle" | "rendering" | "done">("idle");
  const chartRef = useRef<HTMLDivElement>(null);

  const P = parseFloat(amount) || 0;
  const PMT = parseFloat(monthlyAmt) || 0;
  const r = parseFloat(rate) || 0;
  const yr = parseFloat(years) || 0;
  const mo = parseFloat(months) || 0;
  const totalMo = totalMonths(yr, mo);
  const t = toYears(totalMo);
  const n = FREQ_N[freq];
  const tax = parseFloat(taxRate) || 0;
  const R = r / 100;

  const { maturity, totalInvested, totalInterest, yearlyData, maxVal } = useMemo(() => {
    if (mode === "lumpsum") {
      const m = P * Math.pow(1 + R / n, n * t);
      const i = m - P;
      const data: { label: string; invested: number; interest: number; total: number }[] = [];
      let max = 0;
      for (let y = 1; y <= Math.ceil(t); y++) {
        const bal = P * Math.pow(1 + R / n, n * Math.min(y, t));
        const cumInt = bal - P;
        const inv = P;
        if (bal > max) max = bal;
        data.push({ label: `Yr ${y}`, invested: inv, interest: cumInt, total: bal });
      }
      return { maturity: m, totalInvested: P, totalInterest: i, yearlyData: data, maxVal: max };
    } else {
      let data: { label: string; invested: number; interest: number; total: number }[] = [];
      let max = 0;
      let cumInv = 0;
      for (let mIdx = 1; mIdx <= totalMo; mIdx++) {
        const curYear = Math.ceil(mIdx / 12);
        const periodsPerYear = n;
        const periodsElapsed = mIdx / (12 / periodsPerYear);
        const tYears = periodsElapsed / periodsPerYear;
        if (periodsElapsed % 1 === 0 || mIdx === totalMo) {
          let fv = 0;
          for (let k = 0; k < mIdx; k++) {
            const remainingPeriods = (mIdx - k) / (12 / periodsPerYear);
            fv += PMT * Math.pow(1 + R / periodsPerYear, remainingPeriods);
          }
          cumInv += (mIdx <= totalMo ? PMT : 0);
          const inv = Math.min(cumInv, PMT * mIdx);
          const int = fv - inv;
          const label = mIdx % 12 === 0 || mIdx === totalMo ? `Yr ${curYear}` : `M${mIdx}`;
          if (fv > max) max = fv;
          data.push({ label, invested: inv, interest: int, total: fv });
        }
        cumInv = PMT * mIdx;
      }
      const finalFV = data.length > 0 ? data[data.length - 1].total : 0;
      const finalInv = data.length > 0 ? data[data.length - 1].invested : 0;
      return {
        maturity: finalFV,
        totalInvested: finalInv,
        totalInterest: finalFV - finalInv,
        yearlyData: data,
        maxVal: max,
      };
    }
  }, [mode, P, PMT, R, n, t, totalMo]);

  const taxAmt = totalInterest * (tax / 100);
  const maturityAfterTax = maturity - taxAmt;

  const size = SIZES[sizeIdx];

  const exportChart = useCallback(async () => {
    if (!chartRef.current) return;
    setStatus("rendering");
    try {
      const dataUrl = await htmlToImage.toPng(chartRef.current, {
        width: size.w, height: size.h,
        pixelRatio: 1,
        backgroundColor: "#08080e",
      });
      const link = document.createElement("a");
      link.download = `fd-calculator-${size.suffix}.png`;
      link.href = dataUrl;
      link.click();
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    } catch { setStatus("idle"); }
  }, [size]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.modeToggle}>
            <button
              className={`${styles.modeBtn} ${mode === "lumpsum" ? styles.modeActive : ""}`}
              onClick={() => setMode("lumpsum")}
            >
              Lump Sum
            </button>
            <button
              className={`${styles.modeBtn} ${mode === "monthly" ? styles.modeActive : ""}`}
              onClick={() => setMode("monthly")}
            >
              Monthly SIP
            </button>
          </div>
          <p className={styles.sub}>
            {mode === "lumpsum"
              ? "Fixed Deposit — one-time investment"
              : "Recurring Deposit — invest every month"}
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.left}>
            {mode === "lumpsum" ? (
              <div className={styles.field}>
                <label className={styles.label}>Principal Amount (₹)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>₹</span>
                  <input type="text" value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
                    className={styles.input} placeholder="100000" />
                </div>
              </div>
            ) : (
              <div className={styles.field}>
                <label className={styles.label}>Monthly Investment (₹)</label>
                <div className={styles.inputWrap}>
                  <span className={styles.prefix}>₹</span>
                  <input type="text" value={monthlyAmt}
                    onChange={(e) => setMonthlyAmt(e.target.value.replace(/[^0-9.]/g, ""))}
                    className={styles.input} placeholder="5000" />
                </div>
              </div>
            )}

            <div className={styles.field}>
              <label className={styles.label}>Annual Interest Rate (%)</label>
              <div className={styles.inputWrap}>
                <input type="text" value={rate}
                  onChange={(e) => setRate(e.target.value.replace(/[^0-9.]/g, ""))}
                  className={styles.input} placeholder="8.5" />
                <span className={styles.suffix}>%</span>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Time Period</label>
              <div className={styles.splitRow}>
                <div className={styles.inputWrap}>
                  <input type="text" value={years}
                    onChange={(e) => setYears(e.target.value.replace(/[^0-9.]/g, ""))}
                    className={styles.input} placeholder="5" />
                  <span className={styles.suffix}>years</span>
                </div>
                <div className={styles.inputWrap}>
                  <input type="text" value={months}
                    onChange={(e) => setMonths(e.target.value.replace(/[^0-9.]/g, ""))}
                    className={styles.input} placeholder="0" />
                  <span className={styles.suffix}>months</span>
                </div>
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label className={styles.label}>Compounding</label>
                <select className={styles.select} value={freq}
                  onChange={(e) => setFreq(e.target.value as CompFreq)}>
                  {Object.entries(FREQ_LABELS).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Tax (%)</label>
                <div className={styles.inputWrap}>
                  <input type="text" value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value.replace(/[^0-9.]/g, ""))}
                    className={styles.input} placeholder="0" />
                  <span className={styles.suffix}>%</span>
                </div>
              </div>
            </div>

            <div className={styles.summaryMini}>
              <div className={styles.miniRow}>
                <span>Total Investment</span>
                <span className={styles.miniVal}>₹{fmtINR(totalInvested)}</span>
              </div>
              <div className={styles.miniRow}>
                <span>Total Interest</span>
                <span className={`${styles.miniVal} ${styles.green}`}>+₹{fmtINR(totalInterest)}</span>
              </div>
              {tax > 0 && (
                <div className={styles.miniRow}>
                  <span>Tax Deducted</span>
                  <span className={`${styles.miniVal} ${styles.red}`}>−₹{fmtINR(taxAmt)}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.right}>
            <div ref={chartRef} className={styles.resultCard}>
              <div className={styles.maturityBanner}>
                <span className={styles.maturityLabel}>Maturity Amount</span>
                <span className={styles.maturityVal}>₹{fmtINR(maturityAfterTax)}</span>
              </div>

              <div className={styles.chartContainer}>
                <div className={styles.barChart}>
                  {yearlyData.map((d, i) => {
                    const pct = maxVal > 0 ? (d.total / maxVal) * 100 : 0;
                    const intPct = d.total > 0 ? (d.interest / d.total) * 100 : 0;
                    return (
                      <div key={i} className={styles.barCol}>
                        <div className={styles.bar} style={{ height: `${pct}%` }}>
                          <div className={styles.barInt} style={{ height: `${intPct}%` }} />
                        </div>
                        <span className={styles.barLbl}>{d.label}</span>
                      </div>
                    );
                  })}
                </div>

                <div className={styles.lineChart}>
                  <svg viewBox={`0 0 ${yearlyData.length - 1 || 1} 100`} preserveAspectRatio="none" className={styles.lineSvg}>
                    <polyline
                      points={yearlyData.map((d, i) => `${i},${100 - (maxVal > 0 ? (d.total / maxVal) * 100 : 0)}`).join(" ")}
                      fill="none" stroke="rgba(96, 208, 255, 0.4)" strokeWidth="1.5" />
                    {yearlyData.map((d, i) => (
                      <circle key={i} cx={i} cy={100 - (maxVal > 0 ? (d.total / maxVal) * 100 : 0)} r="1.5"
                        fill="rgba(96, 208, 255, 0.6)" />
                    ))}
                  </svg>
                </div>
              </div>

              <div className={styles.legendRow}>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: "#a07cff" }} /> Principal
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: "#60d0ff" }} /> Interest
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendDot} style={{ background: "rgba(96,208,255,0.4)", border: "1px solid rgba(96,208,255,0.3)" }} /> Growth
                </span>
              </div>

              <div className={styles.breakdown}>
                <div className={styles.breakItem}>
                  <span className={styles.breakLabel}>Invested</span>
                  <span className={styles.breakVal}>₹{fmtINR(totalInvested)}</span>
                </div>
                <div className={styles.breakPlus}>+</div>
                <div className={styles.breakItem}>
                  <span className={styles.breakLabel}>Interest</span>
                  <span className={styles.breakVal} style={{ color: "#4ade80" }}>₹{fmtINR(totalInterest)}</span>
                </div>
                <div className={styles.breakEq}>=</div>
                <div className={styles.breakItem}>
                  <span className={styles.breakLabel}>Maturity</span>
                  <span className={styles.breakVal} style={{
                    background: "linear-gradient(135deg, #a07cff, #60d0ff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>₹{fmtINR(maturityAfterTax)}</span>
                </div>
              </div>
            </div>

            <div className={styles.exportRow}>
              <select className={styles.sizeSelect} value={sizeIdx}
                onChange={(e) => setSizeIdx(Number(e.target.value))}>
                {SIZES.map((s, i) => (
                  <option key={s.suffix} value={i}>{s.label}</option>
                ))}
              </select>
              <button className={`${styles.exportBtn} ${status === "rendering" ? styles.loading : ""}`}
                onClick={exportChart} disabled={status === "rendering"}>
                {status === "rendering" ? "⏳" : status === "done" ? "✓" : "↓"} Export PNG
              </button>
            </div>

            <div className={styles.formula}>
              {mode === "lumpsum"
                ? `A = P(1 + r/n)^(nt)`
                : `A = PMT × [((1 + r/n)^(nt) - 1) / (r/n)]`}
              &nbsp;·&nbsp; {totalMo} months @ {r}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FDCalculator;
