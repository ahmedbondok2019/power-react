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
  Workflow,
  Coins,
  ShieldAlert,
  Clock,
  TrendingUp,
  Cpu,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  X,
  Layers,
  ArrowRight
} from 'lucide-react';

// Data for each of the strategic nodes
const STRATEGY_DATA = {
  'lean-management': {
    id: 'lean-management',
    number: '01',
    title: 'LEAN MANAGEMENT',
    titleAr: 'الإدارة الرشيقة والحد من الهدر',
    bgColor: '#FEF08A',
    textColor: '#1C1917',
    icon: Workflow,
    summary: 'إزالة الفاقد في الوقت والمواد والمجهود لرفع كفاءة وسرعة التنفيذ الميداني وضمان استمرارية الإنجاز.',
    details: [
      'تطبيق مبادئ 5S في تنظيم ومراقبة مواقع العمل الإنشائية',
      'تقليص فترات التوقف بين فرق الأعمال المختلفة',
      'تحسين كفاءة استخدام المعدات والآليات الثقيلة بنسبة 30%'
    ],
    kpi: '30% تقليص في الهدر'
  },
  'cash-flow': {
    id: 'cash-flow',
    number: '02',
    title: 'TWO-WAY CASH FLOW ANALYSIS',
    titleAr: 'تحليل التدفق النقدي ثنائي الاتجاه',
    bgColor: '#BAE6FD',
    textColor: '#0C4A6E',
    icon: Coins,
    summary: 'موازنة دقيقة بين الالتزامات والمستخلصات لضمان استقرار السيولة واستمرارية التوريد دون انقطاع.',
    details: [
      'توقع التدفقات النقدية الداخلة والخارجة بدقة أسبوعية',
      'إدارة دفعات الموردين والمصانع التابعة بشكل استباقي',
      'حماية وتأمين استمرارية سلاسل التوريد ضد أي تقلبات مالية'
    ],
    kpi: 'استقرار مالي 100%'
  },
  'safety-risk': {
    id: 'safety-risk',
    number: '03',
    title: 'SAFETY RISK ANALYSIS',
    titleAr: 'تحليل مخاطر السلامة المهنية',
    bgColor: '#FECDD3',
    textColor: '#881337',
    icon: ShieldAlert,
    summary: 'تقييم شامل واستباقي لمخاطر السلامة والبيئة المهنية لحماية الكوادر والأصول والمشاريع.',
    details: [
      'تطبيق أعلى معايير OSHA و OPITO و ISO 45001',
      'مصفوفة تقييم المخاطر اليومية قبل بدء الأعمال الحرجة',
      'سجل أمان يفوق 2 مليون ساعة عمل بدون حوادث مفقودة'
    ],
    kpi: 'صفر حوادث مهنية (Zero LTI)'
  },
  'lead-time': {
    id: 'lead-time',
    number: '04',
    title: 'LEAD TIME ANALYSIS & REDISTRIBUTION',
    titleAr: 'تحليل وإعادة توزيع فترات التوريد',
    bgColor: '#A7F3D0',
    textColor: '#064E3B',
    icon: Clock,
    summary: 'إدارة الجدول الزمني للمشتريات والتصنيع المباشر لتسليم المواد قبل موعد تركيبها الميداني.',
    details: [
      'برمجة أوامر التوريد للمعدات طويلة الأمد (Long Lead Items)',
      'تنسيق لوجستي فوري مع مصانعنا لتصنيع مجاري الهواء والموزعات',
      'تفادي أي تأخيرات ناجمة عن الشحن أو التخليص الجمركي'
    ],
    kpi: '40% تسريع في زمن التوريد'
  },
  'value-engineering': {
    id: 'value-engineering',
    number: '05',
    title: 'VALUE ENGINEERING',
    titleAr: 'الهندسة القيمة',
    bgColor: '#BBF7D0',
    textColor: '#14532D',
    icon: TrendingUp,
    summary: 'ابتكار حلول وبدائل هندسية ذكية ترفع الكفاءة التشغيلية وتخفض التكاليف الرأسمالية دون المساس بالجودة.',
    details: [
      'إعادة دراسة المخططات واقتراح بدائل مواد متكافئة وموثوقة',
      'تحسين مسارات شبكات التكييف والتغذية لتقليل أطوال الأنابيب',
      'خفض تكاليف التشغيل والصيانة (OPEX) للأصول المنفذة'
    ],
    kpi: '20% توفير في تكلفة الدورة التشغيلية'
  },
  'agile-resourcing': {
    id: 'agile-resourcing',
    number: '06',
    title: 'AGILE RESOURCING',
    titleAr: 'التخصيص المرن للموارد',
    bgColor: '#DDD6FE',
    textColor: '#4C1D95',
    icon: Cpu,
    summary: 'مرونة عالية في توجيه الكوادر الفنية والمعدات التخصصية بين مراحل ومواقع العمل وفق أولويات الإنجاز.',
    details: [
      'إعادة توجيه الفرق الميدانية بكفاءة عند وصول المعدات الرئيسية',
      'مرونة في زيادة ساعات العمل بنظام الورديات المتتابعة',
      'نظام مركزي لتتبع وتوزيع الآلات والمعدات بين مشاريع المملكة'
    ],
    kpi: 'استجابة ميدانية فائقة'
  }
};

// 1. Custom Central Node Component
const CentralCoreNode = ({ data, selected }) => {
  return (
    <div className={`relative w-[300px] h-[150px] rounded-3xl bg-[#1C3322] border-2 border-[#D4E128] shadow-[0_0_35px_rgba(212,225,40,0.3)] p-4 flex flex-col items-center justify-center text-center cursor-move transition-all duration-300 ${
      selected ? 'ring-4 ring-[#D4E128] scale-105' : ''
    }`}>
      {/* Visual Corner Brackets matching diagram */}
      <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#D4E128]" />
      <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#D4E128]" />

      {/* Handles for all 6 connection directions */}
      <Handle type="source" position={Position.Top} id="top" className="!bg-[#D4E128] !w-3 !h-3 !border-0 opacity-0" />
      <Handle type="source" position={Position.Right} id="right-top" style={{ top: '25%' }} className="!bg-[#D4E128] !w-3 !h-3 !border-0 opacity-0" />
      <Handle type="source" position={Position.Right} id="right-bottom" style={{ top: '75%' }} className="!bg-[#D4E128] !w-3 !h-3 !border-0 opacity-0" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!bg-[#D4E128] !w-3 !h-3 !border-0 opacity-0" />
      <Handle type="source" position={Position.Left} id="left-bottom" style={{ top: '75%' }} className="!bg-[#D4E128] !w-3 !h-3 !border-0 opacity-0" />
      <Handle type="source" position={Position.Left} id="left-top" style={{ top: '25%' }} className="!bg-[#D4E128] !w-3 !h-3 !border-0 opacity-0" />

      <span className="text-[11px] font-mono font-bold tracking-widest text-[#D4E128] uppercase mb-1 opacity-90">
        {data.badge || 'CORE APPROACH'}
      </span>
      <h3 className="text-base sm:text-lg font-black text-white leading-snug tracking-wide font-sans">
        SMART PROJECT <br />
        MANAGEMENT <br />
        STRATEGIES
      </h3>
    </div>
  );
};

// 2. Custom Outer Strategy Pill Node Component
const StrategyPillNode = ({ data, selected }) => {
  return (
    <div
      onClick={data.onSelect}
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
      className="relative px-6 py-3.5 rounded-2xl shadow-xl font-extrabold text-xs sm:text-sm font-sans tracking-wide text-center cursor-pointer transition-all duration-300 min-w-[170px] max-w-[220px] select-none hover:scale-105 hover:shadow-[0_0_25px_rgba(212,225,40,0.5)] opacity-95 hover:opacity-100 hover:ring-2 hover:ring-[#D4E128]"
    >
      {/* Target Handle connecting to center */}
      <Handle
        type="target"
        position={data.handlePosition || Position.Left}
        className="!bg-[#D4E128] !w-2.5 !h-2.5 !border-0 opacity-0"
      />
      
      <div className="leading-tight whitespace-pre-line">
        {data.label}
      </div>
    </div>
  );
};

const SmartStrategyFlowchart = () => {
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
      coreNode: CentralCoreNode,
      pillNode: StrategyPillNode
    }),
    []
  );

  // Initial Nodes Layout matching the diagram geometry
  const initialNodes = useMemo(
    () => [
      // Central Node
      {
        id: 'center-core',
        type: 'coreNode',
        position: { x: 330, y: 190 },
        data: { badge: 'CORE APPROACH' },
        draggable: true
      },
      // 1. Top (Lean Management)
      {
        id: 'lean-management',
        type: 'pillNode',
        position: { x: 385, y: 30 },
        data: {
          label: 'LEAN\nMANAGEMENT',
          bgColor: STRATEGY_DATA['lean-management'].bgColor,
          textColor: STRATEGY_DATA['lean-management'].textColor,
          handlePosition: Position.Bottom,
          onSelect: () => setSelectedModalNode(STRATEGY_DATA['lean-management'])
        },
        draggable: true
      },
      // 2. Top-Right (Two-Way Cash Flow Analysis)
      {
        id: 'cash-flow',
        type: 'pillNode',
        position: { x: 690, y: 60 },
        data: {
          label: 'TWO-WAY CASH\nFLOW ANALYSIS',
          bgColor: STRATEGY_DATA['cash-flow'].bgColor,
          textColor: STRATEGY_DATA['cash-flow'].textColor,
          handlePosition: Position.Left,
          onSelect: () => setSelectedModalNode(STRATEGY_DATA['cash-flow'])
        },
        draggable: true
      },
      // 3. Bottom-Right (Safety Risk Analysis)
      {
        id: 'safety-risk',
        type: 'pillNode',
        position: { x: 690, y: 350 },
        data: {
          label: 'SAFETY RISK\nANALYSIS',
          bgColor: STRATEGY_DATA['safety-risk'].bgColor,
          textColor: STRATEGY_DATA['safety-risk'].textColor,
          handlePosition: Position.Left,
          onSelect: () => setSelectedModalNode(STRATEGY_DATA['safety-risk'])
        },
        draggable: true
      },
      // 4. Bottom (Lead Time Analysis & Redistribution)
      {
        id: 'lead-time',
        type: 'pillNode',
        position: { x: 340, y: 430 },
        data: {
          label: 'LEAD TIME\nANALYSIS & REDISTRIBUTION',
          bgColor: STRATEGY_DATA['lead-time'].bgColor,
          textColor: STRATEGY_DATA['lead-time'].textColor,
          handlePosition: Position.Top,
          onSelect: () => setSelectedModalNode(STRATEGY_DATA['lead-time'])
        },
        draggable: true
      },
      // 5. Bottom-Left (Value Engineering)
      {
        id: 'value-engineering',
        type: 'pillNode',
        position: { x: 40, y: 350 },
        data: {
          label: 'VALUE\nENGINEERING',
          bgColor: STRATEGY_DATA['value-engineering'].bgColor,
          textColor: STRATEGY_DATA['value-engineering'].textColor,
          handlePosition: Position.Right,
          onSelect: () => setSelectedModalNode(STRATEGY_DATA['value-engineering'])
        },
        draggable: true
      },
      // 6. Top-Left (Agile Resourcing)
      {
        id: 'agile-resourcing',
        type: 'pillNode',
        position: { x: 60, y: 60 },
        data: {
          label: 'AGILE\nRESOURCING',
          bgColor: STRATEGY_DATA['agile-resourcing'].bgColor,
          textColor: STRATEGY_DATA['agile-resourcing'].textColor,
          handlePosition: Position.Right,
          onSelect: () => setSelectedModalNode(STRATEGY_DATA['agile-resourcing'])
        },
        draggable: true
      }
    ],
    []
  );

  // Initial Edges with clean neon green lines and smooth curves (hardware accelerated)
  const initialEdges = useMemo(
    () => [
      {
        id: 'e-lean',
        source: 'center-core',
        sourceHandle: 'top',
        target: 'lean-management',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#D4E128', strokeWidth: 2 }
      },
      {
        id: 'e-cash',
        source: 'center-core',
        sourceHandle: 'right-top',
        target: 'cash-flow',
        type: 'default',
        animated: true,
        style: { stroke: '#D4E128', strokeWidth: 2 }
      },
      {
        id: 'e-safety',
        source: 'center-core',
        sourceHandle: 'right-bottom',
        target: 'safety-risk',
        type: 'default',
        animated: true,
        style: { stroke: '#D4E128', strokeWidth: 2 }
      },
      {
        id: 'e-lead',
        source: 'center-core',
        sourceHandle: 'bottom',
        target: 'lead-time',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#D4E128', strokeWidth: 2 }
      },
      {
        id: 'e-value',
        source: 'center-core',
        sourceHandle: 'left-bottom',
        target: 'value-engineering',
        type: 'default',
        animated: true,
        style: { stroke: '#D4E128', strokeWidth: 2 }
      },
      {
        id: 'e-agile',
        source: 'center-core',
        sourceHandle: 'left-top',
        target: 'agile-resourcing',
        type: 'default',
        animated: true,
        style: { stroke: '#D4E128', strokeWidth: 2 }
      }
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Open popup modal on node click
  const onNodeClick = useCallback((event, node) => {
    if (node.id !== 'center-core' && STRATEGY_DATA[node.id]) {
      setSelectedModalNode(STRATEGY_DATA[node.id]);
    }
  }, []);

  const handleResetView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.15, duration: 600 });
    }
  };

  return (
    <section 
      id="النهج-الاستراتيجي"
      className="relative w-full bg-[#111312] text-white pt-56 sm:pt-64 pb-20 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* React Flow Interactive Canvas Container */}
        <div 
          data-lenis-prevent="true"
          className="relative w-full max-w-7xl mx-auto h-[560px] sm:h-[620px] rounded-3xl bg-[#141715]/90 border border-white/5 overflow-hidden"
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

      </div>

      {/* Interactive Popup Modal for Selected Node */}
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
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                    style={{ backgroundColor: selectedModalNode.bgColor, color: selectedModalNode.textColor }}
                  >
                    {React.createElement(selectedModalNode.icon, { className: 'w-7 h-7' })}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#D4E128]">
                        {selectedModalNode.title}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {selectedModalNode.titleAr}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6 text-right max-h-[60vh] overflow-y-auto custom-modal-scroll" data-lenis-prevent="true">
                
                {/* KPI Pill & Summary */}
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D4E128]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>مؤشر الأداء: {selectedModalNode.kpi}</span>
                  </div>
                  <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
                    {selectedModalNode.summary}
                  </p>
                </div>

                {/* Key Deliverables / Execution Points */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-[#D4E128] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>أبرز إجراءات التنفيذ والمخرجات:</span>
                  </h4>
                  <div className="space-y-2.5">
                    {selectedModalNode.details.map((item, idx) => (
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

export default SmartStrategyFlowchart;
