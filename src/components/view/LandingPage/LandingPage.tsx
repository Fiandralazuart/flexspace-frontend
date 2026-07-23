import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import HeroSection from "./HeroSection";
import LandingNavbar from "./LandingHeader";
import SolutionSection from "./SolutionPage";
import WhySection from "./WhySection";

const LandingPage = () => {
	return (
		<div className="min-h-screen bg-background">
			<LandingNavbar />
			<HeroSection />
			<WhySection />
			<SolutionSection />
			<AboutSection />
			<ContactSection/>
			
		</div>
	);
};

export default LandingPage;
