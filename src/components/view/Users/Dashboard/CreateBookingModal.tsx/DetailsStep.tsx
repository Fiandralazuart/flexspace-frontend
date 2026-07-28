"use client";

import { Controller, Control } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormValues {
	title: string;
	description: string;
}

interface Props {
	control: Control<FormValues>;
}

const DetailsStep = ({ control }: Props) => {
	return (
		<div className="mx-auto max-w-2xl space-y-8">
			<div>
				<h2 className="text-2xl font-semibold">
					Booking Information
				</h2>

				<p className="mt-2 text-sm text-muted-foreground">
					Provide the reservation details before submitting your
					request.
				</p>
			</div>

			<div className="space-y-6">
				<div className="space-y-2">
					<label className="text-sm font-medium">
						Meeting Title
					</label>

					<Controller
						name="title"
						control={control}
						render={({ field, fieldState }) => (
							<>
								<Input
									placeholder="e.g. Weekly Team Meeting"
									{...field}
								/>

								{fieldState.error && (
									<p className="text-sm text-red-500">
										{fieldState.error.message}
									</p>
								)}
							</>
						)}
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">
						Description
					</label>

					<Controller
						name="description"
						control={control}
						render={({ field, fieldState }) => (
							<>
								<Textarea
									rows={6}
									placeholder="Describe the purpose of your reservation..."
									{...field}
								/>

								{fieldState.error && (
									<p className="text-sm text-red-500">
										{fieldState.error.message}
									</p>
								)}
							</>
						)}
					/>
				</div>
			</div>

			<div className="rounded-xl border bg-muted/30 p-4">
				<h3 className="font-medium">
					Tips
				</h3>

				<ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
					<li>Use a clear and descriptive meeting title.</li>
					<li>Include the purpose of the reservation.</li>
					<li>Double-check the selected date and time.</li>
				</ul>
			</div>
		</div>
	);
};

export default DetailsStep;