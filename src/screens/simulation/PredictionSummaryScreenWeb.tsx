import { useNavigate } from 'react-router';
import { WebLayout } from '../../components/WebLayout';
import {
  ArrowLeft,
  ArrowUpRight,
  Clock3,
  Loader2,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPredictionsHistory } from '../../api/prediction';

export default function PredictionSummaryScreenWeb() {
  const navigate = useNavigate();
  const [lastPrediction, setLastPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLastPrediction = async () => {
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userStr);
      try {
        const data = await getPredictionsHistory(user.user_id);
        if (data.length > 0) {
          setLastPrediction(data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch summary:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastPrediction();
  }, [navigate]);

  if (isLoading) {
    return (
      <WebLayout maxWidth="full" showHeader={false} showSidebar>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      </WebLayout>
    );
  }

  const getStat = (prediction: any, key: string) => {
    if (!prediction) return 0;

    if (prediction[key] !== undefined && prediction[key] !== null && prediction[key] !== 0) {
      return parseFloat(prediction[key]);
    }

    if (prediction.forecast_result) {
      try {
        const result = JSON.parse(prediction.forecast_result);
        if (result[key]) {
          return parseFloat(result[key]);
        }
      } catch (error) {
        console.error('Unable to parse forecast_result:', error);
      }
    }

    return 0;
  };

  const successProb = Math.round(getStat(lastPrediction, 'success_probability'));
  const financialImpact = Math.round(getStat(lastPrediction, 'financial_impact'));
  const lifeImpact = Math.round(getStat(lastPrediction, 'life_satisfaction'));
  const timelineValue = lastPrediction?.timeline || '6-12 months';
  const decisionSignal =
    successProb >= 80 ? 'Strong positive projection' : successProb >= 55 ? 'Balanced upward projection' : 'Cautious outlook';
  const confidenceLabel =
    successProb >= 75 ? 'High Confidence' : successProb >= 50 ? 'Moderate Confidence' : 'Low Confidence';
  const ringDegrees = Math.max(16, Math.min(360, Math.round((successProb / 100) * 360)));

  const topStats = [
    {
      label: 'Prediction Score',
      value: `${successProb}%`,
      subtext: 'Composite confidence index',
      panelTone: 'from-blue-50 to-cyan-50',
      borderTone: 'border-blue-200',
      labelTone: 'text-blue-700',
      valueTone: 'text-slate-950',
    },
    {
      label: 'Execution Window',
      value: timelineValue,
      subtext: 'Expected pace to materialize',
      panelTone: 'from-violet-50 to-indigo-50',
      borderTone: 'border-violet-200',
      labelTone: 'text-violet-700',
      valueTone: 'text-slate-950',
    },
    {
      label: 'Projected Upside',
      value: `+₹${financialImpact}K`,
      subtext: 'Estimated gain profile',
      panelTone: 'from-emerald-50 to-teal-50',
      borderTone: 'border-emerald-200',
      labelTone: 'text-emerald-700',
      valueTone: 'text-emerald-950',
    },
    {
      label: 'Life Impact',
      value: `+${lifeImpact}%`,
      subtext: 'Wellbeing and alignment shift',
      panelTone: 'from-amber-50 to-orange-50',
      borderTone: 'border-amber-200',
      labelTone: 'text-amber-700',
      valueTone: 'text-orange-950',
    },
  ];

  const breakdownCards = [
    {
      label: 'Timeline Breakdown',
      value: timelineValue,
      note: 'Optimal pace mapped',
      icon: Clock3,
      iconTone: 'from-sky-500 to-blue-600',
      noteTone: 'text-slate-700',
      chip: 'Execution rhythm',
      surfaceTone: 'from-blue-50 via-white to-cyan-50',
      chipTone: 'border-blue-200 bg-blue-50 text-blue-700',
      actionTone: 'border-blue-200 bg-blue-50 text-blue-700 group-hover:border-blue-300 group-hover:text-blue-900',
      glowTone: 'bg-blue-100/90',
    },
    {
      label: 'Financial Upside',
      value: `+₹${financialImpact}K`,
      note: 'Estimated gross differential',
      icon: Wallet,
      iconTone: 'from-emerald-500 to-teal-500',
      noteTone: 'text-slate-700',
      chip: 'Value signal',
      surfaceTone: 'from-emerald-50 via-white to-teal-50',
      chipTone: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      actionTone: 'border-emerald-200 bg-emerald-50 text-emerald-700 group-hover:border-emerald-300 group-hover:text-emerald-900',
      glowTone: 'bg-emerald-100/90',
    },
    {
      label: 'Life Balance Impact',
      value: `+${lifeImpact}% change`,
      note: 'Higher satisfaction coefficients',
      icon: Sparkles,
      iconTone: 'from-orange-400 to-amber-500',
      noteTone: 'text-slate-700',
      chip: 'Quality shift',
      surfaceTone: 'from-orange-50 via-white to-amber-50',
      chipTone: 'border-orange-200 bg-orange-50 text-orange-700',
      actionTone: 'border-orange-200 bg-orange-50 text-orange-700 group-hover:border-orange-300 group-hover:text-orange-900',
      glowTone: 'bg-orange-100/90',
    },
  ];

  return (
    <WebLayout maxWidth="full" showHeader={false} showSidebar>
      <div className="min-h-screen bg-[linear-gradient(180deg,#eef4ff_0%,#f8fbff_24%,#ffffff_100%)] px-6 py-8 text-slate-900">
        <div className="mx-auto max-w-[1320px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_28px_80px_-32px_rgba(15,23,42,0.22)]">
            <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-blue-100 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-indigo-100 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-28 w-72 rounded-full bg-sky-100 blur-3xl" />
            <div className="mb-8 flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
              <div className="max-w-4xl">
                <button
                  onClick={() => navigate('/analytics')}
                  className="mb-6 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Dashboard</span>
                </button>

                <p className="mb-3 text-[11px] font-black uppercase tracking-[0.42em] text-blue-700">
                  Predictive Performance Analysis
                </p>
                <h1 className="text-5xl font-black tracking-[-0.05em] text-slate-950 md:text-7xl">
                  Simulation Outcome
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
                  A premium performance-analysis view of your latest prediction, designed to show confidence, timing,
                  upside, and quality of direction at a glance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 xl:w-[360px]">
                {topStats.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-[1.5rem] border bg-gradient-to-br ${item.panelTone} ${item.borderTone} p-4 shadow-sm`}
                  >
                    <p className={`text-[10px] font-black uppercase tracking-[0.24em] ${item.labelTone}`}>{item.label}</p>
                    <p className={`mt-2 text-2xl font-black tracking-tight ${item.valueTone}`}>{item.value}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-700">{item.subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-600">Overall Success Probability</p>
                    <p className="mt-2 text-2xl font-black text-slate-950">Outcome strength index</p>
                  </div>
                  <div className="rounded-2xl bg-slate-900 p-3 text-white shadow-lg shadow-slate-300/40">
                    <Target className="h-6 w-6" />
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-6">
                  <div
                    className="relative flex h-72 w-72 items-center justify-center rounded-full"
                    style={{
                      background: `conic-gradient(#60a5fa 0deg, #818cf8 ${Math.max(
                        1,
                        ringDegrees * 0.55
                      )}deg, #c084fc ${ringDegrees}deg, rgba(255,255,255,0.08) ${ringDegrees}deg 360deg)`,
                    }}
                  >
                    <div className="absolute inset-[18px] rounded-full bg-white shadow-inner" />
                    <div className="relative z-10 text-center">
                      <p className="text-xs font-black uppercase tracking-[0.24em] text-slate-600">Prediction Score</p>
                      <p className="mt-2 text-7xl font-black tracking-[-0.06em] text-slate-950">{successProb}%</p>
                      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                        <ShieldCheck className="h-4 w-4" />
                        <span>{confidenceLabel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-600">Decision Signal</p>
                    <p className="mt-3 text-2xl font-black tracking-tight text-slate-950">{decisionSignal}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-[10px] font-black uppercase tracking-[0.24em] text-slate-600">Momentum View</p>
                    <div className="mt-3 flex items-center gap-3 text-slate-900">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-lg font-bold">
                        {successProb >= 80 ? 'Accelerating' : successProb >= 55 ? 'Stable growth' : 'Needs support'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {breakdownCards.map((card) => (
                  <div
                    key={card.label}
                    className={`group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br ${card.surfaceTone} p-6 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.28)]`}
                  >
                    <div className={`pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full ${card.glowTone} blur-2xl`} />
                    <div className="relative flex items-center gap-5">
                      <div className={`relative flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.7rem] bg-gradient-to-br ${card.iconTone} shadow-[0_18px_30px_-18px_rgba(15,23,42,0.45)]`}>
                        <div className="absolute inset-[1px] rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.02))]" />
                        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-900 shadow-sm">
                          <card.icon className="h-7 w-7 stroke-[2.6]" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-500">{card.label}</p>
                            <p className="mt-2 text-4xl font-black tracking-tight text-slate-950">{card.value}</p>
                            <p className={`mt-1 text-sm font-bold ${card.noteTone}`}>{card.note}</p>
                          </div>
                          <div className="flex flex-col items-end gap-3">
                            <span className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${card.chipTone}`}>
                              {card.chip}
                            </span>
                            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm transition-all duration-300 ${card.actionTone}`}>
                              <ArrowUpRight className="h-6 w-6 stroke-[2.4] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${card.iconTone}`}
                            style={{
                              width:
                                card.label === 'Timeline Breakdown'
                                  ? '76%'
                                  : card.label === 'Financial Upside'
                                    ? '82%'
                                    : '88%',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            <button
              onClick={() => navigate('/analysis/alternate')}
              className="flex min-h-[88px] items-center justify-center rounded-[2rem] bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-7 text-base font-black tracking-[0.02em] text-white shadow-[0_24px_48px_-24px_rgba(8,145,178,0.65)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_54px_-24px_rgba(37,99,235,0.75)]"
            >
              Alternate Scenarios
            </button>
            <button
              onClick={() => navigate('/analysis/compare')}
              className="flex min-h-[88px] items-center justify-center rounded-[2rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 px-8 py-7 text-base font-black tracking-[0.02em] text-white shadow-[0_24px_48px_-24px_rgba(99,102,241,0.65)] transition-all hover:-translate-y-1 hover:shadow-[0_28px_54px_-24px_rgba(168,85,247,0.7)]"
            >
              Compare Futures
            </button>
            <button
              onClick={() => navigate('/simulation/timeline')}
              className="flex min-h-[88px] items-center justify-center rounded-[2rem] border border-slate-300 bg-white px-8 py-7 text-base font-black tracking-[0.02em] text-slate-800 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.28)] transition-all hover:-translate-y-1 hover:border-slate-400 hover:bg-slate-50"
            >
              View Timeline
            </button>
          </div>
        </div>
      </div>
    </WebLayout>
  );
}
