import "./NoData.css";

interface NoDataProps {
    message?: string;
}

const NoData = ({ message = "No data available" }: NoDataProps) => {
    return (
        <div className="no-data-container">
            <div className="no-data-message">{message}</div>
        </div>
    );
};

export default NoData;
