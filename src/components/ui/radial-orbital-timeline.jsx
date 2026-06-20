"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

export default function RadialOrbitalTimeline({
  timelineData,
}) {
  const [expandedItems, setExpandedItems] = useState({});
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pulseEffect, setPulseEffect] = useState({});
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(null);
  const containerRef = useRef(null);
  const orbitRef = useRef(null);
  const nodeRefs = useRef({});

  const handleContainerClick = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };



  const centerViewOnNode = (nodeId) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index, total) => {
    const angle = ((index / total) * 360 + (autoRotate ? 0 : rotationAngle)) % 360;
    const radius = window.innerWidth < 768 ? 130 : 280;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.5,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId) => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId) => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "completed":
      case "Advanced":
        return "text-[#00E5FF] bg-black/80 border-[#00E5FF]/50";
      case "in-progress":
      case "Intermediate":
        return "text-[#3B82F6] bg-black/80 border-[#3B82F6]/50";
      case "pending":
      case "Beginner":
        return "text-white/70 bg-black/40 border-white/30";
      default:
        return "text-white bg-black/40 border-white/50";
    }
  };

  return (
    <div
      className="w-full h-[36rem] md:h-[50rem] flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className={`absolute w-full h-full flex items-center justify-center ${autoRotate ? 'animate-orbit-spin' : ''}`}
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: autoRotate ? `translate(${centerOffset.x}px, ${centerOffset.y}px)` : `translate(${centerOffset.x}px, ${centerOffset.y}px) rotate(${rotationAngle}deg)`,
            transition: autoRotate ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {/* Central sun/core */}
          <div className={`absolute w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-500 animate-pulse flex items-center justify-center z-10 ${autoRotate ? 'animate-orbit-node-spin' : ''}`}>
            <div className="absolute w-24 h-24 rounded-full border border-cyan-400/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-28 h-28 rounded-full border border-blue-500/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-xs font-bold text-cyan-400 font-display">STK</div>
          </div>

          {/* Orbit rings */}
          <div className="absolute w-[260px] h-[260px] md:w-[560px] md:h-[560px] rounded-full border border-white/5 pointer-events-none"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => (nodeRefs.current[item.id] = el)}
                className="absolute transition-all duration-700 cursor-pointer pointer-events-auto"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className="orbit-node-content-wrapper relative w-full h-full"
                  style={{
                    transform: autoRotate ? undefined : `rotate(${-rotationAngle}deg)`,
                    transition: autoRotate ? 'none' : 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                >
                {/* Glow ring */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(0,229,255,0.15) 0%, rgba(0,229,255,0) 70%)`,
                    width: `${item.energy * 0.4 + 56}px`,
                    height: `${item.energy * 0.4 + 56}px`,
                    left: `-${(item.energy * 0.4 + 56 - 56) / 2}px`,
                    top: `-${(item.energy * 0.4 + 56 - 56) / 2}px`,
                  }}
                ></div>

                {/* The Node bubble/ball */}
                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-[#00E5FF] text-black"
                      : isRelated
                      ? "bg-blue-900/60 text-white"
                      : "bg-[#0a0f1e]/85 text-[#00E5FF]"
                  }
                  border-2 
                  ${
                    isExpanded
                      ? "border-[#00E5FF] shadow-lg shadow-[#00E5FF]/30 scale-125"
                      : isRelated
                      ? "border-blue-400 animate-pulse"
                      : "border-white/10 hover:border-[#00E5FF]/50"
                  }
                  transition-all duration-300 transform
                `}
                >
                  <Icon size={20} />
                </div>

                {/* Node Label */}
                <div
                  className={`
                  absolute top-15 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-[11px] md:text-sm font-semibold tracking-wider font-display
                  transition-all duration-300
                  ${isExpanded ? "text-[#00E5FF] scale-110" : "text-white/70"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-60 bg-black/90 backdrop-blur-xl border-white/20 shadow-2xl shadow-cyan-500/10 overflow-visible text-white z-50">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-[#00E5FF]/50"></div>
                    <CardHeader className="pb-2 p-4">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 py-0.5 text-[10px] tracking-wide rounded-full ${getStatusStyles(
                            item.date
                          )}`}
                        >
                          {item.date.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] font-mono text-white/50">
                          {item.category}
                        </span>
                      </div>
                      <CardTitle className="text-base mt-2 font-display font-bold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80 p-4 pt-0">
                      <div className="pt-2">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-white/60">
                            <Zap size={10} className="mr-1 text-cyan-400" />
                            Proficiency
                          </span>
                          <span className="font-mono text-cyan-400 font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1.5" />
                            <h4 className="text-[9px] uppercase tracking-wider font-semibold text-white/50">
                              Connected Skills
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              if (!relatedItem) return null;
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-5 px-2 py-0 text-[10px] rounded-full border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition-all font-sans"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-white/60"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
