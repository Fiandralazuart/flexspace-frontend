import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
	icon: LucideIcon;
	title: string;
	value: string;
}

const SummaryCard = ({ icon: Icon, title, value }: Props) => {
	return (
		<Card className="border-emerald-100 bg-white shadow-none transition-all hover:border-emerald-300 hover:shadow-sm">
			<CardContent className="flex h-24 items-center gap-4 p-4">
				<div className="rounded-xl bg-emerald-100 p-2.5">
					<Icon className="h-5 w-5 text-emerald-600" />
				</div>

				<div>
					<p className="text-xs text-muted-foreground">{title}</p>

					<p className="mt-1 font-semibold leading-5">{value}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default SummaryCard;
