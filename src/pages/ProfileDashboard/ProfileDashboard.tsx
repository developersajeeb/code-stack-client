import { Link, useLoaderData } from "react-router-dom";
import storage from '../../assets/others/pngwing.com.png'

interface UserInfo {
    aboutMe: string;
}

const ProfileDashboard = () => {
    const userData = useLoaderData() as UserInfo | undefined;
    
    return (
        <main>
            <div className="border p-4 rounded-lg text-2xl font-medium bg-gray-50">
                <h3>About</h3>
                <p className="text-sm font-medium mt-4 text-gray-500">
                    <span className="text-gray-500 font-normal flex justify-center">
                        {
                            userData?.aboutMe || 'Your about me section is currently blank.' 
                        }
                    </span>
                </p>
            </div>
            <div className="border p-4 rounded-lg text-2xl font-medium bg-gray-50 mt-8 pb-20">
                <h3>Posts</h3>
                <div className="flex justify-center">
                    <p className="text-sm mt-4 text-gray-500 text-center">
                        <img className="w-40 mx-auto" src={storage} alt="" />
                        <span>Just getting started? Try answering a question!</span>
                        <p className="w-full md:w-96 mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/main/ask-question'><span className="ml-1 text-orange-400 cursor-pointer">answering a question</span></Link> or selecting tags that match topics you’re interested in.</p>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default ProfileDashboard;