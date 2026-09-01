import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const ORG_DATA = {
  gm: { title: "GENERAL MANAGER", name: "Mohammed Al Mulla" },
  ceo: { title: "CHIEF EXECUTIVE OFFICER", name: "Majd Al Mulla" },
  secretary: { title: "EXECUTIVE SECRETARY", name: "Zeina Alghamdi" },
  branches: [
    {
      header: { title: "BDM", name: "Ahmad Elkhatib" },
      items: [
        { title: "MARKETING MANAGER", name: "Meshal Alotaibi" },
        { title: "SALES MANAGER", name: "Majd Ghanem" },
        { title: "ESTIMATION TEAM" },
        { title: "PRE-DESIGN TEAM" },
        { title: "SALES ENGINEERS" }
      ]
    },
    {
      header: { title: "PMO" },
      items: [
        { title: "PROJECTS MANAGER", name: "Ehab Asous" },
        { title: "PROJECT MANAGERS" },
        { title: "PROJECT TEAMS", desc: "(Site Teams)", h: "min-h-[80px]" }
      ]
    },
    {
      header: { title: "HR MANAGER", name: "Rahaf Horoubi" },
      items: [
        { title: "HR ADMIN", name: "Reema Enezi" },
        { title: "GOV REP", name: "Ahmad Al Amry" },
        { title: "PROCUREMENT" }
      ]
    },
    {
      header: { title: "CFO" },
      items: [
        { title: "CHIEF ACCOUNTANT", name: "Ahmed Radwan" },
        { title: "ACCOUNTING TEAM" },
        { title: "WAREHOUSE & INVENTORY" }
      ]
    },
    {
      header: { title: "LEGAL ADVISOR", name: "Nada Alqahtani" },
      items: [
        { title: "LAWYER", name: "Marwan Noaman" }
      ]
    }
  ]
};

// Reusable Box Components
const BlackBox = ({ title, name, className = "" }) => (
  <div className={`bg-black text-white rounded-[8px] px-2 py-4 shadow-md w-[200px] flex flex-col items-center justify-center text-center z-10 relative ${className}`}>
    <h4 className="font-bold text-[13px] tracking-wide leading-tight mb-1">{title}</h4>
    {name && <p className="text-[#FFB800] text-[12px] font-medium">{name}</p>}
  </div>
);

const WhiteBox = ({ title, name, desc, className = "", h = "min-h-[60px]" }) => (
  <div className={`bg-white text-black border border-gray-300 rounded-[8px] px-2 py-3 shadow-sm w-[200px] flex flex-col items-center justify-center text-center z-10 relative ${h} ${className}`}>
    <h4 className="font-bold text-[12px] tracking-tight leading-tight">{title}</h4>
    {name && <p className="text-gray-500 text-[11px] font-medium mt-1">{name}</p>}
    {desc && <p className="text-gray-400 text-[11px] mt-1">{desc}</p>}
  </div>
);

const OrganizationChart = () => {
  return (
    <section className="relative w-full bg-[#F8F9FA] text-black py-24 select-none overflow-hidden" dir="ltr">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col h-full">

        {/* Header (Top Right - RTL applied just for the header) */}
        <div className="flex flex-col items-start text-right w-full" dir="rtl">
          <SectionTitle title="منظمتنا" theme="light" />
        </div>

        {/* Chart Container (Scrollable horizontally on small screens) */}
        <div className="w-full overflow-x-auto pb-10 hide-scrollbar">
          <div className="min-w-7xl flex flex-col items-center relative font-sans pt-10">

            {/* Level 1: GM */}
            <div className="relative flex flex-col items-center">
              <BlackBox title={ORG_DATA.gm.title} name={ORG_DATA.gm.name} className="w-[280px]" />
              {/* Line down to CEO */}
              <div className="w-px h-8 bg-black"></div>
            </div>

            {/* Level 2: CEO & Secretary */}
            <div className="relative flex flex-col items-center">
              <div className="relative">
                <BlackBox title={ORG_DATA.ceo.title} name={ORG_DATA.ceo.name} className="w-[280px]" />

                {/* Secretary Box (Attached to left of CEO) */}
                <div className="absolute top-1/2 right-[100%] -translate-y-1/2 flex items-center pr-8">
                  <div className="absolute right-0 top-1/2 w-8 border-t border-dashed border-gray-400 -z-10"></div>
                  <WhiteBox title={ORG_DATA.secretary.title} name={ORG_DATA.secretary.name} className="w-[180px]" />
                </div>
              </div>

              {/* Line down from CEO to Branches */}
              <div className="w-px h-8 bg-black"></div>
            </div>

            {/* Level 3: Branches */}
            <div className="relative w-full  mt-0">
              {/* Horizontal Line connecting all branches */}
              <div className="absolute top-0 left-[10%] right-[10%] h-[2px] bg-black"></div>

              <div className="flex flex-row justify-around w-full pt-6 relative">
                {ORG_DATA.branches.map((branch, idx) => (
                  <div key={idx} className="flex flex-col items-center relative w-[200px]">
                    {/* Vertical line up to horizontal bus */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-6 bg-black"></div>

                    {/* Header Box */}
                    <BlackBox title={branch.header.title} name={branch.header.name} />

                    {/* Sub Items */}
                    <div className="flex flex-col items-center mt-6 gap-6 relative">
                      {/* Continuous vertical line behind items */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[calc(100%-30px)] bg-black -z-0"></div>

                      {branch.items.map((item, i) => (
                        <WhiteBox
                          key={i}
                          title={item.title}
                          name={item.name}
                          desc={item.desc}
                          h={item.h}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Accessories (HSE & Project Operations) */}
            <div className="flex flex-row justify-between items-center w-full  mt-16">

              {/* Left: HSE */}
              <BlackBox
                title="HSE & SAFETY"
                name="Independent Function"
                className="w-[200px]"
              />

              {/* Center: Project & Site Operations */}
              <div className="bg-white border border-gray-300 rounded-[12px] p-4 flex flex-col items-center w-[600px] shadow-sm ml-auto mr-auto">
                <h4 className="font-bold text-[13px] mb-4 text-center">PROJECT & SITE OPERATIONS</h4>
                <div className="flex flex-row justify-between w-full px-8">
                  <span className="text-[11px] font-bold text-gray-700">PROJECT TEAMS</span>
                  <span className="text-[11px] font-bold text-gray-700">SITE OPERATIONS</span>
                  <span className="text-[11px] font-bold text-gray-700">TECHNICAL TEAMS</span>
                </div>
              </div>

              {/* Right: Legend */}
              <div className="flex flex-col gap-2 w-[200px]">
                <h4 className="font-bold text-[12px] mb-1">LEGEND</h4>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-black rounded-sm"></div>
                  <span className="text-[10px] text-gray-600 font-medium">Executive Leadership</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-[#FFB800] rounded-sm"></div>
                  <span className="text-[10px] text-gray-600 font-medium">Department Heads</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-white border border-gray-300 rounded-sm"></div>
                  <span className="text-[10px] text-gray-600 font-medium">Managers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-3 bg-gray-100 border border-gray-200 rounded-sm"></div>
                  <span className="text-[10px] text-gray-600 font-medium">Teams / Staff</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default OrganizationChart;
