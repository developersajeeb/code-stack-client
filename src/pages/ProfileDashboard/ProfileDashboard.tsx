import { Link, useLoaderData } from "react-router-dom";
import storage from '../../assets/others/pngwing.com.png'
import { useEffect, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdUnfoldMore } from "react-icons/md";

interface UserInfo {
    aboutMe: string;
    email: string;
}

interface QuestionData {
    _id: '',
    title: '',
}

const ProfileDashboard = () => {
    const userData = useLoaderData() as UserInfo | undefined;
    const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
    const [questionsToDisplay, setQuestionsToDisplay] = useState<number>(6);
    const [hasMoreQuestions, setHasMoreQuestions] = useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:5000/questions/${userData?.email}`)
            .then(res => res.json())
            .then(data => setAllQuestions(data))
    }, [])

    const handleLoadMore = () => {
        const nextQuestionsToDisplay = questionsToDisplay + 6;
        setQuestionsToDisplay(nextQuestionsToDisplay);

        if (nextQuestionsToDisplay >= allQuestions.length) {
            setHasMoreQuestions(false);
        }
    };

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
            <div className="border p-4 rounded-lg bg-gray-50 mt-8">
                <h3 className="text-2xl font-medium mb-2">Posts</h3>
                <div className="h-[480px] overflow-y-auto custom-scrollbar">
                    {allQuestions ? (
                        allQuestions?.map(question => <Link to={`/main/news-feed/${question._id}`}>
                            <p className="border-b flex items-center gap-2 py-2 text-lg text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 font-normal"><RiQuestionAnswerLine size={24} /> {question?.title}</p>
                        </Link>))
                        :
                        <div className="flex justify-center">
                            <p className="text-sm mt-4 text-gray-500 text-center">
                                <img className="w-40 mx-auto" src={storage} alt="" />
                                <span>Just getting started? Try answering a question!</span>
                                <p className="w-full md:w-96 mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/main/ask-question'><span className="ml-1 text-color-second cursor-pointer">answering a question</span></Link> or selecting tags that match topics you’re interested in.</p>
                            </p>
                        </div>
                    }
                    {
                        hasMoreQuestions && (
                            <div className="mt-6">
                                <button className="bg-button mx-auto" onClick={handleLoadMore}>
                                    More <MdUnfoldMore size={20} />
                                </button>
                            </div>
                        )}
                </div>
            </div>
        </main>
    );
};

export default ProfileDashboard;