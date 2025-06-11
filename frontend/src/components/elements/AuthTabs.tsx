interface AuthTabsProps {
  isSignIn: boolean;
  onTabChange: (isSignIn: boolean) => void;
}

export function AuthTabs({ isSignIn, onTabChange }: AuthTabsProps) {
  return (
    <div className="flex justify-center gap-6">
      <TabButton active={isSignIn} onClick={() => onTabChange(true)}>
        Sign In
      </TabButton>
      <TabButton active={!isSignIn} onClick={() => onTabChange(false)}>
        Sign Up
      </TabButton>
    </div>
  );
}

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative pb-2 text-sm font-medium transition-colors duration-300 ${
        active ? 'text-brand-700' : 'text-gray-400'
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 h-0.5 w-full transition-all duration-300 ${
          active ? 'bg-brand-700' : 'bg-transparent'
        }`}
      />
    </button>
  );
}
