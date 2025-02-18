import React from "react";
import { Shield } from "lucide-react";

const RoadmapPath = () => (
  <svg
    className="absolute left-1/2 -translate-x-1/2 h-full w-[600px]"
    viewBox="0 0 200 800"
    preserveAspectRatio="none"
  >
    {/* Dotted curved path */}
    <path
      d="M100,0 C160,200 40,400 100,600 S160,800 100,800"
      fill="none"
      stroke="url(#gradient)"
      strokeWidth="2"
      strokeDasharray="4 4"
      className="path-animation"
    />

    {/* Gradient definition */}
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#60A5FA" />
      </linearGradient>
    </defs>

    {/* Small device icons */}
    <circle
      cx="100"
      cy="200"
      r="4"
      fill="#9333EA"
      className="blink-animation"
    />
    <circle
      cx="100"
      cy="400"
      r="4"
      fill="#9333EA"
      className="blink-animation delay-1"
    />
    <circle
      cx="100"
      cy="600"
      r="4"
      fill="#9333EA"
      className="blink-animation delay-2"
    />
  </svg>
);

interface RoadmapItemProps {
  number: string;
  title: string;
  description: string;
  isLeft: boolean;
  index: number;
}

const RoadmapItem: React.FC<RoadmapItemProps> = ({
  number,
  title,
  description,
  isLeft,
  index,
}) => {
  return (
    <div
      className={`flex w-full items-center ${
        isLeft ? "justify-start" : "justify-end"
      } relative group`}
    >
      <div className={`w-1/2 ${isLeft ? "pr-16" : "pl-16"}`}>
        <div
          className={`bg-gradient-to-r from-purple-600 to-blue-400 p-6 rounded-2xl 
          transform transition-all duration-500 hover:scale-105 hover:shadow-xl 
          ${isLeft ? "text-left" : "text-right"}`}
          style={{
            opacity: 0,
            animation: `fadeIn 0.5s ease-out ${index * 0.3}s forwards`,
          }}
        >
          <div
            className={`flex items-center gap-4 mb-3 ${
              !isLeft && "flex-row-reverse"
            }`}
          >
            <Shield className="w-8 h-8 text-white" />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          <p className="text-white/90">{description}</p>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
        <div
          className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center 
          font-bold text-xl transform transition-all duration-500 group-hover:scale-110 
          group-hover:bg-blue-500 shadow-lg"
          style={{
            opacity: 0,
            animation: `bounce 0.5s ease-out ${index * 0.3}s forwards`,
          }}
        >
          {number}
        </div>
      </div>
    </div>
  );
};

const RoadmapSection = () => {
  const roadmapItems = [
    {
      number: "01",
      title: "Phase 1: Infrastructure Development",
      description:
        "Deploying robust ERC-20 token contracts with advanced security features. Implementing cutting-edge Proof of Authority (PoA) and Proof of Identity (PoI) consensus mechanisms to ensure network integrity and trustless operations.",
    },
    {
      number: "02",
      title: "Phase 2: Quantum & AI Integration",
      description:
        "Launching the revolutionary Quantum AI Virtual Machine (QAIVM) to power next-generation blockchain operations. Integrating sophisticated lattice-based cryptography to establish quantum-resistant security protocols.",
    },
    {
      number: "03",
      title: "Phase 3: Ecosystem Expansion",
      description:
        "Developing seamless cross-chain bridges to enable interoperability across multiple blockchain networks. Launching specialized industry applications focused on revolutionizing energy sector, financial services, and supply chain management.",
    },
    {
      number: "04",
      title: "Phase 4: Future Innovation",
      description:
        "Continuing to push the boundaries of blockchain technology with ongoing research and development. Expanding our ecosystem through strategic partnerships and community-driven initiatives.",
    },
  ];

  return (
    <section className="bg-[#040347] min-h-screen text-white pt-24 pb-12 px-4 overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce {
          0% { opacity: 0; transform: scale(0); }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        .blink-animation {
          animation: blink 2s infinite;
        }
        
        .delay-1 {
          animation-delay: 0.5s;
        }
        
        .delay-2 {
          animation-delay: 1s;
        }
        
        .path-animation {
          stroke-dashoffset: 1000;
          animation: drawPath 3s ease-out forwards;
        }
        
        @keyframes drawPath {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      <h1 className="text-4xl font-bold text-center mb-20">Roadmap</h1>

      <div className="max-w-6xl mx-auto relative">
        <RoadmapPath />

        <div className="space-y-32 relative">
          {roadmapItems.map((item, index) => (
            <RoadmapItem
              key={item.number}
              {...item}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
