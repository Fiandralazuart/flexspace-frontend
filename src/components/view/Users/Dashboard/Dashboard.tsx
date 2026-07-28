import SpaceCard from "./SpaceCard";
import BookingCard from "./BookingCard";

const Dashboard = () => {
	return (
		<div className="flex flex-col gap-4">
			<BookingCard />
			<SpaceCard />
		</div>
	);
};

export default Dashboard;
