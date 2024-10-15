import { useEffect, useState, useContext } from "react";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { TbMessageCircleQuestion, TbWorldLongitude } from "react-icons/tb";
import { AuthContext } from "../../Provider/AuthProvider";
import b2 from '../../assets/badges/l1.png'
import b3 from '../../assets/badges/l2.png'
import b4 from '../../assets/badges/top.png'
import { Skeleton } from "primereact/skeleton";
import { Chart } from "primereact/chart";
import { useQuery } from "@tanstack/react-query";
import { BsFacebook, BsGithub } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";

interface QuestionData {
    _id: '',
    title: '',
    uploadDate: '',
}

const ProfileDashboard = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    const [isDataQLoading, setIsDataQLoading] = useState<boolean>(true);
    const [allUserQuestion, setAllUserQuestion] = useState<QuestionData[]>([]);
    const [allAnswers, setAllAnswers] = useState<number[]>([]);
    const [allLengthQuestion, setLengthQuestion] = useState<QuestionData[]>([]);
    const [allLengthAnswers, setLengthAnswers] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const authContext = useContext(AuthContext);
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    const { data: userData = [] } = useQuery([user?.email], async () => {
        const res = await fetch(`http://localhost:5000/user?email=${user?.email}`);
        const data = await res.json();
        return data;
    });

    const calculateMonthlyQuestionCount = (data: QuestionData[]) => {
        const monthlyQuestionCount = new Array(12).fill(0);
        data.forEach((question: QuestionData) => {
            const dateParts = question.uploadDate.split('/');
            const month = parseInt(dateParts[0], 10) - 1;
            monthlyQuestionCount[month]++;
        });
        return monthlyQuestionCount;
    };

    const calculateMonthlyAnswerCount = (data: { uploadDate: string }[]) => {
        const monthlyAnswerCount = new Array(12).fill(0);
        data.forEach((answer) => {
            const date = new Date(answer.uploadDate);
            const month = date.getMonth();
            monthlyAnswerCount[month]++;
        });
        return monthlyAnswerCount;
    };

    useEffect(() => {
        setIsDataQLoading(true);
        fetch(`http://localhost:5000/single-user-all-questions/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                const questionCount = calculateMonthlyQuestionCount(data?.questions);
                setAllUserQuestion(questionCount);
                setLengthQuestion(data?.questions);
            })
        setIsDataQLoading(false);
    }, [user?.email]);

    useEffect(() => {
        fetch(`http://localhost:5000/answers/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                const answerCount = calculateMonthlyAnswerCount(data);
                setAllAnswers(answerCount);
                setLengthAnswers(data);
            })
    }, [user?.email]);

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Questions',
                    data: allUserQuestion,
                    fill: false,
                    borderColor: '#33b89f',
                    tension: 0.4
                },
                {
                    label: 'Answers',
                    data: allAnswers,
                    fill: false,
                    borderColor: '#02b1fc',
                    tension: 0.4
                }
            ]
        };

        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        setChartData(data);
        setChartOptions(options);
    }, [allUserQuestion, allAnswers]);

    return (
        <main>
            <section className="grid md:grid-cols-3 gap-5">
                <div className=" rounded-lg p-6 flex gap-3 items-center bg-yellow-50">
                    <span className="bg-orange-100 text-gray-700 p-3 rounded-full"><TbMessageCircleQuestion size={45} /></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Questions</h5>
                        <p className="text-2xl font-semibold">{allLengthQuestion?.length || 0}</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 flex gap-3 items-center bg-purple-50">
                    <span className="bg-purple-100 text-gray-700 p-3 rounded-full"><MdOutlineQuestionAnswer size={45} /></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Answers</h5>
                        <p className="text-2xl font-semibold">{allLengthAnswers?.length || 0}</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 bg-slate-50">
                    <h5 className="text-xl font-medium text-gray-600">Earn Level's</h5>
                    <ul className="flex gap-4 mt-1">
                        {isDataQLoading ? (
                            <>
                                <Skeleton height="3rem" width="3rem"></Skeleton>
                                <Skeleton height="3rem" width="3rem"></Skeleton>
                                <Skeleton height="3rem" width="3rem"></Skeleton>
                            </>
                        ) : (
                            <>
                                {allLengthQuestion?.length >= 5 && (
                                    <img className="w-12 h-12" src={b2} alt="" />
                                )}
                                {allLengthQuestion?.length >= 10 && (
                                    <img className="w-12 h-12" src={b3} alt="" />
                                )}
                                {allLengthQuestion?.length >= 20 && (
                                    <img className="w-12 h-12" src={b4} alt="" />
                                )}
                                {allLengthQuestion?.length < 5 && <><p className="text-sm text-gray-400">You have no level.</p></>}
                            </>
                        )}
                    </ul>

                </div>
            </section>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="col-span-1 md:col-span-3">
                    <Chart type="line" data={chartData} options={chartOptions} />
                </div>

                <div className="col-span-1 md:col-span-2 mt-5 md:mt-0">
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className='text-gray-800 font-medium text-xl mb-4'>Personal Information</h3>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
                            <div className="col-span-2">
                                <span className="text-gray-400 text-sm">Email</span>
                                <p className=" text-gray-600 text-sm font-medium word-break">{userData?.email}</p>
                            </div>
                            <div>
                                <span className="text-gray-400 text-sm">Your Age</span>
                                <p className=" text-gray-600 text-sm font-medium">{userData?.age || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-gray-400 text-sm">Gender</span>
                                <p className=" text-gray-600 text-sm font-medium">{userData?.gender || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-gray-400 text-sm">Country</span>
                                <p className=" text-gray-600 text-sm font-medium">{userData?.country || 'N/A'}</p>
                            </div>
                            <div>
                                <span className="text-gray-400 text-sm">City</span>
                                <p className=" text-gray-600 text-sm font-medium">{userData?.city || 'N/A'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg mt-5">
                        <h3 className='text-gray-800 font-medium text-xl mb-1'>About</h3>
                        <p className="text-sm text-gray-500 word-break">{userData?.aboutMe || 'N/A'}</p>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg mt-5">
                        <h3 className='text-gray-800 font-medium text-xl mb-2'>Social Account</h3>
                        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 font-medium">
                            <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.facebookURL}><BsFacebook size={25} /> Facebook</a></li>
                            <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.githubURL}><BsGithub size={25} /> Github</a></li>
                            <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.twitterURL}><AiFillTwitterCircle size={30} /> Twitter</a></li>
                            <li><a className="text-gray-600 hover:text-[#33B89F] duration-300 flex items-center gap-1" href={userData?.portfolioURL}><TbWorldLongitude size={28} /> Portfolio</a></li>
                        </ul>
                    </div>

                    <div className="p-4 bg-gray-100 rounded-lg mt-5">
                        <h3 className='text-gray-800 font-medium text-xl'>Skills</h3>
                        <div className="mt-1 flex flex-wrap items-center gap-3">
                            {userData?.selected ?
                                userData?.selected?.map((skill: any, index: number) => <p key={index} className="bg-[#dae8e5] inline-block py-1 px-3 rounded-lg text-sm text-gray-600">{skill}</p>)
                                :
                                <p className="text-sm text-gray-500 font-medium">N/A</p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProfileDashboard;