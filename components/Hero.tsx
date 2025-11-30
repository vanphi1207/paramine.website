import React, { useState, useEffect } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { SERVER_IP, DISCORD_LINK } from "../constants";

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [serverStatus, setServerStatus] = useState<{
    online: boolean;
    players: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        // Sử dụng API v2 của mcstatus.io cho Java edition
        const response = await fetch(
          `https://api.mcstatus.io/v2/status/java/${SERVER_IP}`
        );
        const data = await response.json();
        setServerStatus({
          online: data.online,
          players: data.players?.online || 0,
        });
      } catch (error) {
        console.error("Error fetching server status:", error);
        setServerStatus({ online: false, players: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    // Cập nhật trạng thái mỗi 60 giây
    const interval = setInterval(fetchStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>

      <div className="text-center px-4 max-w-4xl mx-auto z-10">
        <div className="mb-6 inline-block">
          <span className="py-1 px-3 rounded-full bg-slate-800/50 border border-emerald-500/30 text-emerald-400 text-sm font-semibold tracking-wider uppercase">
            Season 4 đang diễn ra
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-2xl">
          Chào mừng đến <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
            PARAMINE
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Máy chủ Minecraft sinh tồn đỉnh cao tại Việt Nam. Khám phá thế giới
          mới, xây dựng đế chế, và chiến đấu cùng hàng ngàn người chơi khác.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <div className="relative group w-full sm:w-auto">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto flex items-center justify-between gap-6 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-emerald-500/50 text-white px-8 py-4 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">
                  Server IP
                </span>
                <span className="text-xl font-mono font-bold text-emerald-400">
                  {SERVER_IP}
                </span>
              </div>
              <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                {copied ? (
                  <Check className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Copy className="w-5 h-5 text-slate-300" />
                )}
              </div>
            </button>
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs py-1 px-2 rounded shadow-lg animate-bounce">
                Đã copy!
              </span>
            )}
          </div>

          <a
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto flex items-center justify-between gap-6 bg-[#5865F2] hover:bg-[#4752c4] text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#5865F2]/40"
          >
            <div className="flex flex-col items-start text-left">
              <span className="text-xs text-indigo-200 uppercase tracking-wider font-bold">
                Cộng đồng
              </span>
              <span className="text-xl font-bold">Discord</span>
            </div>
            <div className="bg-[#4752c4] p-2 rounded-lg group-hover:bg-white/10 transition-colors">
              <ExternalLink className="w-5 h-5 text-white" />
            </div>
          </a>
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-slate-400 text-sm h-6">
          {loading ? (
            <span className="animate-pulse">Đang tải trạng thái server...</span>
          ) : (
            <>
              <span
                className={`w-2 h-2 rounded-full ${
                  serverStatus?.online
                    ? "bg-emerald-500 animate-pulse"
                    : "bg-red-500"
                }`}
              ></span>
              {serverStatus?.online ? (
                <span>
                  <span className="font-bold text-white">
                    {serverStatus.players.toLocaleString()}
                  </span>{" "}
                  người chơi đang online
                </span>
              ) : (
                <span className="text-red-400 font-medium">
                  Server đang offline
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
