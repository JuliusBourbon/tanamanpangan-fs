import { Home, ScanLine, History, BookOpen, UserCircle, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogoIcon } from '../Logo';

const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: Home, shortcut: 1 },
    { id: 'scan', label: 'Scan', path: '/scan', icon: ScanLine, shortcut: 2 },
    { id: 'history', label: 'Scan History', path: '/history', icon: History, shortcut: 3 },
    { id: 'encyclopedia', label: 'Encyclopedia', path: '/encyclopedia-app', icon: BookOpen, shortcut: 4 },
    { id: 'account', label: 'Account & Settings', path: '/profile', icon: UserCircle, shortcut: 5 },
];

function useShortcut(menuItems, navigate) {
    useEffect(() => {
        const handler = (e) => {
            if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
            const num = parseInt(e.key);
            if (num >= 1 && num <= menuItems.length) {
                navigate(menuItems[num - 1].path);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [menuItems, navigate]);
}

export default function Sidebar({ isExpanded, setIsExpanded, onNavigate }) {
    const location = useLocation();
    const navigate = useNavigate();

    useShortcut(menuItems, navigate);

    const handleNavigate = (path) => {
        navigate(path);
        onNavigate?.();
    };

    return (
        <aside
            style={{
                width: isExpanded ? 256 : 80,
                transition: 'width 300ms cubic-bezier(0.4,0,0.2,1)',
            }}
            className="relative flex flex-col h-full pt-6 pb-4 shrink-0 overflow-hidden bg-[#E4E4E4]"
        >
            <div className="relative flex items-center mb-8 px-4" style={{ height: 40 }}>
                <div
                    className="absolute inset-0 items-center justify-center hidden md:flex"
                    style={{
                        opacity: isExpanded ? 0 : 1,
                        pointerEvents: isExpanded ? 'none' : 'auto',
                        transition: 'opacity 200ms ease',
                    }}
                >
                <button
                    onClick={() => setIsExpanded(true)}
                    className="text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-md"
                    title="Expand sidebar"
                >
                    <PanelLeftOpen size={22} />
                </button>
                </div>

                <div
                className="absolute inset-0 flex items-center px-4 gap-2"
                style={{
                    opacity: isExpanded ? 1 : 0,
                    pointerEvents: isExpanded ? 'auto' : 'none',
                    transition: 'opacity 200ms ease',
                }}
                >
                <div className="shrink-0 bg-[#19793F] text-white p-1 rounded-full">
                    <LogoIcon />
                </div>
                <span className="font-semibold text-xl text-[#19793F] whitespace-nowrap flex-1 overflow-hidden">
                    Tanam Pangan
                </span>
                <button
                    onClick={() => setIsExpanded(false)}
                    className="shrink-0 text-slate-500 hover:text-slate-800 transition-colors p-1 rounded-md hidden md:block"
                    title="Collapse sidebar"
                >
                    <PanelLeftClose size={22} />
                </button>
                </div>
            </div>

            <nav className="flex flex-col gap-1 px-3">
                {menuItems.map(({ id, label, path, icon: Icon, shortcut }) => {
                    const active = location.pathname.startsWith(path);
                    return (
                        <button
                            key={id}
                            onClick={() => handleNavigate(path)}
                            title={!isExpanded ? `${label} (${shortcut})` : ''}
                            className={`flex items-center gap-2 w-full rounded-2xl transition-colors duration-200 overflow-hidden ${
                                active
                                ? 'bg-white shadow text-slate-800'
                                : 'text-slate-500 hover:bg-black/5 hover:text-slate-700'
                            }`}
                            style={{
                                padding: '10px 12px',
                                justifyContent: isExpanded ? 'flex-start' : 'center',
                            }}
                        >
                        <Icon size={22} className="shrink-0" />
                        <span
                            className="flex items-center justify-between overflow-hidden"
                            style={{
                            maxWidth: isExpanded ? 200 : 0,
                            opacity: isExpanded ? 1 : 0,
                            marginLeft: isExpanded ? 12 : 0,
                            transition:
                                'max-width 300ms cubic-bezier(0.4,0,0.2,1), opacity 200ms ease, margin-left 300ms ease',
                            }}
                        >
                            <span className="whitespace-nowrap text-sm font-medium">{label}</span>
                            <kbd
                                className="ml-2 text-xs font-medium text-slate-400 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md whitespace-nowrap"
                                style={{ lineHeight: 1.4 }}
                            >
                                {shortcut}
                            </kbd>
                        </span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}