import { LuVote } from "react-icons/lu";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import { TbMessageCircleQuestion } from "react-icons/tb";

const Summery = () => {
    return (
        <main>
            <section className="grid md:grid-cols-3 gap-8">
                <div className="rounded-lg p-6 flex gap-3 items-center shadow-md border-2 border-dashed border-indigo-200">
                    <span className="bg-indigo-50 p-3 rounded-full"><LuVote size={45}/></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Votes</h5>
                        <p className="text-2xl font-semibold">220</p>
                    </div>
                </div>
                <div className=" rounded-lg p-6 flex gap-3 items-center shadow-md border-2 border-dashed border-indigo-200">
                    <span className="bg-orange-50 p-3 rounded-full"><TbMessageCircleQuestion size={45}/></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Questions</h5>
                        <p className="text-2xl font-semibold">110</p>
                    </div>
                </div>
                <div className="rounded-lg p-6 flex gap-3 items-center shadow-md border-2 border-dashed border-indigo-200">
                    <span className="bg-purple-50 p-3 rounded-full"><MdOutlineQuestionAnswer size={45}/></span>
                    <div>
                        <h5 className="font-medium text-gray-600">Total Answers</h5>
                        <p className="text-2xl font-semibold">156</p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Summery;