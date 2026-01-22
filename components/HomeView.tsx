import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ViewState, Subnet } from '../types';

interface HomeViewProps {
  onViewChange: (view: ViewState) => void;
  onSelectTransaction?: (hash: string) => void;
  onSelectAccount?: (id: string) => void;
  onSelectBlock?: (height: string) => void;
}

// Improved Utility Component for Smooth Number Animation (No Jumping)
const CountUp: React.FC<{ end: number, duration?: number, prefix?: string, suffix?: string, decimals?: number }> = ({ end, duration = 1500, prefix = '', suffix = '', decimals = 0 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const valRef = useRef(0); // Tracks current value across renders

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrame: number;
        const startVal = valRef.current; // Start from current displayed value
        const change = end - startVal;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);
            
            // Cubic ease out for smooth "landing"
            const ease = 1 - Math.pow(1 - percentage, 3);
            
            const current = startVal + (change * ease);
            valRef.current = current;
            setDisplayValue(current);

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Ensure we land exactly on end value
                valRef.current = end;
                setDisplayValue(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return (
        <>{prefix}{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>
    );
};

const initialChartData = [
  { time: '00:00', value: 380 },
  { time: '04:00', value: 410 },
  { time: '08:00', value: 395 },
  { time: '12:00', value: 423.5 },
  { time: '16:00', value: 418 },
  { time: '20:00', value: 435 },
  { time: '24:00', value: 428 },
];

const subnetsData: Subnet[] = [
  { rank: 1, name: 'Text Prompting', netUid: 1, emission: 18.42, miners: 1024, staked: '1.2M', daily: '+$24,500', status: 'active' },
  { rank: 2, name: 'Machine Translation', netUid: 2, emission: 12.15, miners: 892, staked: '840K', daily: '+$18,200', status: 'active' },
  { rank: 3, name: 'Data Scraping', netUid: 3, emission: 9.80, miners: 2100, staked: '620K', daily: '+$12,400', status: 'active' },
  { rank: 4, name: 'Image Generation', netUid: 4, emission: 8.45, miners: 512, staked: '580K', daily: '+$10,100', status: 'warning' },
  { rank: 5, name: 'Audio Synthesis', netUid: 5, emission: 6.20, miners: 340, staked: '410K', daily: '+$8,300', status: 'active' },
];

const liveBlocks = [
  { id: '#45091', time: '2s ago', miner: '5D4a...9fK', reward: '1.00' },
  { id: '#45090', time: '14s ago', miner: '5H2b...1cL', reward: '1.00' },
  { id: '#45089', time: '26s ago', miner: '5J8d...4eM', reward: '0.98' },
  { id: '#45088', time: '38s ago', miner: '5K1a...7bP', reward: '1.00' },
  { id: '#45087', time: '45s ago', miner: '5L9c...3fQ', reward: '1.00' },
];

const recentTransactions = [
  { hash: '0x9a8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f01', time: '10 secs ago', from: '5Gj8...9kL', to: '5Hm2...1pQ', value: '142.50' },
  { hash: '0x2b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c', time: '15 secs ago', from: '5Kp9...3mN', to: 'Subnet 4 Pool', toClass: 'text-slate-400 italic', value: '0.05' },
  { hash: '0x1d7e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e', time: '22 secs ago', from: '5Xr1...7tY', to: '5Ab2...8cZ', value: '1,200.00' },
  { hash: '0x5g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l', time: '35 secs ago', from: '5Lm3...2kP', to: '5Qn6...4rS', value: '45.00' },
  { hash: '0x3f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a', time: '42 secs ago', from: '5Pt4...9uV', to: '5Wy2...3xR', value: '890.15' },
];

// 3D Canvas Particle Sphere
const NeuralMetagraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Initial scaling for retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 3D Point class
    class Point {
      x: number;
      y: number;
      z: number;
      originX: number;
      originY: number;
      originZ: number;
      size: number;
      color: string;

      constructor() {
        // Random point on sphere
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 100;

        this.x = radius * Math.sin(phi) * Math.cos(theta);
        this.y = radius * Math.sin(phi) * Math.sin(theta);
        this.z = radius * Math.cos(phi);
        
        this.originX = this.x;
        this.originY = this.y;
        this.originZ = this.z;
        this.size = Math.random() * 2 + 1;
        this.color = Math.random() > 0.8 ? '#bc13fe' : '#00f3ff';
      }

      rotate(angleX: number, angleY: number) {
        // Rotate around Y
        let dy = this.y * Math.cos(angleX) - this.z * Math.sin(angleX);
        let dz = this.y * Math.sin(angleX) + this.z * Math.cos(angleX);
        this.y = dy;
        this.z = dz;

        // Rotate around X
        let dx = this.x * Math.cos(angleY) - this.z * Math.sin(angleY);
        dz = this.x * Math.sin(angleY) + this.z * Math.cos(angleY);
        this.x = dx;
        this.z = dz;
      }

      draw() {
        if (!ctx) return;
        // Perspective projection
        const fov = 250;
        const scale = fov / (fov + this.z);
        const x2d = (this.x * scale) + (width / 2 / dpr);
        const y2d = (this.y * scale) + (height / 2 / dpr);

        if (scale > 0) { // Don't draw points behind camera
            ctx.fillStyle = this.color;
            ctx.globalAlpha = Math.max(0.1, scale - 0.2); // Fade out back points
            ctx.beginPath();
            ctx.arc(x2d, y2d, this.size * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // Return projected coords for lines
            return { x: x2d, y: y2d, scale };
        }
        return null;
      }
    }

    // Initialize points
    const points: Point[] = [];
    for (let i = 0; i < 60; i++) {
        points.push(new Point());
    }

    let rotationSpeedX = 0.002;
    let rotationSpeedY = 0.003;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - width / 2) * 0.0001;
        mouseY = (e.clientY - rect.top - height / 2) * 0.0001;
    };

    container.addEventListener('mousemove', handleMouseMove);

    const render = () => {
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, width, height);
        
        // Update rotation based on mouse or auto
        rotationSpeedX = mouseX !== 0 ? mouseY : 0.002;
        rotationSpeedY = mouseY !== 0 ? mouseX : 0.003;

        // Draw connections
        const projectedPoints: {x: number, y: number, scale: number}[] = [];

        points.forEach(p => {
            p.rotate(rotationSpeedX, rotationSpeedY);
            const proj = p.draw();
            if (proj) projectedPoints.push(proj);
        });

        // Draw Lines
        ctx.strokeStyle = '#00f3ff';
        projectedPoints.forEach((p1, i) => {
            for (let j = i + 1; j < projectedPoints.length; j++) {
                const p2 = projectedPoints[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if (dist < 40) {
                    ctx.beginPath();
                    ctx.lineWidth = 0.5 * Math.min(p1.scale, p2.scale);
                    ctx.globalAlpha = (1 - dist / 40) * 0.3 * Math.min(p1.scale, p2.scale);
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });

        animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
        if(container && canvas) {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }
    };

    window.addEventListener('resize', handleResize);

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-black relative flex items-center justify-center overflow-hidden group cursor-crosshair">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.05)_0%,_transparent_60%)]"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#1f293a 1px, transparent 1px), linear-gradient(90deg, #1f293a 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Canvas Layer */}
      <canvas ref={canvasRef} className="relative z-10 w-full h-full block" style={{ width: '100%', height: '100%' }} />
      
      {/* Scanner Effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/30 shadow-[0_0_15px_#00f3ff] animate-[scan_4s_ease-in-out_infinite] pointer-events-none opacity-50"></div>

      {/* Floating HUD Labels */}
      <div className="absolute top-4 left-4 text-xs text-neon-cyan font-mono border-l-2 border-neon-cyan/50 pl-2 bg-black/40 backdrop-blur py-1 pr-2 shadow-lg">
          <p className="text-[10px] text-text-secondary uppercase mb-0.5">Active Nodes</p>
          <p className="font-bold text-sm"><CountUp end={4096} /></p>
      </div>
      <div className="absolute bottom-4 right-4 text-xs text-neon-purple font-mono border-r-2 border-neon-purple/50 pr-2 bg-black/40 backdrop-blur py-1 pl-2 text-right shadow-lg">
          <p className="text-[10px] text-text-secondary uppercase mb-0.5">Throughput</p>
          <p className="font-bold text-sm"><CountUp end={12402} suffix=" TPS" /></p>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20"></div>
      
      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 0.5; }
            90% { opacity: 0.5; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

const TickerContent = ({ currentPrice }: { currentPrice: number }) => (
    <div className="flex items-center gap-12 whitespace-nowrap px-6">
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">MTN Price</span>
            <span className="text-neon-cyan font-bold neon-text text-base">
                $<CountUp end={currentPrice} decimals={2} />
            </span>
            <span className="text-neon-green flex items-center gap-0.5 font-bold">
                <span className="material-symbols-outlined text-sm">arrow_drop_up</span>4.2%
            </span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">Market Cap</span>
            <span className="text-white font-bold text-base">$<CountUp end={2.42} suffix="B" decimals={2} /></span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">24h Vol</span>
            <span className="text-white font-bold text-base">$<CountUp end={145.2} suffix="M" decimals={1} /></span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">Total Staked</span>
            <span className="text-white font-bold text-base"><CountUp end={4.1} suffix="M" decimals={1} /> (72%)</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">Next Halving</span>
            <span className="text-white font-bold text-base">142 Days</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">Epoch</span>
            <span className="text-neon-purple font-bold text-base">#891</span>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-text-secondary">Gas</span>
            <span className="text-white font-bold text-base">12 Gwei</span>
        </div>
    </div>
);

const HomeView: React.FC<HomeViewProps> = ({ onViewChange, onSelectTransaction, onSelectAccount, onSelectBlock }) => {
  const [chartData, setChartData] = useState(initialChartData);

  // Real-time chart update simulation
  useEffect(() => {
      const interval = setInterval(() => {
          setChartData(prevData => {
              // Deep clone the array and the object we intend to modify to avoid mutating read-only state
              const newData = prevData.map(item => ({ ...item })); 
              const lastIndex = newData.length - 1;
              const lastItem = newData[lastIndex];
              
              // Reduced volatility for more realistic movement
              const volatility = (Math.random() - 0.5) * 0.8; 
              const newValue = Math.max(350, lastItem.value + volatility);
              
              lastItem.value = newValue;
              
              return newData;
          });
      }, 3000); // Slower updates (3s) for stability
      return () => clearInterval(interval);
  }, []);

  const currentPrice = chartData[chartData.length - 1].value;

  return (
    <div className="flex flex-col gap-8 py-8 px-6 lg:px-8">
      {/* Top Ticker - Infinite Marquee */}
      <div className="w-full border-b border-panel-border bg-panel-dark/50 backdrop-blur overflow-hidden mb-4 relative flex h-12 items-center">
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-bg-dark to-transparent z-10"></div>
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-bg-dark to-transparent z-10"></div>
        <div className="flex animate-marquee text-sm font-mono hover:[animation-play-state:paused] cursor-default">
            <TickerContent currentPrice={currentPrice} />
            <TickerContent currentPrice={currentPrice} />
            <TickerContent currentPrice={currentPrice} />
            <TickerContent currentPrice={currentPrice} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 xl:h-[500px]">
        {/* Main Chart */}
        <div className="xl:col-span-8 glass-panel rounded-xl flex flex-col relative overflow-hidden">
           <div className="flex justify-between items-start p-6 z-20 bg-gradient-to-b from-panel-dark/80 to-transparent">
             <div>
               <h2 className="text-neon-cyan text-base font-bold flex items-center gap-2 font-display uppercase tracking-widest drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">
                 <span className="material-symbols-outlined text-xl animate-pulse">monitoring</span>
                 MTN/USDT Neural Market
               </h2>
               <div className="mt-2 flex items-baseline gap-3">
                 <span className="text-6xl font-display font-bold text-white tracking-tighter">
                    <CountUp end={currentPrice} prefix="$" decimals={2} />
                 </span>
                 <span className="text-neon-green font-mono text-base bg-neon-green/10 px-3 py-1 rounded border border-neon-green/30 shadow-[0_0_10px_rgba(0,255,163,0.2)]">+4.2%</span>
               </div>
             </div>
             <div className="flex gap-2 bg-black/40 backdrop-blur rounded-lg p-1.5 border border-white/10">
               {['1H', '4H', '1D', '1W'].map((tf, i) => (
                 <button key={tf} className={`px-4 py-1.5 text-xs rounded transition-all font-bold ${i === 0 ? 'text-neon-cyan bg-neon-cyan/20 border border-neon-cyan/40 shadow-[0_0_8px_rgba(0,243,255,0.3)]' : 'text-text-secondary hover:text-white'}`}>
                   {tf}
                 </button>
               ))}
             </div>
           </div>
           
           {/* Chart - Fixed height for stability */}
           <div className="w-full h-[300px] xl:h-[380px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0a0e17', border: '1px solid #1f293a', fontSize: '14px' }} 
                    itemStyle={{ color: '#00f3ff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#00f3ff" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" isAnimationActive={false} />
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Side Stats */}
        <div className="xl:col-span-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-4">
          <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col justify-center relative overflow-hidden group shadow-lg hover:shadow-[0_0_15px_rgba(0,243,255,0.2)] transition-all">
            <div className="absolute right-0 top-0 w-32 h-32 bg-neon-cyan/10 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-neon-cyan/20 transition-colors"></div>
            <div className="flex items-center gap-2 mb-3 z-10">
              <span className="material-symbols-outlined text-neon-cyan text-xl">token</span>
              <p className="text-neon-cyan text-sm font-semibold uppercase tracking-widest">Circulating Supply</p>
            </div>
            <p className="text-white text-4xl font-display font-bold z-10">
                <CountUp end={5842091} />
                <span className="text-xl text-text-secondary ml-2">MTN</span>
            </p>
            <div className="w-full bg-panel-border h-2 mt-5 rounded-full overflow-hidden z-10">
              <div className="bg-gradient-to-r from-neon-cyan to-blue-600 h-full w-[28%] shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
            </div>
          </div>

          <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col justify-center relative overflow-hidden group shadow-lg hover:shadow-[0_0_15px_rgba(255,0,255,0.2)] transition-all">
            <div className="absolute right-0 top-0 w-32 h-32 bg-neon-pink/10 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-neon-pink/20 transition-colors"></div>
            <div className="flex items-center gap-2 mb-3 z-10">
              <span className="material-symbols-outlined text-neon-pink text-xl">local_fire_department</span>
              <p className="text-neon-pink text-sm font-semibold uppercase tracking-widest">Burned MTN</p>
            </div>
            <p className="text-white text-4xl font-display font-bold z-10">
                <CountUp end={142884} />
                <span className="text-xl text-text-secondary ml-2">MTN</span>
            </p>
            <p className="text-neon-pink text-sm mt-2 font-mono flex items-center gap-1 z-10">
              <span className="material-symbols-outlined text-base">trending_up</span> +124.5 today
            </p>
          </div>

          <div className="bg-panel-dark border border-panel-border p-6 rounded-xl flex flex-col justify-center relative overflow-hidden group shadow-lg hover:shadow-[0_0_15px_rgba(0,255,163,0.2)] transition-all">
             <div className="absolute right-0 top-0 w-32 h-32 bg-neon-green/10 -mr-8 -mt-8 rounded-full blur-2xl group-hover:bg-neon-green/20 transition-colors"></div>
             <div className="flex items-center gap-2 mb-3 z-10">
               <span className="material-symbols-outlined text-neon-green text-xl">speed</span>
               <p className="text-neon-green text-sm font-semibold uppercase tracking-widest">Network Difficulty</p>
             </div>
             <p className="text-white text-4xl font-display font-bold z-10">
                <CountUp end={284.5} decimals={1} />
                <span className="text-xl text-text-secondary ml-2">PH/s</span>
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Subnet Table */}
        <div className="xl:col-span-8 bg-panel-dark border border-panel-border rounded-xl overflow-hidden flex flex-col relative">
          <div className="p-6 border-b border-panel-border flex justify-between items-center bg-panel-dark/50 z-10">
            <h3 className="text-white text-base font-bold flex items-center gap-2 font-display uppercase tracking-widest">
              <span className="material-symbols-outlined text-neon-cyan text-xl">hub</span>
              Subnet Performance
            </h3>
            <div className="flex gap-2">
              <input type="text" placeholder="Filter subnets..." className="bg-black/40 border border-panel-border rounded text-sm px-4 py-2 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan w-56 transition-all"/>
              <button className="text-text-secondary hover:text-white px-2 py-1"><span className="material-symbols-outlined text-xl">filter_list</span></button>
            </div>
          </div>
          <div className="overflow-x-auto z-10 relative">
            <table className="w-full text-left text-base">
              <thead className="bg-panel-dark/80 border-b border-panel-border text-xs uppercase tracking-wider text-text-secondary font-semibold">
                <tr>
                  <th className="px-6 py-5">Rank</th>
                  <th className="px-6 py-5">Subnet Name</th>
                  <th className="px-6 py-5 text-right">Emission %</th>
                  <th className="px-6 py-5 text-right">Active Miners</th>
                  <th className="px-6 py-5 text-right">Staked MTN</th>
                  <th className="px-6 py-5 text-right">Daily Rewards</th>
                  <th className="px-6 py-5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-panel-border text-sm">
                {subnetsData.map((subnet) => (
                  <tr 
                    key={subnet.netUid} 
                    className="group hover:bg-neon-cyan/5 transition-colors cursor-pointer"
                    onClick={() => {
                      if (subnet.netUid === 1) onViewChange(ViewState.SUBNETS);
                    }}
                  >
                    <td className="px-6 py-5 font-mono text-text-secondary group-hover:text-neon-cyan font-bold">{String(subnet.rank).padStart(2, '0')}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`size-8 rounded border flex items-center justify-center text-xs font-bold ${subnet.netUid === 1 ? 'bg-neon-cyan/20 border-neon-cyan/50 text-neon-cyan' : 'bg-slate-800 border-slate-700 text-slate-400'}`}>
                          {subnet.netUid}
                        </div>
                        <div>
                          <p className="text-white font-bold text-base group-hover:text-neon-cyan transition-colors">{subnet.name}</p>
                          <p className="text-slate-500 text-xs">NetUID: {subnet.netUid}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right text-white font-mono text-base">{subnet.emission}%</td>
                    <td className="px-6 py-5 text-right text-text-secondary font-mono text-base">{subnet.miners.toLocaleString()}</td>
                    <td className="px-6 py-5 text-right text-white font-mono font-bold text-base">{subnet.staked}</td>
                    <td className="px-6 py-5 text-right text-neon-green font-mono text-base">{subnet.daily}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block size-2.5 rounded-full shadow-[0_0_8px] ${subnet.status === 'active' ? 'bg-neon-green shadow-neon-green' : 'bg-yellow-500 shadow-yellow-500'}`}></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Metagraph & Live Blocks */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <div className="glass-panel rounded-xl relative overflow-hidden flex flex-col h-[300px] shadow-[0_0_20px_rgba(0,243,255,0.1)]">
             <div className="absolute top-0 left-0 w-full p-6 z-10 pointer-events-none">
               <h2 className="text-white text-sm font-bold flex items-center gap-2 font-display uppercase tracking-widest drop-shadow-[0_0_3px_rgba(0,0,0,1)]">
                 <span className="material-symbols-outlined text-neon-cyan text-base">public</span>
                 Global Metagraph
               </h2>
             </div>
             {/* Insert New Visual Component */}
             <NeuralMetagraph />
          </div>

          <div className="bg-panel-dark border border-panel-border rounded-xl flex flex-col flex-1 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-panel-border flex justify-between items-center bg-panel-dark">
              <h3 className="text-white text-sm font-bold flex items-center gap-2 font-display uppercase tracking-widest">
                <span className="material-symbols-outlined text-neon-cyan text-base animate-spin">sync</span>
                Live Blocks
              </h3>
              <div className="flex items-center gap-2">
                <span className="size-2.5 bg-neon-green rounded-full animate-pulse shadow-[0_0_8px_#00ffa3]"></span>
                <span className="text-xs text-text-secondary font-bold">Connected</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-0">
               <table className="w-full text-sm">
                 <tbody className="divide-y divide-panel-border">
                   {liveBlocks.map((block) => (
                     <tr key={block.id} className="hover:bg-neon-cyan/5 transition-colors cursor-pointer group" onClick={() => onSelectBlock && onSelectBlock(block.id)}>
                       <td className="p-4 text-neon-cyan font-mono font-bold group-hover:drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">{block.id}</td>
                       <td className="p-4 text-text-secondary text-right">{block.time}</td>
                       <td className="p-4 text-white font-mono text-right">{block.miner}</td>
                       <td className="p-4 text-neon-green font-bold text-right">{block.reward}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="text-white font-bold text-xl uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-neon-pink text-2xl">swap_horiz</span> Latest Transactions
          </h3>
          <button 
            onClick={() => onViewChange(ViewState.ALL_TRANSACTIONS)}
            className="text-sm font-bold text-neon-pink hover:text-white uppercase tracking-widest transition-colors border border-neon-pink/30 px-4 py-2 rounded hover:bg-neon-pink/10"
          >
            View All
          </button>
        </div>
        <div className="glass-panel rounded-lg overflow-hidden border border-white/5 flex flex-col">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-sm uppercase tracking-widest text-slate-400 font-bold">
                  <th className="px-6 py-5">Tx Hash</th>
                  <th className="px-6 py-5">From / To</th>
                  <th className="px-6 py-5 text-right">Value (M)</th>
                </tr>
              </thead>
              <tbody className="text-base divide-y divide-white/5 font-mono">
                {recentTransactions.map((tx, i) => (
                  <tr key={i} className="group table-row-glow transition-all duration-300 hover:bg-white/[0.02]">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-white hover:text-neon-pink transition-colors truncate w-36 cursor-pointer font-bold block" onClick={() => onSelectTransaction && onSelectTransaction(tx.hash)} title={tx.hash}>
                            {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 6)}
                        </span>
                        <span className="text-xs text-slate-500 mt-1">{tx.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-500 w-10">From</span>
                          <span 
                            className="text-neon-cyan hover:underline truncate w-32 cursor-pointer block" 
                            onClick={() => onSelectAccount && onSelectAccount(tx.from)}
                          >
                            {tx.from}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-slate-500 w-10">To</span>
                          {tx.toClass ? (
                            <span className={tx.toClass}>{tx.to}</span>
                          ) : (
                            <span 
                              className="text-neon-cyan hover:underline truncate w-32 cursor-pointer block" 
                              onClick={() => onSelectAccount && onSelectAccount(tx.to)}
                            >
                              {tx.to}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="bg-white/5 rounded px-3 py-1.5 inline-block border border-white/10">
                        <span className="text-white font-bold">{tx.value}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;