import mockData from './mockData.json';

export const fetchLogs = (
    page: number,
    pageSize: number,
    severities: string[] = [],
    searchQuery: string = ''
) => {
    return new Promise<{ data: typeof mockData; total: number }>((resolve) => {
        setTimeout(() => {
            let filteredData = mockData;

            if (severities.length > 0) {
                filteredData = filteredData.filter((log) =>
                    severities.includes(log.severity)
                );
            }

            if (searchQuery.trim() !== '') {
                const lowerSearch = searchQuery.toLowerCase();

                filteredData = filteredData.filter((log) => {
                    const severityMatch = log.severity.toLowerCase().includes(lowerSearch);

                    let bodyMatch = false;
                    try {
                        const parsedBody = JSON.parse(log.body);
                        const stringifiedValues = Object.values(parsedBody)
                            .map((v) => String(v).toLowerCase())
                            .join(' ');

                        bodyMatch = stringifiedValues.includes(lowerSearch);
                    } catch {
                        bodyMatch = log.body.toLowerCase().includes(lowerSearch);
                    }

                    return severityMatch || bodyMatch;
                });
            }


            const start = page * pageSize;
            const end = start + pageSize;

            resolve({
                data: filteredData.slice(start, end),
                total: filteredData.length,
            });
        }, 500);
    });
};
