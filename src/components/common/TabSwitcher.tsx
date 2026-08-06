interface TabSwitcherProps {
  tabs: string[];
  activeTab: string;
  onSelect: (tab: string) => void;
}

export function TabSwitcher({ tabs, activeTab, onSelect }: TabSwitcherProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onSelect(tab)}
          className={tab === activeTab ? "font-semibold" : "text-neutral-400"}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
