import { useEffect, useState, useContext } from "react";
import { LuVote } from "react-icons/lu";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { TbMessageCircleQuestion } from "react-icons/tb";
import { AuthContext } from "../../Provider/AuthProvider";
import chart from '../../assets/others/chart.png';
import b1 from '../../assets/badges/entry.png'
import b2 from '../../assets/badges/l1.png'
import b3 from '../../assets/badges/l2.png'
import b4 from '../../assets/badges/top.png'

interface QuestionData {
    _id: '',
    title: '',
}

const Summery = () => {
    const [allQuestions, setAllQuestions] = useState<QuestionData[]>([]);
    const [allAnswers, setAllAnswers] = useState([]);
    const authContext = useContext(AuthContext)
    if (!authContext) {
        return <p>Loading...</p>;
    }
    const { user } = authContext;

    useEffect(() => {
        fetch(`http://localhost:5000/questions/${user?.email}`)
            .then(res => res.json())
            .then(data => setAllQuestions(data))
    }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/answers/${user?.email}`)
            .then(res => res.json())
            .then(data => setAllAnswers(data))
    }, [])    

    return (
        <main>
            <section className="grid md:grid-cols-3 gap-8">
                <div className="rounded-lg p-6 flex gap-3 items-center bg-slate-50">
                    <span className="bg-indigo-100 text-gray-700 p-3 rounded-full"><LuVote size={45} /></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Votes</h5>
                        <p className="text-2xl font-semibold">220</p>
                    </div>
                </div>
                <div className=" rounded-lg p-6 flex gap-3 items-center bg-yellow-50">
                    <span className="bg-orange-100 text-gray-700 p-3 rounded-full"><TbMessageCircleQuestion size={45} /></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Questions</h5>
                        <p className="text-2xl font-semibold">{allQuestions?.length}</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 flex gap-3 items-center bg-purple-50">
                    <span className="bg-purple-100 text-gray-700 p-3 rounded-full"><MdOutlineQuestionAnswer size={45} /></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Answers</h5>
                        <p className="text-2xl font-semibold">{allAnswers?.length}</p>
                    </div>
                </div>
            </section>
            <section className="grid lg:grid-cols-3 mt-8 gap-8">
                <div className="md:col-span-2">
                    <img className="w-full shadow" src={chart} alt="" />
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-xl font-medium mb-6">Your Badges</h3>
                    <ul className="flex flex-wrap gap-4">
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b1} alt="" /><small className="font-medium text-gray-400">Entry</small></li>
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b2} alt="" /><small className="font-medium text-gray-400">L1</small></li>
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b3} alt="" /><small className="font-medium text-gray-400">L2</small></li>
                        <li className="text-center"><img className="w-14 h-14 object-fill" src={b4} alt="" /><small className="font-medium text-gray-400">Top</small></li>
                    </ul>
                </div>
            </section>
        </main>
    );
};

export default Summery;