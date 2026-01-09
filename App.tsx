
import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Activity, ShieldCheck, DollarSign, Clock, Zap, 
  Menu, X, Info, Target, Landmark, ChevronRight
} from 'lucide-react';

// --- Types ---
interface SectionProps {
  id: string;
  title: string;
  coreMessage: string;
  vizDescription: string;
  audiencePoints: {
    clinician: string;
    management: string;
    remote: string;
  };
  children: React.ReactNode;
}

// --- Components ---

const Card: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
      <Info className="w-4 h-4 text-blue-600" /> {title}
    </h3>
    {children}
  </div>
);

const AudienceBadge: React.FC<{ type: 'clinician' | 'management' | 'remote'; content: string }> = ({ type, content }) => {
  const styles = {
    clinician: "bg-emerald-50 text-emerald-700 border-emerald-200",
    management: "bg-blue-50 text-blue-700 border-blue-200",
    remote: "bg-purple-50 text-purple-700 border-purple-200"
  };
  const labels = {
    clinician: "Military Medical Officers (Clinical)",
    management: "Command Leadership (Financial/Ops)",
    remote: "Role 2/3 Clinic Operators (Readiness)"
  };
  return (
    <div className={`p-3 rounded-lg border ${styles[type]} mb-2 text-sm`}>
      <span className="font-bold block text-xs uppercase tracking-wider mb-1">{labels[type]}</span>
      {content}
    </div>
  );
};

const Section: React.FC<SectionProps> = ({ id, title, coreMessage, vizDescription, audiencePoints, children }) => {
  return (
    <section id={id} data-section className="min-h-screen py-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-widest uppercase">
            Briefing: {id.replace('-', ' ')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{title}</h2>
          <div className="p-4 bg-white border-l-4 border-blue-600 rounded-r-xl shadow-sm italic text-slate-700 font-medium">
            " {coreMessage} "
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase flex items-center gap-2">
              <Target className="w-4 h-4" /> Strategic Stakeholder Value
            </h4>
            <AudienceBadge type="clinician" content={audiencePoints.clinician} />
            <AudienceBadge type="management" content={audiencePoints.management} />
            <AudienceBadge type="remote" content={audiencePoints.remote} />
          </div>
        </div>
        
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card title="Data Visualization & Simulation">
            {children}
            <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 leading-relaxed italic">
                <strong>Graphic Description:</strong> {vizDescription}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'intro', label: 'Overview' },
    { id: 'iceberg', label: 'The Iceberg' },
    { id: 'workflow', label: 'Speed' },
    { id: 'financial', label: 'ROI' },
    { id: 'clinical', label: 'Evidence' },
    { id: 'integration', label: 'Deployment' }
  ];

  // Smooth Scroll Handler
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 64; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // Intersection Observer for Active State
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is in top-ish portion of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll('section[id], section[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const icebergData = [
    { name: 'Symptomatic (Detected)', value: 50, color: '#2563eb' },
    { name: 'Asymptomatic (Hidden Risk)', value: 50, color: '#cbd5e1' }
  ];

  const accuracyData = [
    { group: 'Caucasian', score: 0.912 },
    { group: 'African American', score: 0.908 },
    { group: 'Hispanic', score: 0.906 },
    { group: 'Asian/Other', score: 0.909 },
  ];

  return (
    <div className="relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={(e) => scrollTo(e as any, 'intro')}>
            <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center">
              <Activity className="text-white w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-900 text-sm leading-none uppercase">Medical AI</span>
              <span className="text-blue-600 text-[10px] font-bold tracking-tighter uppercase">INDOPACOM Strategic Sales</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-8">
            {navItems.map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`text-xs font-bold uppercase tracking-widest transition-all duration-300 relative py-1 ${activeSection === item.id ? 'text-blue-600' : 'text-slate-500 hover:text-slate-900'}`}
                onClick={(e) => scrollTo(e, item.id)}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navItems.map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`text-2xl font-black uppercase tracking-tighter transition-colors ${activeSection === item.id ? 'text-blue-600' : 'text-slate-400'}`}
                onClick={(e) => scrollTo(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Intro Section */}
      <section id="intro" className="min-h-screen pt-32 pb-20 px-4 bg-slate-900 text-white flex items-center overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-[120px]"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest">
              <Landmark className="w-3 h-3" /> USFK • USFJ • INDOPACOM
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tighter">
              Enhancing <span className="text-blue-500">Force Readiness</span> with AI-ECG
            </h1>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed">
              Empowering INDOPACOM medical assets with immediate, expert-level cardiac diagnostics. From Role 2 forward-deployed clinics to Role 3 medical centers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={(e) => scrollTo(e as any, 'iceberg')}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2 group"
              >
                Launch Briefing <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-3 px-6 py-4 border border-slate-700 rounded-lg bg-slate-800/50">
                <ShieldCheck className="text-emerald-500 w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Mission Ready Solution</span>
              </div>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-emerald-600/20 rounded-full absolute -inset-10 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
              alt="Medical AI Readiness" 
              className="relative rounded-2xl border border-slate-700 shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
        </div>
      </section>

      {/* 1. Iceberg Problem */}
      <Section 
        id="iceberg"
        title="Identifying Hidden Cardiac Risks"
        coreMessage="50% of heart failure patients are asymptomatic or present vague symptoms, often remaining undiagnosed until severe progression occurs. We visualize this 'Silent Threat'."
        vizDescription="Iceberg and Funnel Model: The visible 50% above water represents diagnosed cases. The massive 50% below represents hidden risks (LVEF < 40%). The funnel shows how common military health issues like hypertension converge into heart failure."
        audiencePoints={{
          clinician: "Identify asymptomatic LVEF reduction during routine physicals or pre-deployment screenings.",
          management: "Early intervention prevents high-cost emergency evacuations and chronic disability management.",
          remote: "Enables non-specialist personnel in remote INDOPACOM sites to flag high-risk service members."
        }}
      >
        <div className="h-80 w-full flex items-center justify-center relative bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
           <ResponsiveContainer width="100%" height="100%">
             <PieChart>
               <Pie
                 data={icebergData}
                 cx="50%"
                 cy="50%"
                 innerRadius={60}
                 outerRadius={100}
                 paddingAngle={5}
                 dataKey="value"
               >
                 {icebergData.map((entry, index) => (
                   <Cell key={`cell-${index}`} fill={entry.color} />
                 ))}
               </Pie>
               <Tooltip />
               <Legend verticalAlign="bottom" height={36}/>
             </PieChart>
           </ResponsiveContainer>
           <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
             <span className="text-3xl font-black text-slate-800">50%</span>
             <p className="text-[10px] text-slate-500 uppercase font-extrabold tracking-tighter">Hidden Below Surface</p>
           </div>
        </div>
      </Section>

      {/* 2. Workflow Simulation */}
      <Section 
        id="workflow"
        title="Battlefield-Speed Diagnostics"
        coreMessage="Replace the 1-3 hour blood test wait with a 10-second AI analysis. Drastically reducing the clinical 'Fog of War' in emergency triage."
        vizDescription="Workflow Comparison: Traditional blood marker (NT-proBNP) timeline vs. AI-ECG immediate result. Demonstrates the removal of lab transportation and processing time (The Inefficiency Zone)."
        audiencePoints={{
          clinician: "Accelerates time-to-diagnosis in high-pressure ER or frontline environments.",
          management: "Increases facility throughput and optimizes bed management in Role 3 hospitals.",
          remote: "Provides diagnostic certainty where laboratory infrastructure is limited or unavailable."
        }}
      >
        <div className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center gap-2 mb-2 text-slate-500 font-bold text-[10px] uppercase">
                  <Clock className="w-3 h-3" /> Standard Blood Lab
                </div>
                <div className="text-3xl font-black text-slate-800">120m</div>
                <div className="w-full bg-slate-200 h-1.5 mt-3 rounded-full">
                  <div className="bg-slate-400 h-full w-full rounded-full"></div>
                </div>
             </div>
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2 text-blue-600 font-bold text-[10px] uppercase">
                  <Zap className="w-3 h-3" /> Medical AI ECG
                </div>
                <div className="text-3xl font-black text-blue-600">10s</div>
                <div className="w-full bg-blue-100 h-1.5 mt-3 rounded-full">
                  <div className="bg-blue-600 h-full w-[2%] rounded-full animate-pulse"></div>
                </div>
             </div>
          </div>
          <div className="relative pt-4 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Diagnosis Pipeline</p>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-blue-600 rounded-full"></div>
              <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
              <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
              <div className="h-1 flex-1 bg-slate-200 rounded-full"></div>
              <div className="h-3 w-3 bg-slate-200 rounded-full"></div>
            </div>
            <div className="flex justify-between mt-2 text-[9px] font-bold text-slate-400 uppercase">
              <span>Sensor Contact</span>
              <span>AI Cloud/Edge Analysis</span>
              <span>Decision Support</span>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Financial Impact */}
      <Section 
        id="financial"
        title="Force Budget Optimization"
        coreMessage="Avoiding a single heart failure hospitalization saves $109,000. These funds can be directly reallocated to critical Force Readiness needs like prosthetic support or mental health."
        vizDescription="Financial Reallocation Chart: Bar chart contrasting the $109K cost of one hospitalization versus the cost of early AI detection. Illustrates the 'Reallocation Path' to other military health priorities."
        audiencePoints={{
          clinician: "Non-invasive screening reduces patient burden and avoids unnecessary invasive procedures.",
          management: "Delivers significant ROI by reducing high-acuity patient volume and long-term care liabilities.",
          remote: "Zero CapEx software-led deployment model allows for rapid multi-site scaling."
        }}
      >
        <div className="h-64 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={[{ name: 'Savings/Event', value: 109000 }]}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
               <XAxis dataKey="name" hide />
               <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
               <Tooltip cursor={{fill: 'transparent'}} formatter={(value) => `$${value.toLocaleString()}`} />
               <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={60} />
             </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="mt-6 p-5 bg-slate-900 rounded-xl text-white flex items-center gap-5 border border-slate-700">
           <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center shrink-0">
             <DollarSign className="w-7 h-7 text-blue-400" />
           </div>
           <div>
             <div className="text-2xl font-black">$109,000 <span className="text-sm font-normal text-slate-400">/ Saved</span></div>
             <p className="text-[10px] text-blue-300 font-bold uppercase tracking-wider">Equivalent to funding 15+ Advanced Rehab Cycles</p>
           </div>
        </div>
      </Section>

      {/* 4. Clinical Evidence */}
      <Section 
        id="clinical"
        title="Universal Accuracy for Diverse Forces"
        coreMessage="Demonstrated AUROC of 0.905+ across all age groups and ethnicities. Crucial for the diverse demographic of USFK, USFJ, and INDOPACOM personnel."
        vizDescription="Ethnic Performance Diversity: Horizontal bar chart showing consistent high performance (>0.9 AUROC) for Caucasians, African Americans, Hispanics, and Asians. Proof of unbiased, equitable medical intelligence."
        audiencePoints={{
          clinician: "Peer-reviewed reliability based on large-scale datasets from world-leading institutions like UCLA.",
          management: "Mitigates AI Bias risks, ensuring high-quality care for all service members regardless of background.",
          remote: "Robust performance even in high-stress, comorbid veteran/active-duty populations."
        }}
      >
        <div className="h-64 w-full">
           <ResponsiveContainer width="100%" height="100%">
             <BarChart data={accuracyData} layout="vertical" margin={{ left: 20 }}>
               <XAxis type="number" domain={[0.85, 0.95]} hide />
               <YAxis dataKey="group" type="category" width={100} tick={{fontSize: 10, fontWeight: 'bold', fill: '#64748b'}} axisLine={false} tickLine={false} />
               <Tooltip />
               <Bar dataKey="score" fill="#10b981" radius={[0, 4, 4, 0]} barSize={16} />
             </BarChart>
           </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-600">
            <ShieldCheck className="w-3 h-3" /> Peer-Reviewed Gold Standard
          </div>
          <div>Clinical Benchmark: AUROC 0.9+</div>
        </div>
      </Section>

      {/* 5. Integration Simulation */}
      <Section 
        id="integration"
        title="Zero-Friction Tactical Deployment"
        coreMessage="No new hardware. Our AI integrates directly with your existing GE or Philips ECG units. Two lines on the report change the course of care."
        vizDescription="Integration Visualization: Shows a standard ECG printout with the added [AiTiA Score & Risk Assessment] at the bottom. Flow diagram depicts seamless data sync with MHS GENESIS / Cerner EMR systems."
        audiencePoints={{
          clinician: "Maintains existing workflows; AI insights appear naturally within the standard ECG interpretation interface.",
          management: "Cost-effective software-first integration maximizes the utility of currently fielded medical equipment.",
          remote: "Enables 'Tele-Cardiology' functionality in remote INDOPACOM hubs via automated expert flagging."
        }}
      >
        <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">ECG Analysis Terminal</span>
          </div>
          <div className="p-6">
            <div className="flex justify-between mb-6 text-[10px] font-bold text-slate-400">
              <div className="space-y-1">
                <div>UNIT: 121st Combat Support Hosp</div>
                <div>DEVICE: PHILIPS PAGEWRITER</div>
              </div>
              <div className="text-right space-y-1">
                <div>PATIENT: ALPHA-BRAVO-9</div>
                <div>DATE: 2025-05-12</div>
              </div>
            </div>
            <div className="h-24 w-full bg-slate-50 flex items-center justify-center rounded-lg border border-slate-100 mb-6">
               <Activity className="w-20 h-20 text-blue-100" strokeWidth={1} />
            </div>
            <div className="p-4 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-500/30">
               <div className="flex items-center gap-2 mb-1">
                 <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Medical AI Analysis Result</span>
               </div>
               <div className="text-lg font-black leading-none">AiTiA-LVSD: <span className="text-red-300 underline">High Risk (86.2)</span></div>
               <div className="text-[9px] mt-2 font-medium opacity-90 leading-tight">
                 Indication of LVEF &lt; 40% detected. Automated referral suggested for Cardiology Review (Role 3).
               </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-slate-900 py-16 px-4 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => scrollTo(e as any, 'intro')}>
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="text-white w-7 h-7" />
              </div>
              <span className="text-3xl font-black text-white tracking-tighter italic">MEDICAL AI</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed font-medium">
              Revolutionizing military health readiness through non-invasive, high-precision cardiac diagnostics. Supporting USFK, USFJ, and INDOPACOM missions globally.
            </p>
          </div>
          <div className="flex flex-col md:items-end justify-center gap-4">
            <div className="flex gap-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              <span>FDA Registered</span>
              <span>HIPAA Compliant</span>
              <span>MHS Genesis Ready</span>
            </div>
            <div className="text-slate-600 text-[10px] font-bold">
              © 2025 Medical AI. All Rights Reserved. For Government Use Only.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
