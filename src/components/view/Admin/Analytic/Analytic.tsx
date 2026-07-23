"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OccupancyDashboard from "./OccupancyAnaliticTab/OccupancyAnaliticTab";
import UpdateHandle from "@/components/common/UpdateHandle";

// import AssetDashboard from "./asset/AssetDashboard";
// import BookingDashboard from "./booking/BookingDashboard";
// import EnergyDashboard from "./energy/EnergyDashboard";
// import OccupancyDashboard from "./occupancy/OccupancyDashboard";

const Analytic = () => {
	return (
		<Tabs
			defaultValue="occupancy"
			className="space-y-6"
		>
			<TabsList>
				<TabsTrigger value="occupancy">
					Occupancy
				</TabsTrigger>

				<TabsTrigger value="asset">
					Assets
				</TabsTrigger>

				<TabsTrigger value="energy">
					Energy
				</TabsTrigger>

				<TabsTrigger value="booking">
					Booking
				</TabsTrigger>
			</TabsList>

			<TabsContent value="occupancy">
				<OccupancyDashboard />
			</TabsContent>

			<TabsContent value="asset">
				<UpdateHandle />
				{/* <AssetDashboard /> */}
			</TabsContent>

			<TabsContent value="energy">
				<UpdateHandle />
				{/* <EnergyDashboard /> */}
			</TabsContent>

			<TabsContent value="booking">
				<UpdateHandle />
				{/* <BookingDashboard /> */}
			</TabsContent>
		</Tabs>
	);
};

export default Analytic;