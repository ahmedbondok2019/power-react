import React from 'react';
import SectionTitle from '../ui/SectionTitle';

const TABLE_DATA = [
  { function: "GM", staff: "1", exp: "15", level: "EXCEPTIONAL" },
  { function: "CEO", staff: "1", exp: "12", level: "EXCEPTIONAL" },
  { function: "CFO (Quick-Wins)", staff: "1", exp: "45", level: "EXCEPTIONAL" },
  { function: "PMO (MAVEN)", staff: "4", exp: "75 (COMBINED)", level: "EXCEPTIONAL" },
  { function: "BDM", staff: "1", exp: "13", level: "EXCEPTIONAL" },
  { function: "PROJECTS MANAGERS", staff: "2", exp: "55 (COMBINED)", level: "HIGH" },
  { function: "PROJECT MANAGERS", staff: "4", exp: "32 (COMBINED)", level: "HIGH" },
  { function: "HSE MANAGER", staff: "1", exp: "7", level: "HIGH" },
  { function: "CHIEF ACCOUNTANT", staff: "1", exp: "10", level: "HIGH" },
  { function: "ACCOUNTANT", staff: "2", exp: "15 (COMBINED)", level: "STANDARD" },
  { function: "QC SITE ENGINEER", staff: "2", exp: "30 (COMBINED)", level: "STANDARD" },
  { function: "SR. SITE ENGINEER", staff: "4", exp: "22 (COMBINED)", level: "STANDARD" },
  { function: "SR. FOREMAN", staff: "8", exp: "76 (COMBINED)", level: "STANDARD" },
  { function: "SR. TECHNICIANS", staff: "+30", exp: "163 (COMBINED)", level: "HIGH" },
  { function: "WORKERS", staff: "(VARIABLE UP TO 1800)", exp: "+100 (VARIABLE)", level: "LOW" },
  { function: "DESIGN ENGINEERS", staff: "4", exp: "38 (COMBINED)", level: "HIGH/EXCEPTIONAL" },
  { function: "LOGISTICS", staff: "+10 (VARIABLE UP TO 100)", exp: "+45 (VARIABLE)", level: "STANDARD" },
];

const WorkforceTable = () => {
  return (
    <section className="relative w-full bg-[#141615] text-white py-24 select-none overflow-hidden" dir="ltr">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col h-full">

        {/* Header (Top Right - RTL applied just for the header) */}
        <div className="flex flex-col items-start text-right mb-16 w-full" dir="rtl">
          <SectionTitle title="القوى العاملة والخبرة" theme="dark" />
        </div>

        {/* Table Container */}
        <div className="w-full overflow-x-auto pb-6 hide-scrollbar">
          <div className=" max-w-9xl mx-auto">

            {/* The Bordered Box */}
            <div className="border border-white/20 rounded-[16px] p-1 sm:p-2 bg-[#1A1C1B]">
              <table className="w-full text-center border-collapse">

                {/* Table Header */}
                <thead>
                  <tr className="bg-white text-black font-black text-sm uppercase">
                    <th className="py-4 px-4 rounded-tl-[10px] rounded-bl-[10px] w-1/4">FUNCTION</th>
                    <th className="py-4 px-4 border-l border-gray-300 w-1/4">NUMBER OF STAFF</th>
                    <th className="py-4 px-4 border-l border-gray-300 w-1/4">YEARS OF EXPERIENCE</th>
                    <th className="py-4 px-4 border-l border-gray-300 rounded-tr-[10px] rounded-br-[10px] w-1/4">QUALIFICATION LEVEL</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="text-white/80 text-xs sm:text-sm font-medium">
                  {TABLE_DATA.map((row, index) => (
                    <tr
                      key={index}
                      className={`border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors duration-200`}
                    >
                      <td className="py-3 px-4 border-r border-white/10 uppercase">{row.function}</td>
                      <td className="py-3 px-4 border-r border-white/10">{row.staff}</td>
                      <td className="py-3 px-4 border-r border-white/10">{row.exp}</td>
                      <td className="py-3 px-4">{row.level}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Table Footer / Totals */}
            <div className="flex flex-row items-center text-white font-bold text-xs sm:text-sm uppercase mt-6 px-4">
              <div className="w-1/4 text-center tracking-wide">TOTAL</div>
              <div className="w-1/4 text-center tracking-wide">
                +76 <br />
                <span className="text-[10px] opacity-70">(UP TO 1500 UPON DEMAND)</span>
              </div>
              <div className="w-1/2 text-center tracking-wide">
                +750 YEARS OF COMPILED PROFESSIONAL EXPERIENCE
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkforceTable;
