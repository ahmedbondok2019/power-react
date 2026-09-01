import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import SectionTitle from '../ui/SectionTitle';
import {
  Users,
  GitMerge,
  Cpu,
  RefreshCw,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Zap,
  Target
} from 'lucide-react';

const LEAN_PILLARS = {
  'people': {
    id: 'people',
    number: '01',
    title: 'PEOPLE',
    titleAr: 'فرق واضحة الأدوار',
    subtitle: 'تمكين الكفاءات البشرية',
    icon: Users,
    desc: 'منح مهندسي الموقع والكوادر الميدانية صلاحيات اتخاذ القرارات السريعة وتحديد المسؤوليات بمرونة عبر المشاريع المختلفة.',
    points: [
      'تفويض السلطة الميدانية لمهندسي التنفيذ لتسريع وتيرة العمل',
      'تحديد واضح للأدوار والمسؤوليات لمنع الازدواجية والتعطيل',
      'إمكانية انتقال الكفاءات التخصصية بين المشاريع حسب الأولويات'
    ]
  },
  'process': {
    id: 'process',
    number: '02',
    title: 'PROCESS',
    titleAr: 'تدفق عمل منظم',
    subtitle: 'إجراءات تشغيلية سلسة',
    icon: GitMerge,
    desc: 'هيكلة وتوثيق مسارات العمل لتقليل الإجراءات البيروقراطية وحلقات الموافقة المعقدة التي تعيق سرعة الإنجاز.',
    points: [
      'إلغاء خطوات الموافقة الزائدة عن الحد في العمليات البسيطة',
      'توحيد نماذج الفحص والاستلام وضمان سلاسة الانتقال بين المراحل',
      'مراقبة مسار العمل واكتشاف نقاط الاختناق ومعالجتها فورياً'
    ]
  },
  'technology': {
    id: 'technology',
    number: '03',
    title: 'TECHNOLOGY',
    titleAr: 'أدوات تدعم القرار',
    subtitle: 'أنظمة رقمية متقدمة',
    icon: Cpu,
    desc: 'توظيف برمجيات الإدارة السحابية والنمذجة الرقمية لتوفير بيانات دقيقة ولحظية تدعم اتخاذ القرارات السليمة.',
    points: [
      'منصات سحابية لمتابعة نسب الإنجاز والمستخلصات لحظياً',
      'تكامل أنظمة BIM لتفادي أي أخطاء تصميمية قبل التنفيذ',
      'تقارير تحليلية ومؤشرات أداء رقمية شفافة لكافة الأطراف'
    ]
  },
  'improvement': {
    id: 'improvement',
    number: '04',
    title: 'CONTINUOUS IMPROVEMENT',
    titleAr: 'تحسين مستمر للأداء',
    subtitle: 'منهجية كايزن (Kaizen)',
    icon: RefreshCw,
    desc: 'مراجعة وتقييم دوري للنتائج والدروس المستفادة لتحسين المعايير التشغيلية ورفع جودة المشاريع القادمة.',
    points: [
      'جلسات تقييم دورية بعد انتهاء كل مرحلة رئيسية (Lessons Learned)',
      'تحديث معايير الجودة ومؤشرات الأداء استناداً للخبرات الميدانية',
      'تحفيز الابتكار الميداني وتطبيق حلول تنفيذية أكثر كفاءة'
    ]
  }
};

// 1. Central Circular Lean Core Node
const LeanCentralNode = ({ data, selected }) => {
  return (
    <div className={`relative w-[240px] sm:w-[260px] h-[240px] sm:h-[260px] rounded-full bg-gradient-to-br from-[#1C3322] via-[#14261A] to-[#0D1A11] border-2 border-[#D4E128] shadow-[0_0_50px_rgba(212,225,40,0.35)] flex flex-col items-center justify-center text-center select-none cursor-move transition-all duration-300 ${selected ? 'ring-4 ring-[#D4E128] scale-105' : ''
      }`}>
      {/* Concentric inner rings */}
      <div className="absolute inset-3 rounded-full border border-[#D4E128]/25 pointer-events-none" />
      <div className="absolute inset-7 rounded-full border border-white/10 pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,225,40,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Connection Handles (4 cardinal & diagonal handles) */}
      <Handle type="source" position={Position.Top} id="top-left" style={{ left: '20%' }} className="!bg-[#D4E128] !w-2.5 !h-2.5 !border-0 opacity-0" />
      <Handle type="source" position={Position.Top} id="top-right" style={{ left: '80%' }} className="!bg-[#D4E128] !w-2.5 !h-2.5 !border-0 opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom-right" style={{ left: '80%' }} className="!bg-[#D4E128] !w-2.5 !h-2.5 !border-0 opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom-left" style={{ left: '20%' }} className="!bg-[#D4E128] !w-2.5 !h-2.5 !border-0 opacity-0" />

      {/* Content */}
      <div className="relative z-10 px-4 space-y-1">
        <h3 className="text-2xl sm:text-3xl font-black text-[#D4E128] tracking-wider font-sans drop-shadow-md">
          LEAN
        </h3>
        <p className="text-xs sm:text-sm font-bold tracking-widest text-white/95 uppercase font-sans">
          MANAGEMENT
        </p>
        <div className="pt-2 border-t border-[#D4E128]/30 mt-2">
          <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/70">
            PEOPLE · PROCESS · TECHNOLOGY
          </p>
        </div>
      </div>
    </div>
  );
};

// 2. Outer White/Cream Pill Node Component
const LeanPillNode = ({ data, selected }) => {
  const isSelected = selected || data.isActive;

  return (
    <div
      onClick={data.onSelect}
      className={`relative px-6 py-4 rounded-3xl bg-[#F6F6F2] text-[#1C1D1B] shadow-2xl min-w-[210px] sm:min-w-[230px] cursor-pointer transition-all duration-300 text-left select-none border border-black/5 ${isSelected
          ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_30px_rgba(212,225,40,0.5)]'
          : 'hover:scale-105 hover:shadow-xl opacity-95 hover:opacity-100'
        }`}
    >
      {/* Target Handle */}
      <Handle
        type="target"
        position={data.handlePosition || Position.Bottom}
        className="!bg-[#D4E128] !w-2.5 !h-2.5 !border-0 opacity-0"
      />

      <div className="space-y-1">
        <span className="text-xs font-mono font-black text-[#859900] block">
          {data.number}
        </span>
        <h4 className="text-sm sm:text-base font-black text-[#1C1D1B] tracking-wide font-sans leading-snug">
          {data.title}
        </h4>
        <p className="text-[11px] sm:text-xs text-[#525252] font-medium">
          {data.subtitle}
        </p>
      </div>
    </div>
  );
};

const LeanManagementSection = () => {
  const [activeNodeId, setActiveNodeId] = useState('people');
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const nodeTypes = useMemo(
    () => ({
      leanCore: LeanCentralNode,
      leanPill: LeanPillNode
    }),
    []
  );

  // Nodes position matching the layout in the image:
  // Node 01 (Top-Left): PEOPLE
  // Node 02 (Top-Right): PROCESS
  // Node 03 (Bottom-Right): TECHNOLOGY
  // Node 04 (Bottom-Left): CONTINUOUS IMPROVEMENT
  // Center: LEAN MANAGEMENT
  const initialNodes = useMemo(
    () => [
      // Central Circular Node
      {
        id: 'lean-core',
        type: 'leanCore',
        position: { x: 370, y: 170 },
        data: {},
        draggable: true
      },
      // 01: Top-Left (PEOPLE)
      {
        id: 'people',
        type: 'leanPill',
        position: { x: 60, y: 60 },
        data: {
          number: LEAN_PILLARS.people.number,
          title: LEAN_PILLARS.people.title,
          subtitle: LEAN_PILLARS.people.titleAr,
          handlePosition: Position.Right,
          isActive: activeNodeId === 'people',
          onSelect: () => setActiveNodeId('people')
        },
        draggable: true
      },
      // 02: Top-Right (PROCESS)
      {
        id: 'process',
        type: 'leanPill',
        position: { x: 710, y: 60 },
        data: {
          number: LEAN_PILLARS.process.number,
          title: LEAN_PILLARS.process.title,
          subtitle: LEAN_PILLARS.process.titleAr,
          handlePosition: Position.Left,
          isActive: activeNodeId === 'process',
          onSelect: () => setActiveNodeId('process')
        },
        draggable: true
      },
      // 03: Bottom-Right (TECHNOLOGY)
      {
        id: 'technology',
        type: 'leanPill',
        position: { x: 710, y: 380 },
        data: {
          number: LEAN_PILLARS.technology.number,
          title: LEAN_PILLARS.technology.title,
          subtitle: LEAN_PILLARS.technology.titleAr,
          handlePosition: Position.Left,
          isActive: activeNodeId === 'technology',
          onSelect: () => setActiveNodeId('technology')
        },
        draggable: true
      },
      // 04: Bottom-Left (CONTINUOUS IMPROVEMENT)
      {
        id: 'improvement',
        type: 'leanPill',
        position: { x: 60, y: 380 },
        data: {
          number: LEAN_PILLARS.improvement.number,
          title: LEAN_PILLARS.improvement.title,
          subtitle: LEAN_PILLARS.improvement.titleAr,
          handlePosition: Position.Right,
          isActive: activeNodeId === 'improvement',
          onSelect: () => setActiveNodeId('improvement')
        },
        draggable: true
      }
    ],
    [activeNodeId]
  );

  // Dashed neon curved edges matching the diagram
  const initialEdges = useMemo(
    () => [
      {
        id: 'e-people',
        source: 'lean-core',
        sourceHandle: 'top-left',
        target: 'people',
        type: 'default',
        animated: true,
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'people' ? 3.5 : 2,
          strokeDasharray: '6, 6',
          filter: activeNodeId === 'people' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-process',
        source: 'lean-core',
        sourceHandle: 'top-right',
        target: 'process',
        type: 'default',
        animated: true,
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'process' ? 3.5 : 2,
          strokeDasharray: '6, 6',
          filter: activeNodeId === 'process' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-tech',
        source: 'lean-core',
        sourceHandle: 'bottom-right',
        target: 'technology',
        type: 'default',
        animated: true,
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'technology' ? 3.5 : 2,
          strokeDasharray: '6, 6',
          filter: activeNodeId === 'technology' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-improve',
        source: 'lean-core',
        sourceHandle: 'bottom-left',
        target: 'improvement',
        type: 'default',
        animated: true,
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'improvement' ? 3.5 : 2,
          strokeDasharray: '6, 6',
          filter: activeNodeId === 'improvement' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      }
    ],
    [activeNodeId]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event, node) => {
    if (node.id !== 'lean-core' && LEAN_PILLARS[node.id]) {
      setActiveNodeId(node.id);
    }
  }, []);

  const handleResetView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.15, duration: 600 });
    }
  };

  const activePillar = LEAN_PILLARS[activeNodeId] || LEAN_PILLARS.people;

  return (
    <section
      id="إدارة-رشيدة"
      className="relative w-full bg-[#111312] text-white py-24 sm:py-32 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#D4E128]/5 rounded-full blur-[180px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#2A352F]/35 rounded-full blur-[180px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header & Description (Exact text from design) */}
        <div className="mb-14 sm:mb-20 text-right space-y-6 max-w-4xl">
          <SectionTitle title="إدارة رشيدة" theme="dark" />

          <div className="space-y-4 text-white/85 text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
            <p>
              تسمح الإدارة الرشيدة باتخاذ قرارات سريعة بناءً على الحقائق والقيود التي لا تتطلب عملية موافقة لكل تفصيل دقيق. توفر مساحة لمهندسي الموقع لاتخاذ قرارات بشأن الأمور البسيطة ضمن الحدود المحددة مسبقًا.
            </p>
            <p>
              هذا يضمن أن المشروع لا يتوقف عن التقدم بسبب العناصر البسيطة.
            </p>
            <p>
              كما تتيح الإدارة الرشيقة لنفس الشخص أن يكون له أدوار ومسؤوليات مختلفة في مشاريع مختلفة بناءً على الطلب.
            </p>
          </div>
        </div>

        {/* React Flow Interactive Flowchart Canvas */}
        <div
          data-lenis-prevent="true"
          className="relative w-full max-w-7xl mx-auto h-[580px] sm:h-[640px] rounded-3xl bg-[#141715]/90 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden"
          dir="ltr"
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            fitView
            fitViewOptions={{ padding: 0.15 }}
            minZoom={0.5}
            maxZoom={1.5}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            className="react-flow-custom"
          >
            <Background color="#D4E12815" gap={24} size={1.5} />
            <Controls
              showInteractive={false}
              className="!bg-[#1C201D] !border !border-white/20 !rounded-2xl !p-1 !shadow-2xl [&>button]:!bg-transparent [&>button]:!border-b [&>button]:!border-white/10 [&>button]:!fill-white [&>button:hover]:!bg-[#D4E128] [&>button:hover]:!fill-black"
            />
          </ReactFlow>

          {/* Top Canvas Controls Bar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2" dir="rtl">
            <button
              onClick={handleResetView}
              className="px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs text-white/90 hover:text-[#D4E128] hover:border-[#D4E128]/50 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط العرض</span>
            </button>
          </div>
        </div>

        {/* Bottom Tagline from Design & Detail Drawer */}
        <div className="mt-10 sm:mt-14 max-w-4xl mx-auto space-y-6" dir="rtl">

          {/* Active Pillar Detail Card */}
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#181B19] to-[#141615] border border-white/15 shadow-2xl text-right"
          >
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#D4E128]/10 border border-[#D4E128]/30 flex items-center justify-center text-[#D4E128] shadow-inner shrink-0">
                <activePillar.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#D4E128]">
                    {activePillar.number} · {activePillar.title}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {activePillar.titleAr}
                </h4>
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium mt-4">
              {activePillar.desc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              {activePillar.points.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#D4E128] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Tagline Bar matching the diagram */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center text-xs sm:text-sm text-white/70 font-semibold tracking-wide">
            تقليل الهدر • تحسين التدفق • رفع كفاءة الموارد • دعم التنفيذ
          </div>

        </div>

      </div>
    </section>
  );
};

export default LeanManagementSection;
