// components/DashboardOverview.tsx
import React, { useState, Suspense } from 'react';
import { max, scaleLinear } from 'd3'; 

interface ComplexReportingToolProps {
    data: { label: string; value: number }[];
    chartType: 'bar' | 'pie' | 'line';
}

const ComplexReportingTool = React.lazy(() => import('./ComplexReportingTool'));

interface DashboardOverviewProps {
    isAdmin: boolean;
    initialData: { label: string; value: number }[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ isAdmin, initialData }) => {
    const [showAdvancedReport, setShowAdvancedReport] = useState(false);
    const [reportType, setReportType] = useState<'bar' | 'pie' | 'line'>('bar');

    const handleGenerateData = () => {
        const scaledData = initialData.map(d => ({
            ...d,
            value: scaleLinear().domain([0, 100]).range([0, 1000])(d.value)
        }));
        console.log("Generated scaled data:", scaledData);
    };

    return (
        <div className="dashboard-container">
            <h2>Your Dashboard</h2>
            <p>Welcome to your personal dashboard. Here you can see your key metrics.</p>

            <div className="metrics-grid">
                <div className="metric-card">Total Users: 1,234</div>
                <div className="metric-card">Active Sessions: 567</div>
                <div className="metric-card">Revenue (Last 30 Days): $12,345</div>
            </div>

            {isAdmin && (
                <div className="admin-features">
                    <h3>Admin Panel</h3>
                    <button onClick={handleGenerateData}>Refresh Complex Data</button>
                    <button onClick={() => setShowAdvancedReport(!showAdvancedReport)}>
                        {showAdvancedReport ? 'Hide' : 'Show'} Advanced Report
                    </button>

                    {showAdvancedReport && (
                        <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                            <h4>Advanced Usage Report</h4>
                            <select value={reportType} onChange={(e) => setReportType(e.target.value as any)}>
                                <option value="bar">Bar Chart</option>
                                <option value="pie">Pie Chart</option>
                                <option value="line">Line Chart</option>
                            </select>

                            <Suspense fallback={<div>Loading Advanced Report...</div>}>
                                <ComplexReportingTool data={initialData} chartType={reportType} />
                            </Suspense>
                        </div>
                    )}
                </div>
            )}

            {!isAdmin && (
                <div className="user-info">
                    <p>Contact admin for advanced reporting features.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardOverview;
