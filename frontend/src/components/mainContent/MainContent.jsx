export default function MainContent({ children }) {
    return (
        <main className="flex-1 py-4 pl-2 pr-2 md:pr-0 transition-all duration-300 min-h-0 overflow-hidden">
            <div className="h-full w-full rounded-3xl md:rounded-l-3xl md:rounded-r-none bg-[#f4f4f4] p-4 md:p-8 shadow-2xl dark:bg-gray-800 dark:text-white overflow-y-auto text-slate-800">
                {children}
            </div>
        </main>
    );
}