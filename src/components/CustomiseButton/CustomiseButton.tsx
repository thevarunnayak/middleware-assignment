import { useEffect, useRef, useState } from "react";
import "./CustomiseButton.css";

interface CustomizeProps {
    columns: string[];
    visibleColumns: Record<string, boolean>;
    onChange: (visibility: Record<string, boolean>) => void;
}

const CustomizeButton = ({ columns, visibleColumns, onChange }: CustomizeProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [localVisibility, setLocalVisibility] = useState(visibleColumns);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setLocalVisibility(visibleColumns);
        }
    }, [visibleColumns, isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = (column: string) => {
        const currentlyVisible = Object.values(localVisibility).filter(Boolean).length;
        const isCurrentlyChecked = localVisibility[column];

        if (currentlyVisible === 1 && isCurrentlyChecked) return;

        setLocalVisibility((prev) => ({ ...prev, [column]: !prev[column] }));
    };

    const applyChanges = () => {
        onChange(localVisibility);
        setIsOpen(false);
    };

    const cancelChanges = () => {
        setLocalVisibility(visibleColumns);
        setIsOpen(false);
    };

    return (
        <div className="customize-button-wrapper" ref={wrapperRef}>
            <button
                className="kebab-menu-button"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Customise
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    <h3>Customize Columns</h3>
                    {columns.map((col) => {
                        const isChecked = localVisibility[col];
                        const totalChecked = Object.values(localVisibility).filter(Boolean).length;
                        const isOnlyChecked = isChecked && totalChecked === 1;

                        return (
                            <label key={col}>
                                <input
                                    type="checkbox"
                                    checked={!!isChecked}
                                    onChange={() => handleToggle(col)}
                                    disabled={isOnlyChecked}
                                />
                                {col}
                            </label>
                        );
                    })}
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={applyChanges}>Apply</button>
                        <button onClick={cancelChanges}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomizeButton;
