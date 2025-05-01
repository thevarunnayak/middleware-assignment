import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";
import { fetchLogs } from "../../data/mockData";
import "./Landing.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import CustomizeButton from "../../components/CustomiseButton/CustomiseButton";

const allColumns = ["Timestamp", "Severity", "Body"];

const Landing = () => {
    interface Log {
        body: string;
        severity: string;
        timestamp: string;
    }

    const [logs, setLogs] = useState<Log[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedSeverities, setSelectedSeverities] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const colParam = searchParams.get("columns");
        if (colParam) {
            const visible = colParam.split(",").reduce((acc, col) => {
                acc[col] = true;
                return acc;
            }, {} as Record<string, boolean>);

            const merged = allColumns.reduce((acc, col) => {
                acc[col] = visible[col] ?? false;
                return acc;
            }, {} as Record<string, boolean>);
            setVisibleColumns(merged);
        } else {
            setVisibleColumns(allColumns.reduce((acc, col) => ({ ...acc, [col]: true }), {}));
        }
    }, [searchParams]);

    const updateVisibleColumns = (newState: Record<string, boolean>) => {
        setVisibleColumns(newState);
        const enabledCols = Object.entries(newState)
            .filter(([, isVisible]) => isVisible)
            .map(([col]) => col);
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("columns", enabledCols.join(","));
            return newParams;
        });
    };

    const loadLogs = useCallback(async () => {
        const { data, total } = await fetchLogs(page, 100, selectedSeverities, searchQuery);
        setLogs((prev) => (page === 0 ? data : [...prev, ...data]));
        setTotal(total);
    }, [page, selectedSeverities, searchQuery]);

    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    useEffect(() => {
        setPage(0);
    }, [selectedSeverities, searchQuery]);

    const handleFilterChange = (severities: string[]) => {
        setSelectedSeverities(severities);
    };

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="landing-container">

            <div className="table-section">
                <div className="filter-section">
                    <SearchBar onSearch={handleSearchChange} />
                    <div className="filter-button-section">
                        <Sidebar onFilterChange={handleFilterChange} />
                        <CustomizeButton
                            columns={allColumns}
                            visibleColumns={visibleColumns}
                            onChange={updateVisibleColumns}
                        />
                    </div>
                </div>
                <Table
                    logs={logs}
                    totalLogs={total}
                    page={page}
                    setPage={setPage}
                    visibleColumns={visibleColumns}
                    columns={allColumns}
                />
            </div>
        </div>
    );
};

export default Landing;
