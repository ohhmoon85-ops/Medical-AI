
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell
} from 'recharts';
import { 
  Activity, ShieldCheck, DollarSign, Clock, Zap, 
  Menu, X, Info, Target, Landmark, ChevronRight, UserCheck, AlertTriangle, Plane, Anchor, Radio
} from 'lucide-react';

// --- Components ---

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-5 md:p-6 ${className}`}>
    <h3 className="text-base md:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
      <Info className="w-4 h-4 text-blue-600" /> {title}
    </h3>
    {children}
  </div>
);

const AudienceBadge: React.FC<{ type: 'clinician' | 'management' | 'readiness'; content: string }> = ({ type, content }) => {
  const styles = {
    clinician: "bg-emerald-50 text-emerald-700 border-emerald-200",
    management: "bg-blue-50 text-blue-700 border-blue-200",
    readiness: "bg-orange-50 text-orange-700 border-orange-200"
  };
  const labels = {
    clinician: "Medical Corps (Senior Specialists)",
    management: "Command Leadership (Strategic Assets)",
    readiness: "Operational Readiness (Personnel)"
  };
  return (
    <div className={`p-3 rounded-lg border ${styles[type]} mb-2 text-[11px] md:text-xs`}>
      <span className="font-black block uppercase tracking-wider mb-1 opacity-80">{labels[type]}</span>
      <p className="font-medium leading-relaxed">{content}</p>
    </div>
  );
};

const Section: React.FC<{
  id: string;
  title: string;
  coreMessage: string;
  vizDescription: string;
  audiencePoints: { clinician: string; management: string; readiness: string };
  children: React.ReactNode;
}> = ({ id, title, coreMessage, vizDescription, audiencePoints, children }) => (
  <section id={id} className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center border-b border-slate-100 last:border-0">
    <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-5 space-y-6">
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-black tracking-widest uppercase">
          STRATEGIC FOCUS: {id.toUpperCase()}
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">{title}</h2>
        <div className="p-4 bg-slate-900 text-white border-l-4 border-blue-500 rounded-r-xl shadow-lg italic text-sm md:text-base font-medium">
          "{coreMessage}"
        </div>
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Target className="w-4 h-4" /> Strategic Value Props
          </h4>
          <AudienceBadge type="management" content={audiencePoints.management} />
          <AudienceBadge type="readiness" content={audiencePoints.readiness} />
          <AudienceBadge type="clinician" content={audiencePoints.clinician} />
        </div>
      </div>
      <div className="lg:col-span-7 flex flex-col gap-4">
        <Card title="Operational Intelligence Visualization">
          {children}
          <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
            <p className="text-[10px] text-slate-500 leading-relaxed italic">
              <strong>Graphic Description:</strong> {vizDescription}
            </p>
          </div>
        </Card>
      </div>
    </div>
  </section>
);

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'intro', label: 'Top' },
    { id: 'leadership', label: 'Asset Protection' },
    { id: 'deployment', label: 'Ready Force' },
    { id: 'roi', label: 'Financial' },
    { id: 'integration', label: 'Integration' }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 h-16 flex items-center px-4 md:px-8">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('intro')}>
            <Activity className="text-blue-600 w-6 h-6" />
            <div className="flex flex-col">
              <span className="font-black text-slate-900 text-sm leading-none uppercase tracking-tighter">
                <span className="italic mr-1.5 opacity-80">ASIAN2U</span>MEDICAL AI
              </span>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">INDOPACOM Strategic Proposal</span>
            </div>
          </div>
          <div className="hidden md:flex gap-6">
            {navItems.map(item => (
              <button 
                key={item.id} 
                onClick={() => scrollTo(item.id)}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-24 px-8 gap-6 md:hidden">
          {navItems.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="text-3xl font-black text-left uppercase tracking-tighter">{item.label}</button>
          ))}
        </div>
      )}

      {/* Hero */}
      <section id="intro" className="min-h-screen pt-32 pb-20 px-4 bg-slate-950 text-white flex items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-[10px] font-black uppercase tracking-widest">
              <Landmark className="w-3 h-3" /> USFK • USFJ • INDOPACOM
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[0.95] tracking-tighter">
              Protect the <span className="text-blue-500 italic underline decoration-blue-500/50">Core</span><br/>Secure the Force
            </h1>
            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl">
              Precision AI-ECG screening for Pilots, Carriers, and Submarine crews. Defending the "Decision-Making Layer" from silent cardiac failure.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button onClick={() => scrollTo('leadership')} className="px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl transition-all flex items-center gap-2 uppercase tracking-tighter">
                Strategic Briefing <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Tactical ECG UI Visualization */}
          <div className="relative hidden md:block group">
             <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all duration-1000"></div>
             <div className="relative bg-slate-900 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl p-6 aspect-square flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-black tracking-widest text-slate-400 uppercase">AI-ECG ANALYSIS ACTIVE</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-500">INDOPACOM_STRAT_01</div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center gap-4">
                  {[1, 2, 3].map((leadNum, i) => (
                    <div key={i} className="h-16 relative overflow-hidden bg-slate-950/50 rounded-lg border border-slate-800/50">
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                        <path 
                          d={`M 0 32 Q 25 32 40 10 T 60 50 T 80 32 L 120 32 T 135 10 T 155 50 T 175 32 L 250 32`} 
                          fill="none" 
                          stroke={i === 0 ? "#3b82f6" : "#475569"} 
                          strokeWidth="2"
                          className="animate-[dash_4s_linear_infinite]"
                          style={{
                            vectorEffect: 'non-scaling-stroke',
                            strokeDasharray: '10, 5',
                            animationDelay: `${i * 0.5}s`
                          }}
                        />
                      </svg>
                      <div className="absolute top-2 left-3 text-[9px] font-black text-slate-600 uppercase">LEAD {leadNum}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6">
                   <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">LVSD RISK SCORE (ASSET 40+)</span>
                      <span className="text-4xl font-black text-white italic">86.2</span>
                   </div>
                   <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[86%] shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                   </div>
                   <div className="mt-4 flex gap-4">
                      <div className="flex-1 text-center py-2 bg-red-500/20 border border-red-500/30 rounded-lg">
                        <span className="text-[9px] font-black text-red-400 uppercase">NON-DEPLOYABLE</span>
                      </div>
                      <div className="flex-1 text-center py-2 bg-blue-500 border border-blue-400 rounded-lg">
                        <span className="text-[9px] font-black text-white uppercase tracking-tighter">URGENT CARE REFERRAL</span>
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Floating Info Tags */}
             <div className="absolute -top-4 -right-4 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl max-w-[150px]">
                <p className="text-[10px] font-black text-blue-400 uppercase mb-1 tracking-tighter">Asset Identified</p>
                <p className="text-[9px] text-slate-300 leading-tight">Carrier Strike Group Core Personnel</p>
             </div>
          </div>
        </div>
      </section>

      {/* 1. High-Value Asset Protection (Senior Officers & Specialists) */}
      <Section 
        id="leadership" 
        title="Securing High-Value Command Assets" 
        coreMessage="Cardiac risk doubles for personnel over 40. AI-ECG protects the life-blood of the force: Senior Officers, Airforce Pilots, and Carrier/Submarine crews." 
        vizDescription="Heart disease risk trajectory (Ages 20-60+). Highlighting the 'Command Continuity Window' where critical expertise peaks but cardiac risk spikes."
        audiencePoints={{
          management: "Defends against sudden command voids in Air, Sea, and Space operations due to silent structural heart failure.",
          readiness: "Prioritizes screening for high-cost training assets: Pilots, Aegis operators, and Nuclear submarine crews.",
          clinician: "Enables preventative screening for high-G and high-stress environments where undetected LVSD is lethal."
        }}
      >
        <div className="grid grid-cols-1 gap-6">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { age: '20s', risk: 4 },
                { age: '30s', risk: 12 },
                { age: '40s', risk: 48, highlight: true },
                { age: '50s+', risk: 92, highlight: true }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="age" tick={{fontSize: 12, fontWeight: 700}} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="risk" radius={[8, 8, 0, 0]} barSize={50}>
                  { [4,12,48,92].map((_, index) => (
                    <Cell key={index} fill={index >= 2 ? '#2563eb' : '#cbd5e1'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
              <Plane className="w-5 h-5 text-blue-400" />
              <span className="text-[9px] font-black text-slate-300 uppercase leading-tight">Flight Crews<br/>(High-G)</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
              <Anchor className="w-5 h-5 text-blue-400" />
              <span className="text-[9px] font-black text-slate-300 uppercase leading-tight">Carrier Ops<br/>(Core Lead)</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col items-center gap-2 text-center">
              <Radio className="w-5 h-5 text-blue-400" />
              <span className="text-[9px] font-black text-slate-300 uppercase leading-tight">Submarine<br/>(Remote)</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 2. Non-Deployable Screening */}
      <Section 
        id="deployment" 
        title="Ready Force: Zero Non-Deployable Risk" 
        coreMessage="Flag 'Non-Deployable' cardiac profiles before the ship leaves port. Prevent catastrophic MEDEVAC missions in remote INDOPACOM waters." 
        vizDescription="Optimization of the deployment pipeline. AI-ECG flags high-risk personnel at home station, saving ~$150k per avoided deep-sea/aerial MEDEVAC."
        audiencePoints={{
          management: "Eliminates the logistical nightmare of replacing key personnel mid-deployment due to cardiac emergencies.",
          readiness: "Guarantees that 100% of personnel in high-stress forward environments are cardiologically 'Full Mission Capable'.",
          clinician: "Objective data for 'Fit for Sea Duty' and 'Fit for Flight' boards, backed by AUROC 0.9+ sensitivity."
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
          <div className="bg-slate-900 p-6 rounded-2xl flex flex-col justify-center text-center">
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Standard Screening</span>
            <div className="text-4xl font-black text-white italic">74%</div>
            <p className="text-[9px] text-slate-500 mt-2 uppercase italic">Asymptomatic Detection Gap</p>
          </div>
          <div className="bg-blue-600 p-6 rounded-2xl flex flex-col justify-center text-center shadow-xl shadow-blue-500/20">
            <span className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-2">AI-ECG (Pre-Deployment)</span>
            <div className="text-4xl font-black text-white italic">94%</div>
            <p className="text-[9px] text-blue-100 mt-2 uppercase font-bold">Precision Efficiency</p>
          </div>
        </div>
      </Section>

      {/* 3. ROI & Financial Impact */}
      <Section 
        id="roi" 
        title="Economic Force Multiplier" 
        coreMessage="A single cardiac-related pilot grounding or carrier-deck MEDEVAC exceeds $250k in immediate costs. AI-ECG is the most efficient asset protection tool." 
        vizDescription="Financial comparison: High-cost specialty cardiac care vs. Software-scalable AI-ECG preventative screening."
        audiencePoints={{
          management: "Dramatically reduces O&M medical expenditures by catching high-acuity risks at the clinic level.",
          readiness: "Scales to the entire force without additional hardware or high-cost specialty contractor fees.",
          clinician: "Maximizes usage of existing ECG infrastructure, increasing diagnostic throughput by 400%."
        }}
      >
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex justify-between items-center">
             <span className="text-[11px] font-black text-emerald-700 uppercase tracking-tighter">Est. Annual INDOPACOM Savings</span>
             <span className="text-2xl font-black text-emerald-600">$4.2M+</span>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-lg flex justify-between items-center">
            <span className="text-xs font-bold text-slate-600 uppercase">Avg Cost of Carrier-to-Shore MEDEVAC</span>
            <span className="text-xl font-black text-blue-600">$185,000+</span>
          </div>
        </div>
      </Section>

      {/* 4. Frictionless Integration */}
      <Section 
        id="integration" 
        title="Zero-Friction Command Integration" 
        coreMessage="No new hardware. Works with existing units in USFK/USFJ clinics. Results appear on existing printouts and MHS Genesis records." 
        vizDescription="Workflow sync with MHS Genesis and edge medical devices, providing instantaneous AI-risk scoring for front-line medics."
        audiencePoints={{
          management: "Software-led deployment means zero capital expenditure (CapEx) for 100% theater coverage.",
          readiness: "Immediate decision support for medical officers during readiness reviews and annual physicals.",
          clinician: "Seamless supplemental analysis that integrates with standard GE/Philips/Schiller devices."
        }}
      >
        <div className="bg-slate-900 p-6 rounded-2xl text-white relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="text-yellow-400 fill-yellow-400 w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tactical Edge Integration</span>
          </div>
          <div className="text-2xl font-black text-red-400 mb-1 tracking-tighter">Critical Asset Risk: HIGH</div>
          <div className="text-4xl font-black italic mb-4">86.2</div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full">
            <div className="h-full bg-red-500 w-[86%] rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 uppercase font-bold tracking-tight">Recommendation: Immediate Flight/Sea Duty Suspension for Specialist Review</p>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-950 py-20 px-4 text-center border-t border-slate-900">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex justify-center items-center gap-2 text-white">
            <Activity className="text-blue-600 w-8 h-8" />
            <span className="text-3xl font-black italic tracking-tighter mr-1">ASIAN2U</span>
            <span className="text-3xl font-black tracking-tighter">MEDICAL AI</span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
             <span>FDA REGISTERED</span>
             <span>DoD CYBER READY</span>
             <span>HIPAA COMPLIANT</span>
          </div>
          <p className="text-slate-500 text-xs max-w-lg mx-auto leading-relaxed">
            Medical AI: Defending the heart of the INDOPACOM mission. Protecting pilots, crews, and command assets through the world's most advanced cardiac intelligence.
          </p>
          <div className="pt-8 border-t border-slate-900 text-[10px] text-slate-700 font-bold">
            © 2026 ASIAN2U & MEDICAL AI. STRATEGIC PROPOSAL FOR USFK/USFJ/INDOPACOM LEADERSHIP.
          </div>
        </div>
      </footer>

      {/* Custom styles for waveform animation */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
}
