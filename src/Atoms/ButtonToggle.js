export function ButtonToggle({ onSetIsOpen, children }) {
  return (
    <button className="btn-toggle" onClick={() => onSetIsOpen((open) => !open)}>
      {children}
    </button>
  );
}
