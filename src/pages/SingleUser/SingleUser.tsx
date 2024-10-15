import { AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TbMessageQuestion, TbWorldLongitude } from "react-icons/tb";
import { Link, useLoaderData } from "react-router-dom";
import notUser from '../../assets/icons/user-not.png';
import b2 from '../../assets/badges/l1.png'
import b3 from '../../assets/badges/l2.png'
import b4 from '../../assets/badges/top.png'
import { useEffect, useState } from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";
import storage from '../../assets/others/pngwing.com.png'
import { Button } from "primereact/button";
import sectionBg from '../../assets/user-profile-bg.png';

interface UserInfo {
    imgURL: '',
    name: '',
    username: '',
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
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const userData = useLoaderData() as UserInfo | undefined;
    const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const [allUserQuestion, setAllUserQuestion] = useState([]);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(true);
    const [isSkeletonLoading, setIsSkeletonLoading] = useState<boolean>(true);
    const [isDataQLoading, setIsDataQLoading] = useState<boolean>(true);
    const [isDataALoading, setIsDataALoading] = useState<boolean>(true);
    const [skip, setSkip] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const fetchQuestions = async () => {
        try {
            if (skip === 0) {
                setIsSkeletonLoading(true);
            } else {
                setIsButtonLoading(true);
            }

            const res = await fetch(`http://localhost:5000/questions/${userData?.email}?skip=${skip}&limit=10`);
            const questions = await res.json();

            if (questions.length > 0) {
                setAllQuestions((prev) => {
                    const newQuestions = questions.filter((newQuestion: any) =>
                        !prev.some((existingQuestion: any) => existingQuestion._id === newQuestion._id)
                    );
                    return [...prev, ...newQuestions];
                });
                setSkip(skip + 10);
            }

            if (questions.length < 10) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching questions:", error);
        } finally {
            setIsSkeletonLoading(false);
            setIsButtonLoading(false);
        }
    };

    const loadMoreQuestions = () => {
        if (hasMore) {
            fetchQuestions();
        }
    };

    useEffect(() => {
        if (userData?.email) {
            fetchQuestions();
        }
    }, [userData?.email]);

    useEffect(() => {
        setIsDataALoading(true);
        fetch(`http://localhost:5000/answers/${userData?.email}`)
            .then(res => res.json())
            .then(data => setAllAnswers(data))
        setIsDataALoading(false);
    }, [userData?.email]);

    useEffect(() => {
        setIsDataQLoading(true);
        fetch(`http://localhost:5000/single-user-all-questions/${userData?.email}`)
            .then(res => res.json())
            .then(data => setAllUserQuestion(data))
        setIsDataQLoading(false);
    }, [userData?.email]);

    return (
        <main className="px-0 lg:pl-6">
            <img src={`${sectionBg}`} alt="" className="rounded-lg h-44 w-full object-cover object-right-bottom" />
            <section className="-mt-[65px] px-5 flex flex-col sm:flex-row gap-5 justify-between">
                <div>
                    <img className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-white bg-white relative" src={userData?.imgURL || notUser} alt="" />
                    <div>
                        <h2 className="text-[22px] md:text-2xl font-medium text-gray-700 mt-2">{userData?.name}</h2>
                        <p className="text-gray-500 mb-1">@{userData?.username}</p>
                        <p className="text-gray-500 text-sm">{userData?.country}</p>
                    </div>
                </div>

                <ul className="flex items-center gap-2">
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.facebookURL} target="_blank"><BsFacebook size={25} /></a></li>
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.githubURL} target="_blank"><BsGithub size={25} /></a></li>
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.twitterURL} target="_blank"><AiFillTwitterCircle size={30} /></a></li>
                    <li><a className="text-gray-600 hover:text-[#02B1FC] duration-300" href={userData?.portfolioURL} target="_blank"><TbWorldLongitude size={28} /></a></li>
                </ul>
            </section>
            <div className="mt-8">
                <h2 className="text-2xl font-medium text-gray-700">About</h2>
                <p className="mt-1 text-gray-500">{userData?.aboutMe || 'N/A'}</p>
            </div>
            <section className="mt-8 grid md:grid-cols-2 gap-5">
                <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex gap-5">
                        <div className="grid bg-gray-50 p-4 rounded-lg"><TbMessageQuestion size={24} /><span className="text-sm font-medium text-gray-400 mt-1 whitespace-nowrap">Total Questions</span>
                            <span className="text-xl font-bold text-gray-700">{
                                isDataQLoading ? (
                                    <div className="animate-pulse mt-2">
                                        <progress className="progress w-11 h-7 rounded-md" value={0} max="100"></progress>
                                    </div>
                                ) : (
                                    allUserQuestion?.length || 0
                                )
                            }</span>
                        </div>
                        <div className="grid bg-gray-50 p-4 rounded-lg"><IoChatbubbleEllipsesOutline size={24} /><span className="text-sm font-medium text-gray-400 mt-1 whitespace-nowrap">Total Answers</span>
                            <span className="text-xl font-bold text-gray-700">{
                                isDataALoading ? (
                                    <div className="animate-pulse mt-2">
                                        <progress className="progress w-11 h-7 rounded-md" value={0} max="100"></progress>
                                    </div>
                                ) : (
                                    allAnswers?.length
                                )
                            }</span>
                        </div>
                    </div>
                    {
                        allUserQuestion?.length > 5 &&
                        <div>
                            <h3 className="text-xl font-medium mb-3">Badges</h3>
                            <ul className="flex gap-4">
                                {allUserQuestion?.length >= 5 &&

                                    <li className="text-center">
                                        <img className="w-14 h-14 max-w-[56px] max-h-[56px] object-fill" src={b2} alt="" />
                                        <small className="font-medium text-gray-400">L1</small>
                                    </li>
                                }
                                {allUserQuestion?.length >= 10 &&

                                    <li className="text-center">
                                        <img className="w-14 h-14 max-w-[56px] max-h-[56px] object-fill" src={b3} alt="" />
                                        <small className="font-medium text-gray-400">L2</small>
                                    </li>
                                }
                                {allUserQuestion?.length >= 20 &&

                                    <li className="text-center">
                                        <img className="w-14 h-14 max-w-[56px] max-h-[56px] object-fill" src={b4} alt="" />
                                        <small className="font-medium text-gray-400">Top</small>
                                    </li>
                                }
                            </ul>
                        </div>
                    }
                </div>
            </section>

            <section>
                <h2 className="mt-6 text-2xl font-medium mb-2">Questions</h2>
                <div className="mt-5">
                    {
                        isSkeletonLoading ? (
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
                            allQuestions.length > 0 ? (
                                allQuestions.map(question => (
                                    <Link key={question._id} to={`/news-feed/${question._id}`}>
                                        <p className="border-b flex items-start gap-2 py-2 text-lg text-gray-500 hover:text-[#33B89F] cursor-pointer duration-200 font-normal">
                                            <span><RiQuestionAnswerLine size={24} /></span> {question?.title}
                                        </p>
                                    </Link>
                                ))
                            ) : (
                                <div className="flex justify-center">
                                    <p className="text-sm mt-4 text-gray-500 text-center">
                                        <img className="w-40 mx-auto" src={storage} alt="" />
                                        <span>Just getting started? Try answering a question!</span>
                                        <span className="w-full md:w-96 mt-3 block">
                                            Your most helpful questions, answers, and tags will appear here. Start by
                                            <Link to='/ask-question'>
                                                <span className="ml-1 text-color-second cursor-pointer">answering a question</span>
                                            </Link> or selecting tags that match topics you’re interested in.
                                        </span>
                                    </p>
                                </div>
                            ))
                    }
                    {!hasMore && !isSkeletonLoading && (
                        <p className="text-gray-500 font-medium text-lg mt-10 text-center">No questions here.</p>
                    )}
                    {!isSkeletonLoading && hasMore && allQuestions.length > 0 && (
                        <div className="text-center mt-10">
                            <Button
                                label="Load More"
                                disabled={isButtonLoading}
                                loading={isButtonLoading}
                                className='max-w-[250px] cs-button'
                                onClick={loadMoreQuestions}
                            />
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
};

export default SingleUser;