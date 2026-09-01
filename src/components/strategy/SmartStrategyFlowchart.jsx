import React, { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion } from 'framer-motion';
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
  Maximize2,
  RotateCcw
} from 'lucide-react';

// Data for each of the strategic nodes
const STRATEGY_DATA = {
  'lean-management': {
    id: 'lean-management',
    title: 'LEAN MANAGEMENT',
    titleAr: 'الإدارة الرشيقة والحد من الهدر',
    bgColor: '#FEF08A',
    textColor: '#1C1917',
    icon: Workflow,
    summary: 'إزالة الفاقد في الوقت والمواد والمجهود لرفع كفاءة وسرعة التنفيذ الميداني.',
    details: [
      'تطبيق مبادئ 5S في تنظيم ومراقبة مواقع العمل الإنشائية',
      'تقليص فترات التوقف بين فرق الأعمال المختلفة',
      'تحسين كفاءة استخدام المعدات والآليات الثقيلة بنسبة 30%'
    ],
    kpi: '30% تقليص في الهدر'
  },
  'cash-flow': {
    id: 'cash-flow',
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
    <div className={`relative w-[300px] h-[150px] rounded-3xl bg-[#1C3322] border-2 border-[#D4E128] shadow-[0_0_35px_rgba(212,225,40,0.3)] p-4 flex flex-col items-center justify-center text-center cursor-move transition-all duration-300 ${selected ? 'ring-4 ring-[#D4E128] scale-105' : ''
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
  const isSelected = selected || data.isActive;

  return (
    <div
      onClick={data.onSelect}
      style={{ backgroundColor: data.bgColor, color: data.textColor }}
      className={`relative px-6 py-3.5 rounded-2xl shadow-xl font-extrabold text-xs sm:text-sm font-sans tracking-wide text-center cursor-pointer transition-all duration-300 min-w-[170px] max-w-[220px] select-none ${isSelected
        ? 'ring-4 ring-[#D4E128] scale-105 shadow-[0_0_25px_rgba(212,225,40,0.5)]'
        : 'hover:scale-105 opacity-95 hover:opacity-100'
        }`}
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
  const [activeNodeId, setActiveNodeId] = useState('lean-management');
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

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
          isActive: activeNodeId === 'lean-management',
          onSelect: () => setActiveNodeId('lean-management')
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
          isActive: activeNodeId === 'cash-flow',
          onSelect: () => setActiveNodeId('cash-flow')
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
          isActive: activeNodeId === 'safety-risk',
          onSelect: () => setActiveNodeId('safety-risk')
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
          isActive: activeNodeId === 'lead-time',
          onSelect: () => setActiveNodeId('lead-time')
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
          isActive: activeNodeId === 'value-engineering',
          onSelect: () => setActiveNodeId('value-engineering')
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
          isActive: activeNodeId === 'agile-resourcing',
          onSelect: () => setActiveNodeId('agile-resourcing')
        },
        draggable: true
      }
    ],
    [activeNodeId]
  );

  // Initial Edges with neon green lines and smooth curves
  const initialEdges = useMemo(
    () => [
      {
        id: 'e-lean',
        source: 'center-core',
        sourceHandle: 'top',
        target: 'lean-management',
        type: 'smoothstep',
        animated: activeNodeId === 'lean-management',
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'lean-management' ? 3.5 : 2.5,
          filter: activeNodeId === 'lean-management' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-cash',
        source: 'center-core',
        sourceHandle: 'right-top',
        target: 'cash-flow',
        type: 'default',
        animated: activeNodeId === 'cash-flow',
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'cash-flow' ? 3.5 : 2.5,
          filter: activeNodeId === 'cash-flow' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-safety',
        source: 'center-core',
        sourceHandle: 'right-bottom',
        target: 'safety-risk',
        type: 'default',
        animated: activeNodeId === 'safety-risk',
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'safety-risk' ? 3.5 : 2.5,
          filter: activeNodeId === 'safety-risk' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-lead',
        source: 'center-core',
        sourceHandle: 'bottom',
        target: 'lead-time',
        type: 'smoothstep',
        animated: activeNodeId === 'lead-time',
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'lead-time' ? 3.5 : 2.5,
          filter: activeNodeId === 'lead-time' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-value',
        source: 'center-core',
        sourceHandle: 'left-bottom',
        target: 'value-engineering',
        type: 'default',
        animated: activeNodeId === 'value-engineering',
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'value-engineering' ? 3.5 : 2.5,
          filter: activeNodeId === 'value-engineering' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      },
      {
        id: 'e-agile',
        source: 'center-core',
        sourceHandle: 'left-top',
        target: 'agile-resourcing',
        type: 'default',
        animated: activeNodeId === 'agile-resourcing',
        style: {
          stroke: '#D4E128',
          strokeWidth: activeNodeId === 'agile-resourcing' ? 3.5 : 2.5,
          filter: activeNodeId === 'agile-resourcing' ? 'drop-shadow(0 0 8px rgba(212,225,40,0.8))' : 'none'
        }
      }
    ],
    [activeNodeId]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync active state when nodes or activeNodeId change
  const onNodeClick = useCallback((event, node) => {
    if (node.id !== 'center-core' && STRATEGY_DATA[node.id]) {
      setActiveNodeId(node.id);
    }
  }, []);

  const handleResetView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2, duration: 600 });
    }
  };

  const activeNodeData = STRATEGY_DATA[activeNodeId] || STRATEGY_DATA['lean-management'];

  return (
    <section
      id="النهج-الاستراتيجي"
      className="relative w-full bg-[#111312] text-white pt-56 sm:pt-64 pb-24 sm:pb-32 overflow-hidden select-none border-b border-white/5"
      dir="rtl"
    >

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* React Flow Interactive Canvas Container */}
        <div
          data-lenis-prevent="true"
          className="relative w-full max-w-7xl mx-auto h-[560px] sm:h-[620px] rounded-3xl bg-[#141715]/90 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden"
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

        {/* Interactive Active Pillar Detail Card (Updates on click) */}
        <motion.div
          key={activeNodeData.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-10 sm:mt-14 max-w-4xl mx-auto rounded-3xl bg-gradient-to-r from-[#181B19] to-[#141615] border border-white/15 p-6 sm:p-8 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="flex items-center gap-4 text-right">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner shrink-0"
                style={{ backgroundColor: activeNodeData.bgColor, color: activeNodeData.textColor }}
              >
                <activeNodeData.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-[#D4E128]">
                  {activeNodeData.title}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  {activeNodeData.titleAr}
                </h4>
              </div>
            </div>

            <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#D4E128] shrink-0">
              {activeNodeData.kpi}
            </div>
          </div>

          <div className="mt-5 space-y-4 text-right">
            <p className="text-sm sm:text-base text-white/80 leading-relaxed font-medium">
              {activeNodeData.summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {activeNodeData.details.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/30 border border-white/5 text-xs text-white/90">
                  <CheckCircle2 className="w-4 h-4 text-[#D4E128] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SmartStrategyFlowchart;
