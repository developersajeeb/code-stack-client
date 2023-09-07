import { AiFillTwitterCircle } from "react-icons/ai";
import { BiLike } from "react-icons/bi";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TbMessageQuestion, TbWorldLongitude } from "react-icons/tb";
import { Link, useLoaderData } from "react-router-dom";
import notUser from '../../assets/icons/user-not.png';
import b1 from '../../assets/badges/entry.png'
import b2 from '../../assets/badges/l1.png'
import b3 from '../../assets/badges/l2.png'
import b4 from '../../assets/badges/top.png'
import { useEffect, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { MdUnfoldMore } from "react-icons/md";
import storage from '../../assets/others/pngwing.com.png'

interface UserInfo {
    imgURL: '',
    name: '',
    country: '',
    age: '',
    aboutMe: '',
    facebookURL: '',
    githubURL: '',
    twitterURL: '',
    portfolioURL: '',
    email: '',
}

interface QuestionData {
    _id: '',
    title: '',
}

const SingleUser = () => {
    const userData = useLoaderData() as UserInfo | undefined;
    const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
    const [questionsToDisplay, setQuestionsToDisplay] = useState<number>(6);
    const [hasMoreQuestions, setHasMoreQuestions] = useState<boolean>(true);
    const [allAnswers, setAllAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(`http://localhost:5000/questions/${userData?.email}`)
            .then(res => res.json())
            .then(data => {
                setAllQuestions(data)
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000)
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/answers/${userData?.email}`)
            .then(res => res.json())
            .then(data => setAllAnswers(data))
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
            <section className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                <figure><img className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-indigo-100" src={userData?.imgURL || notUser} alt="" /></figure>
                <div>
                    <h2 className="text-[22px] md:text-3xl font-medium text-gray-700">{userData?.name}</h2>
                    <p className="text-gray-500 my-1">{userData?.country}</p>
                    <p className="text-gray-500">{userData?.age ? 'Age: ' + userData.age : ''}</p>
                </div>
            </section>
            <section className="mt-8">
                <h2 className="text-2xl font-medium text-gray-700">About</h2>
                <p className="mt-1 text-gray-500">{userData?.aboutMe}</p>
                <ul className="flex items-center gap-2 mt-4">
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.facebookURL}><BsFacebook size={25} /></a></li>
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.githubURL}><BsGithub size={25} /></a></li>
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.twitterURL}><AiFillTwitterCircle size={30} /></a></li>
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.portfolioURL}><TbWorldLongitude size={28} /></a></li>
                </ul>
            </section>
            <section className="mt-8 grid md:grid-cols-2 gap-5">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-2xl font-medium mb-3">Stats</h3>
                    <ul className="flex justify-between">
                        <h3 className="grid"><BiLike size={24} /><span className="text-sm font-medium text-gray-400 mt-1">Total Votes</span><span className="text-xl font-bold text-gray-700">120</span></h3>
                        <h3 className="grid"><TbMessageQuestion size={24} /><span className="text-sm font-medium text-gray-400 mt-1">Total Questions</span><span className="text-xl font-bold text-gray-700">{allQuestions?.length}</span></h3>
                        <h3 className="grid"><IoChatbubbleEllipsesOutline size={24} /><span className="text-sm font-medium text-gray-400 mt-1">Total Answers</span><span className="text-xl font-bold text-gray-700">{allAnswers?.length}</span></h3>
                    </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-2xl font-medium mb-3">Badges</h3>
                    <ul className="flex gap-4">
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b1} alt="" /><small className="font-medium text-gray-400">Entry</small></li>
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b2} alt="" /><small className="font-medium text-gray-400">L1</small></li>
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b3} alt="" /><small className="font-medium text-gray-400">L2</small></li>
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b4} alt="" /><small className="font-medium text-gray-400">Top</small></li>
                    </ul>
                </div>
            </section>

            <section>
                <h2 className="mt-6 text-2xl font-medium mb-2">Questions</h2>
                <div className="h-[450px] overflow-y-auto custom-scrollbar mt-5">
                    {
                        isLoading ? (
                            <div>
                                <div className="animate-pulse mb-4 flex items-center">
                                    <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress h-7 w-4/5 rounded-full" value={0} max="100"></progress>
                                </div>
                                <div className="animate-pulse mb-4 flex items-center">
                                    <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress h-7 w-full rounded-full" value={0} max="100"></progress>
                                </div>
                                <div className="animate-pulse mb-4 flex items-center">
                                    <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress h-7 w-10/12 rounded-full" value={0} max="100"></progress>
                                </div>
                                <div className="animate-pulse mb-4 flex items-center">
                                    <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress h-7 w-8/12 rounded-full" value={0} max="100"></progress>
                                </div>
                                <div className="animate-pulse mb-4 flex items-center">
                                    <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress h-7 w-9/12 rounded-full" value={0} max="100"></progress>
                                </div>
                                <div className="animate-pulse mb-4 flex items-center">
                                    <progress className="progress w-14 h-7 mr-2 rounded-full" value={0} max="100"></progress>
                                    <progress className="progress h-7 w-7/12 rounded-full" value={0} max="100"></progress>
                                </div>
                            </div>

                        ) : (
                            allQuestions ? (
                                allQuestions?.slice(0, questionsToDisplay).map(question => <Link key={question._id} to={`/main/news-feed/${question._id}`}>
                                    <p className="border-b flex items-center gap-2 py-2 text-lg text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 font-normal"><span><RiQuestionAnswerLine size={24} /></span> {question?.title}</p>
                                </Link>))
                                :
                                <div className="flex justify-center">
                                    <p className="text-sm mt-4 text-gray-500 text-center">
                                        <img className="w-40 mx-auto" src={storage} alt="" />
                                        <span>Just getting started? Try answering a question!</span>
                                        <p className="w-full md:w-96 mt-3">Your most helpful questions, answers and tags will appear here. Start by <Link to='/main/ask-question'><span className="ml-1 text-color-second cursor-pointer">answering a question</span></Link> or selecting tags that match topics you’re interested in.</p>
                                    </p>
                                </div>)
                    }
                    {
                        hasMoreQuestions && !isLoading && (
                            <div className="mt-6">
                                <button className="bg-button mx-auto" onClick={handleLoadMore}>
                                    More <MdUnfoldMore size={20} />
                                </button>
                            </div>
                        )}
                </div>
            </section>
        </main>
    );
};

export default SingleUser;