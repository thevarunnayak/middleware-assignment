import { useEffect, useRef, useState } from "react";
import "./Table.css";
import NoData from "../NoData/NoData";

interface TableProps {
    logs: { timestamp: string; severity: string; body: string }[];
    totalLogs: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    visibleColumns: Record<string, boolean>;
    columns: string[];
}

const Table = ({ logs, totalLogs, page, setPage, visibleColumns, columns }: TableProps) => {
    const tableRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(true);

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const target = e.currentTarget;
        const atBottom = target.scrollTop + target.clientHeight >= target.scrollHeight - 5;
        if (atBottom && (page + 1) * 100 < totalLogs) {
            setIsLoading(true);
            setPage((prevPage) => prevPage + 1);
        }
        else {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (logs.length > 0) {
            setIsDataLoading(false);
        }
    }, [logs]);

    const renderColumnHeader = (key: keyof typeof visibleColumns, label: string) =>
        visibleColumns[key] ? <th key={key}>{label}</th> : null;

    const renderColumnData = (log: { timestamp: string; severity: string; body: string }) => (
        <>
            {visibleColumns.Timestamp && (
                <td>
                    {new Date(parseInt(log.timestamp)).toLocaleString("en-IN")}
                </td>
            )}
            {visibleColumns.Severity && <td className={`severity-text-${log.severity.toLowerCase()}`}>{log.severity}</td>}
            {visibleColumns.Body && (
                <td>
                    <pre>{JSON.stringify(JSON.parse(log.body), null, 2)}</pre>
                </td>
            )}
        </>
    );

    if (isDataLoading) {
        return <div className="table-wrapper">
            <div className="loading">Loading logs...</div>
        </div>;
    }

    return (
        <div className="table-wrapper">
            {logs.length > 0 ? (
                <>
                    <table className="table-header">
                        <thead>
                            <tr>
                                {columns.map((column) =>
                                    renderColumnHeader(column as keyof typeof visibleColumns, column)
                                )}
                            </tr>
                        </thead>
                    </table>
                    <div className="table-body-scroll" ref={tableRef} onScroll={handleScroll}>
                        <table className="table-body">
                            <tbody>
                                {logs.map((log) => (
                                    <tr key={log.timestamp}>{renderColumnData(log)}</tr>
                                ))}
                            </tbody>
                        </table>
                        {isLoading && <div className="loading">Loading more logs...</div>}
                    </div>
                </>
            ) : (
                <NoData message="No logs available" />
            )}
        </div>
    );
};

export default Table;
