import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDataBridge } from '../hooks/useDataBridge';

const TokenomicsView: React.FC = () => {
  const { data: bridgeData, isLoading } = useDataBridge();
  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  
  const { apy, price } = useMemo(() => {
    // Collect average APY from validators if available
    const avgApy = bridgeData?.validators?.length 
        ? bridgeData.validators.reduce((acc, v) => acc + parseFloat(v.apy), 0) / bridgeData.validators.length / 100
        : 0.182;
    
    // Price from market cap / supply
    const currentPrice = bridgeData?.network?.market_cap && bridgeData?.network?.total_supply
        ? bridgeData.network.market_cap / bridgeData.network.total_supply
        : 423.50;
        
    return { apy: avgApy, price: currentPrice };
  }, [bridgeData]);

  const supplyData = useMemo(() => {
    if (!bridgeData) return [
      { name: 'Circulating', value: 67, color: '#00f3ff' },
      { name: 'Locked', value: 33, color: '#1f293a' },
    ];
    
    const circulating = (bridgeData.network.total_supply || 14204591) / 1000000;
    const locked = 21.0 - circulating;
    return [
      { name: 'Circulating', value: circulating, color: '#00f3ff' },
      { name: 'Locked', value: locked, color: '#1f293a' },
    ];
  }, [bridgeData]);

  const stats = useMemo(() => {
    return {
      block: bridgeData?.network?.block || 45102,
      marketCap: bridgeData?.network?.market_cap && bridgeData.network.market_cap > 0 
        ? `$${(bridgeData.network.market_cap / 1_000_000_000).toFixed(1)}B` 
        : 'N/A',
      circulating: bridgeData?.network?.total_supply && bridgeData.network.total_supply > 0
        ? `${(bridgeData.network.total_supply / 1_000_000).toFixed(1)}M`
        : 'N/A'
    };
  }, [bridgeData]);

  const dailyOutput = useMemo(() => (stakeAmount * apy) / 365, [stakeAmount]);
  const monthlyOutput = useMemo(() => (stakeAmount * apy) / 12, [stakeAmount]);

  // Generate Projection Data
  const projectionData = useMemo(() => {
      const data = [];
      let currentStaked = stakeAmount;
      const monthlyRate = apy / 12;
      for(let i = 0; i <= 12; i++) {
          data.push({
              month: i,
              staked: currentStaked,
              holding: stakeAmount
          });
          currentStaked = currentStaked * (1 + monthlyRate);
      }
      return data;
  }, [stakeAmount]);

  return (
    <div className="flex flex-col gap-10 py-10 px-6 lg:px-12 w-full max-w-[1600px] mx-auto font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-4 border-b border-white/5 relative">
         <div className="absolute bottom-0 left-0 w-32 h-[1px] bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]"></div>
         <div>
            <h2 className="text-4xl font-display font-bold text-white mb-2 tracking-tight">Tokenomics & Staking</h2>
            <p className="text-text-secondary max-w-2xl font-light text-lg">Network economy analytics, supply dynamics, and delegation control center.</p>
         </div>
         <div className="flex gap-3">
            <span className="px-4 py-1.5 bg-neon-green/10 text-neon-green text-xs font-bold border border-neon-green/30 flex items-center gap-2 uppercase tracking-wider rounded">
               <span className="size-2 rounded-full bg-neon-green animate-pulse shadow-[0_0_8px_rgba(0,255,157,0.8)]"></span> Network Active
            </span>
            <span className="px-4 py-1.5 bg-black/50 text-neon-cyan font-mono text-xs border border-neon-cyan/30 flex items-center shadow-[inset_0_0_10px_rgba(0,243,255,0.1)] rounded">
               BLOCK: #{stats.block.toLocaleString()}
            </span>
         </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Supply Chart HUD */}
         <div className="lg:col-span-2 glass-panel rounded-xl p-8 relative overflow-hidden group border-t border-l border-neon-cyan/20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="flex flex-col md:flex-row gap-12 items-center h-full relative z-10">
               <div className="relative w-72 h-72 flex-shrink-0 flex items-center justify-center">
                  {/* Rotating HUD Rings */}
                  <div className="absolute inset-[-20px] border border-dashed border-neon-cyan/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute inset-[-40px] border border-dotted border-neon-cyan/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  
                  <PieChart width={288} height={288}>
                    <Pie
                      data={supplyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={130}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {supplyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                     <span className="text-text-secondary text-xs font-mono uppercase tracking-widest mb-1">Circulating</span>
                     <span className="text-5xl font-display font-bold text-white neon-text">{stats.circulating}</span>
                     <span className="text-neon-cyan text-lg font-bold mt-1 drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]">{((supplyData[0].value / 21) * 100).toFixed(0)}%</span>
                  </div>
               </div>
               
               <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
                  <div className="relative pl-4 border-l-2 border-neon-cyan">
                     <div className="absolute top-0 left-[-5px] size-2 bg-neon-cyan shadow-[0_0_10px_#00f3ff]"></div>
                     <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-1 font-mono">Circulating Supply</h4>
                     <p className="text-3xl font-display font-bold text-white tracking-tight">{bridgeData?.network?.total_supply?.toLocaleString() || '14,204,591'} <span className="text-sm font-normal text-neon-cyan align-top mt-1 inline-block">MTN</span></p>
                     <p className="text-xs text-text-secondary mt-1 font-mono opacity-70">&gt;&gt; UNLOCKED :: TRADING_ENABLED</p>
                  </div>
                  <div className="relative pl-4 border-l-2 border-white/10">
                     <div className="absolute top-0 left-[-5px] size-2 bg-white/20"></div>
                     <h4 className="text-text-secondary text-xs uppercase tracking-widest mb-1 font-mono">Locked Supply</h4>
                     <p className="text-3xl font-display font-bold text-white/70 tracking-tight">{(21000000 - (bridgeData?.network?.total_supply || 14204591)).toLocaleString()} <span className="text-sm font-normal text-text-secondary align-top mt-1 inline-block">MTN</span></p>
                     <p className="text-xs text-text-secondary mt-1 font-mono opacity-70">&gt;&gt; VESTING :: RESERVE_FUNDS</p>
                  </div>
                  <div className="pt-6 border-t border-dashed border-white/10 col-span-1 sm:col-span-2 flex justify-between items-end mt-2">
                     <div>
                        <h4 className="text-neon-cyan text-xs uppercase tracking-widest mb-1 font-mono">Max Supply Cap</h4>
                        <p className="text-4xl font-display font-bold text-white tracking-tighter">21,000,000</p>
                     </div>
                     <div className="text-right">
                        <h4 className="text-neon-purple text-xs uppercase tracking-widest mb-1 font-mono">Market Cap</h4>
                        <p className="text-2xl font-display font-bold text-white drop-shadow-[0_0_5px_rgba(188,19,254,0.6)]">{stats.marketCap}</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Staking Console */}
         <div className="glass-panel rounded-xl p-0 flex flex-col justify-between border border-neon-cyan/30 relative overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="bg-neon-cyan/10 p-4 border-b border-neon-cyan/20 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-neon-cyan text-lg">terminal</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Yield_Console</h3>
               </div>
               <div className="flex gap-1">
                  <div className="size-2 bg-red-500 rounded-full"></div>
                  <div className="size-2 bg-yellow-500 rounded-full"></div>
                  <div className="size-2 bg-green-500 rounded-full"></div>
               </div>
            </div>
            
            <div className="p-6 space-y-6 flex-grow bg-black/60 font-mono">
               <div>
                  <div className="flex justify-between mb-3">
                     <label className="text-xs text-neon-cyan font-mono uppercase">Input Stake Amount</label>
                     <span className="text-white font-mono bg-neon-cyan/10 px-2 py-0.5 rounded text-xs border border-neon-cyan/20">MTN</span>
                  </div>
                  <div className="relative group">
                     <input 
                        className="w-full bg-black/40 border border-neon-cyan/30 rounded p-3 text-right text-white font-mono focus:ring-1 focus:ring-neon-cyan focus:border-neon-cyan outline-none text-lg transition-all" 
                        type="number" 
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(Number(e.target.value))}
                     />
                     <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neon-cyan font-bold text-lg group-focus-within:animate-pulse">∑</span>
                  </div>
                  <div className="mt-4">
                     <input 
                        className="w-full accent-neon-cyan h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer" 
                        type="range" 
                        min="100" 
                        max="100000" 
                        step="100"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(Number(e.target.value))}
                     />
                     <div className="flex justify-between text-[10px] text-text-secondary font-mono uppercase mt-1">
                        <span>Min: 100</span>
                        <span>Max: 100,000</span>
                     </div>
                  </div>
               </div>
               
               {/* Mini Projection Chart */}
               <div className="h-32 w-full mt-4 border border-white/5 rounded bg-black/20 p-2">
                   <p className="text-[10px] text-slate-500 mb-1">12-Month Projection</p>
                   <ResponsiveContainer width="100%" height="80%">
                       <LineChart data={projectionData}>
                           <Line type="monotone" dataKey="staked" stroke="#00ffa3" strokeWidth={2} dot={false} animationDuration={500} />
                           <Line type="monotone" dataKey="holding" stroke="#475569" strokeDasharray="3 3" strokeWidth={1} dot={false} />
                       </LineChart>
                   </ResponsiveContainer>
               </div>

               <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/60 p-3 rounded border border-white/10 relative group hover:border-neon-green/50 transition-colors">
                     <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                     <p className="text-[10px] text-text-secondary uppercase font-mono mb-1">Daily Output</p>
                     <p className="text-xl font-bold text-neon-green font-display">{dailyOutput.toFixed(2)}</p>
                     <p className="text-[10px] text-text-secondary font-mono">~${(dailyOutput * price).toLocaleString()} USD</p>
                  </div>
                  <div className="bg-black/60 p-3 rounded border border-white/10 relative group hover:border-neon-green/50 transition-colors">
                     <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
                     <p className="text-[10px] text-text-secondary uppercase font-mono mb-1">Monthly Output</p>
                     <p className="text-xl font-bold text-neon-green font-display">{monthlyOutput.toFixed(2)}</p>
                     <p className="text-[10px] text-text-secondary font-mono">~${(monthlyOutput * price).toLocaleString()} USD</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-black/80 p-5 border-t border-white/10">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-text-secondary uppercase font-mono">Current Efficiency</span>
                  <span className="text-3xl font-display font-bold text-neon-cyan neon-text">{(apy * 100).toFixed(1)}%</span>
               </div>
               <button className="w-full py-3 bg-neon-cyan text-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors flex items-center justify-center gap-2 relative overflow-hidden group shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                  Initialize Staking <span className="material-symbols-outlined text-lg animate-pulse">bolt</span>
               </button>
            </div>
         </div>
      </section>

      {/* Validators List */}
      <section className="flex flex-col gap-6 relative">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3">
               <span className="flex items-center justify-center size-8 rounded border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                  <span className="material-symbols-outlined">dns</span>
               </span>
               Active Validators <span className="text-sm font-normal text-text-secondary ml-2 font-mono self-end mb-1">[TOP 5]</span>
            </h3>
         </div>
         <div className="glass-panel rounded-lg overflow-hidden border border-white/10 relative">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-neon-cyan/5 text-neon-cyan text-xs font-mono uppercase tracking-wider border-b border-neon-cyan/20">
                        <th className="px-6 py-4 font-bold">Node Identity</th>
                        <th className="px-6 py-4 font-bold text-right">Network Stake</th>
                        <th className="px-6 py-4 font-bold text-right">Fee</th>
                        <th className="px-6 py-4 font-bold text-right">Efficiency (APY)</th>
                        <th className="px-6 py-4 font-bold text-right">24h Yield</th>
                        <th className="px-6 py-4 font-bold text-center">Execute</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-white/5">
                     {(bridgeData?.validators?.slice(0, 5) || []).map((val: any, idx: number) => (
                        <tr key={val.id} className="hover:bg-neon-cyan/5 transition-colors group">
                           <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                 <span className="text-text-secondary w-4 text-xs font-mono">{idx + 1}</span>
                                 <div className={`size-10 rounded bg-slate-800 p-[1px]`}>
                                    <div className="w-full h-full bg-black flex items-center justify-center rounded-[3px]">
                                       <span className="text-white font-bold text-xs">{(val.name || 'VA').substring(0,2).toUpperCase()}</span>
                                    </div>
                                 </div>
                                 <div>
                                    <p className="font-bold text-white text-base group-hover:text-neon-cyan transition-colors font-display tracking-wide">{val.name || `Validator ${idx+1}`}</p>
                                    <div className="flex items-center gap-2">
                                       <p className="text-[10px] text-text-secondary font-mono bg-white/5 px-1 rounded">{val.address?.substring(0, 10)}...</p>
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <div className="font-bold text-white font-mono text-base">{val.stake} <span className="text-xs text-text-secondary">MTN</span></div>
                              <div className="text-xs text-text-secondary opacity-60">{val.stakeVal}</div>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">{val.fee}</span>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <span className="text-neon-green font-bold font-mono text-lg drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]">{val.apy}</span>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <span className="text-white font-mono">{val.yield} MTN</span>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <button className="px-6 py-2 bg-transparent hover:bg-neon-cyan text-neon-cyan hover:text-black border border-neon-cyan rounded text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)] hover:shadow-[0_0_15px_rgba(0,240,255,0.6)]">
                                 Delegate
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>
    </div>
  );
};

export default TokenomicsView;