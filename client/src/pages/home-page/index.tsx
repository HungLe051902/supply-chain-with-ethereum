import { SideBar } from "../../layouts/SideBar"
import { TopBar } from "../../layouts/TopBar"

export const HomePage = () => {
    return (<div id="home-page" className="w-scree h-screen flex">
        <SideBar />
        <div id="main-content" className="w-full">
            <TopBar />
        </div>
    </div>)
}