import { useEffect } from "react";
import l1 from '../../assets/badges/l1.png';
import l2 from '../../assets/badges/l2.png';
import top from '../../assets/badges/top.png';


const Badges = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <main className="px-0 lg:pl-6">
            <section className="grid sm:grid-cols-3 gap-5">                
                <div className="text-center">
                    <img className="w-full max-w-[160px] mx-auto" src={l1} alt="" />
                    <h2 className="mt-4 mb-2 text-2xl font-semibold text-gray-800">Level 1</h2>
                    <p className="text-sm text-gray-500">When a user posts up to 5 questions on CodeStack, they receive the Level 1 badge.</p>
                </div>
                
                <div className="text-center">
                    <img className="w-full max-w-[160px] mx-auto" src={l2} alt="" />
                    <h2 className="mt-4 mb-2 text-2xl font-semibold text-gray-800">Level 2</h2>
                    <p className="text-sm text-gray-500">When a user posts up to 10 questions on CodeStack, they receive the Level 2 badge.</p>
                </div>
                
                <div className="text-center">
                    <img className="w-full max-w-[160px] mx-auto" src={top} alt="" />
                    <h2 className="mt-4 mb-2 text-2xl font-semibold text-gray-800">Top</h2>
                    <p className="text-sm text-gray-500">When a user posts up to 20 questions on CodeStack, they receive the Top Level badge.</p>
                </div>
            </section>
        </main>
    );
};

export default Badges;