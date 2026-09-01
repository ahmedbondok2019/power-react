import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
  X
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
    <div className={`relative w-[240px] sm:w-[260px] h-[240px] sm:h-[260px] rounded-full bg-gradient-to-br from-[#1C3322] via-[#14261A] to-[#0D1A11] border-2 border-[#D4E128] shadow-[0_0_50px_rgba(212,225,40,0.35)] flex flex-col items-center justify-center text-center select-none cursor-move transition-all duration-300 ${
      selected ? 'ring-4 ring-[#D4E128] scale-105' : ''
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
const LeanPillNode = ({ data }) => {
  return (
    <div
      onClick={data.onSelect}
      className="relative px-6 py-4 rounded-3xl bg-[#F6F6F2] text-[#1C1D1B] shadow-2xl min-w-[210px] sm:min-w-[230px] cursor-pointer transition-all duration-300 text-left select-none border border-black/5 hover:scale-105 hover:ring-2 hover:ring-[#D4E128] hover:shadow-[0_0_25px_rgba(212,225,40,0.5)] opacity-95 hover:opacity-100"
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
  const [selectedModalNode, setSelectedModalNode] = useState(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Lock body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (selectedModalNode) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setSelectedModalNode(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedModalNode]);

  const nodeTypes = useMemo(
    () => ({
      leanCore: LeanCentralNode,
      leanPill: LeanPillNode
    }),
    []
  );

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
          onSelect: () => setSelectedModalNode(LEAN_PILLARS.people)
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
          onSelect: () => setSelectedModalNode(LEAN_PILLARS.process)
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
          onSelect: () => setSelectedModalNode(LEAN_PILLARS.technology)
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
          onSelect: () => setSelectedModalNode(LEAN_PILLARS.improvement)
        },
        draggable: true
      }
    ],
    []
  );

  // Dashed neon curved edges matching the diagram (hardware accelerated)
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
          strokeWidth: 2,
          strokeDasharray: '6, 6'
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
          strokeWidth: 2,
          strokeDasharray: '6, 6'
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
          strokeWidth: 2,
          strokeDasharray: '6, 6'
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
          strokeWidth: 2,
          strokeDasharray: '6, 6'
        }
      }
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event, node) => {
    if (node.id !== 'lean-core' && LEAN_PILLARS[node.id]) {
      setSelectedModalNode(LEAN_PILLARS[node.id]);
    }
  }, []);

  const handleResetView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.15, duration: 600 });
    }
  };

  return (
    <section 
      id="إدارة-رشيدة"
      className="relative w-full bg-[#111312] text-white py-24 sm:py-32 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
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
            panOnScroll={false}
            zoomOnScroll={false}
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

        {/* Bottom Tagline from Design */}
        <div className="mt-8 max-w-4xl mx-auto" dir="rtl">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-center text-xs sm:text-sm text-white/70 font-semibold tracking-wide">
            تقليل الهدر • تحسين التدفق • رفع كفاءة الموارد • دعم التنفيذ
          </div>
        </div>

      </div>

      {/* Interactive Popup Modal for Selected Pillar */}
      <AnimatePresence>
        {selectedModalNode && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none" 
            dir="rtl"
            data-lenis-prevent="true"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedModalNode(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-[#171A18] border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-white z-10 overflow-hidden"
            >
              {/* Floating Close Button */}
              <button
                onClick={() => setSelectedModalNode(null)}
                aria-label="Close"
                className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4E128] text-white hover:text-black transition-all flex items-center justify-center cursor-pointer shadow-lg hover:scale-105"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-white/10 bg-gradient-to-r from-[#1E2320] to-[#171A18] text-right">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#D4E128]/10 border border-[#D4E128]/30 flex items-center justify-center text-[#D4E128] shadow-inner shrink-0">
                    {React.createElement(selectedModalNode.icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#D4E128]">
                      {selectedModalNode.number} · {selectedModalNode.title}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {selectedModalNode.titleAr}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 text-right max-h-[60vh] overflow-y-auto custom-modal-scroll" data-lenis-prevent="true">
                
                {/* Summary */}
                <p className="text-sm sm:text-base text-white/85 leading-relaxed font-medium">
                  {selectedModalNode.desc}
                </p>

                {/* Key Deliverables / Execution Points */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#D4E128] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>أبرز محاور التطبيق الميداني:</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedModalNode.points.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/30 border border-white/5 text-xs sm:text-sm text-white/90 leading-relaxed"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#D4E128] shrink-0 mt-2" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-[#121413] border-t border-white/10 flex items-center justify-end">
                <button
                  onClick={() => setSelectedModalNode(null)}
                  className="px-6 py-2.5 rounded-full bg-[#D4E128] hover:bg-[#EAB308] text-black font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-md cursor-pointer hover:scale-105"
                >
                  إغلاق
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default LeanManagementSection;
