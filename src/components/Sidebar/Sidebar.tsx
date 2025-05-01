import { useEffect, useRef, useState } from 'react';
import './Sidebar.css';

interface SidebarProps {
    onFilterChange: (severities: string[]) => void;
}

const Sidebar = ({ onFilterChange }: SidebarProps) => {
    const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    const severities = ["INFO", "DEBUG", "WARN", "ERROR"];

    const handleCheckboxChange = (severity: string) => {
        setSelectedSeverities((prevSelected) => {
            const newSelected = prevSelected.includes(severity)
                ? prevSelected.filter((s) => s !== severity)
                : [...prevSelected, severity];

            onFilterChange(newSelected);
            return newSelected;
        });
    };

    const clearAll = () => {
        setSelectedSeverities([]);
        onFilterChange([]);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
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

    return (
        <>
            <div className='sidebar-desktop'>
                <h3>Filter by Severity</h3>
                <div className='checkbox-group'>
                    {severities.map((severity) => (
                        <label key={severity}>
                            <input
                                type="checkbox"
                                checked={selectedSeverities.includes(severity)}
                                onChange={() => handleCheckboxChange(severity)}
                            />
                            {severity}
                        </label>
                    ))}
                </div>
                <button className="clear-button" onClick={clearAll}>Clear All</button>
            </div>
            <div className="sidebar-mobile" ref={mobileMenuRef}>
                <button
                    className="kebab-menu-button"
                    onClick={() => setIsOpen((prev) => !prev)}
                >
                    Filter
                </button>

                {isOpen && (
                    <div className="dropdown-menu">
                        <h3>Filter by Severity</h3>
                        <div className='checkbox-group'>
                            {severities.map((severity) => (
                                <label key={severity}>
                                    <input
                                        type="checkbox"
                                        checked={selectedSeverities.includes(severity)}
                                        onChange={() => handleCheckboxChange(severity)}
                                    />
                                    {severity}
                                </label>
                            ))}
                        </div>
                        <button className="clear-button" onClick={clearAll}>Clear All</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Sidebar;
