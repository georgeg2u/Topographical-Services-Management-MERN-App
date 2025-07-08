import Chatbox from "../../Chatbox/Chatbox";
import HomePageForRecruiters from "../homepage/HomePageForRecruiters";
import HomePageSteps from "../homepage/HomePageSteps";
import HomepageHero from "../homepage/HomepageHero";

const HomepageView = () => {
    return (
        <>
        <Chatbox />
        <HomepageHero />
        <HomePageSteps /> 
        <HomePageForRecruiters />
        </>
    )
}

export default HomepageView;