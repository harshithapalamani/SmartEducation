import React, { useState, useEffect } from 'react';
import { WifiOff, Wifi, Download, RefreshCw, X } from 'lucide-react';
import { useOnlineStatus, useServiceWorker } from '../hooks/useOffline';
import { getOfflineStorageStats } from '../services/offlineStorage';

/**
 * Floating offline indicator banner
 */
const OfflineIndicator = () => {
    const isOnline = useOnlineStatus();
    const { updateAvailable, applyUpdate } = useServiceWorker();
    const [dismissed, setDismissed] = useState(false);
    const [stats, setStats] = useState(null);
    const [showStats, setShowStats] = useState(false);
    const [wasOffline, setWasOffline] = useState(false);
    const [showReconnected, setShowReconnected] = useState(false);

    useEffect(() => {
        if (!isOnline) {
            setWasOffline(true);
            setDismissed(false);
            getOfflineStorageStats().then(setStats).catch(() => { });
        } else if (wasOffline) {
            setShowReconnected(true);
            setTimeout(() => setShowReconnected(false), 3000);
            setWasOffline(false);
        }
    }, [isOnline, wasOffline]);

    // Show update banner
    if (updateAvailable) {
        return (
            <div className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 transform">
                <div className="flex items-center gap-3 rounded-2xl bg-[#4338ca] px-5 py-3 text-white shadow-2xl">
                    <RefreshCw className="h-5 w-5 animate-spin" />
                    <span className="text-sm font-medium">A new version is available!</span>
                    <button
                        onClick={applyUpdate}
                        className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#4338ca] hover:bg-[#ede9fe] transition"
                    >
                        Update Now
                    </button>
                </div>
            </div>
        );
    }

    // Show reconnected toast
    if (showReconnected && isOnline) {
        return (
            <div className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 transform animate-bounce">
                <div className="flex items-center gap-3 rounded-2xl bg-[#166534] px-5 py-3 text-white shadow-2xl">
                    <Wifi className="h-5 w-5" />
                    <span className="text-sm font-medium">Back online! Your data will sync automatically.</span>
                </div>
            </div>
        );
    }

    // Don't show anything when online
    if (isOnline || dismissed) return null;

    return (
        <div className="fixed bottom-4 left-1/2 z-[9999] -translate-x-1/2 transform">
            <div className="rounded-2xl bg-[#0f172a] px-5 py-3 text-white shadow-2xl">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f59e0b]">
                        <WifiOff className="h-4 w-4 text-[#0f172a]" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold">You're offline</p>
                        <p className="text-xs text-[#94a3b8]">
                            {stats && stats.totalDownloads > 0
                                ? `${stats.courseCount} courses & ${stats.materialCount} materials available offline`
                                : 'Downloaded content is still available'}
                        </p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                        {stats && stats.totalDownloads > 0 && (
                            <button
                                onClick={() => setShowStats(!showStats)}
                                className="rounded-full p-1.5 hover:bg-white/10 transition"
                                title="View offline content"
                            >
                                <Download className="h-4 w-4" />
                            </button>
                        )}
                        <button
                            onClick={() => setDismissed(true)}
                            className="rounded-full p-1.5 hover:bg-white/10 transition"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </div>

                {showStats && stats && (
                    <div className="mt-3 border-t border-white/10 pt-3">
                        <div className="grid grid-cols-3 gap-3 text-center text-xs">
                            <div>
                                <p className="font-bold text-[#f59e0b]">{stats.courseCount}</p>
                                <p className="text-[#94a3b8]">Courses</p>
                            </div>
                            <div>
                                <p className="font-bold text-[#f59e0b]">{stats.materialCount}</p>
                                <p className="text-[#94a3b8]">Materials</p>
                            </div>
                            <div>
                                <p className="font-bold text-[#f59e0b]">{stats.totalSizeMB} MB</p>
                                <p className="text-[#94a3b8]">Storage</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OfflineIndicator;
