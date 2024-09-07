import { useEffect } from "react";


const Badges = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main className="px-0 lg:pl-6">
            This is Badge page
        </main>
    );
};

export default Badges;