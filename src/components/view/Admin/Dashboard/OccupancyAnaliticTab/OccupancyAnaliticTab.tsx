"use client";

import PeakHourChart from "./PeakHourChart";
import StatusChart from "./StatusChart";
import SummaryCards from "./SummaryCard";
import TopSpacesTable from "./TopSpace";
import TrendChart from "./TrendChart";
import UtilizationChart from "./UtilizationChart";

const OccupancyDashboard = () => {
	return (
		<div className="space-y-6">
			<SummaryCards />

			<div className="grid gap-6 xl:grid-cols-2">
				<TrendChart />

				<PeakHourChart />
			</div>

			<div className="grid gap-6 xl:grid-cols-2">
				<StatusChart />

				<UtilizationChart />
			</div>

			<TopSpacesTable />
		</div>
	);
};

export default OccupancyDashboard;