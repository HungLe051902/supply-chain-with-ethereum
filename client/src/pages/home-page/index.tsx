import { SideBar } from "../../layouts/SideBar"
import { TopBar } from "../../layouts/TopBar"
import { Outlet } from "react-router-dom";

export const HomePage = () => {
    return (<div id="home-page" className="w-screen h-screen flex">
        <SideBar />
        <div id="main-content" className="w-full">
            <TopBar />
            <div className="p-4">
                <Outlet />
            </div>
        </div>
    </div>)
}