import { useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import { MdUnfoldMore } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import './NewsFeed.css';
import QueCard from "../../components/QueCard";

interface Question {
    _id: string;
    body: string;
    title: string;
    selected: string[];
}

const NewsFeed = () => {
    const allQuestions = useLoaderData() as Question[];
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

    const handleTagSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = event.target.value;
        setSelectedTag(selected);
      };

      useEffect(() => {
        if (selectedTag === '') {
          setFilteredQuestions(allQuestions);
        } else {
          const filtered = allQuestions.filter((question) =>
            question.selected.includes(selectedTag)
          );
          setFilteredQuestions(filtered);
        }
      }, [selectedTag, allQuestions]);
    
    return (
        <main className="px-0 lg:pl-6">
            <section className="md:flex justify-between items-end bg-purple-50 p-5 rounded-lg">
                <div>
                    <span className='bg-indigo-50 px-5 py-2 text-color rounded-md font-medium'>Questions</span>
                    <h2 className='text-2xl font-medium text-gray-800 mt-4 mb-4 md:mb-0'>Ask A Public Question For Solve Your Issus</h2>
                </div>
                <div>
                    <Link to='/main/ask-question'><button className="bg-button">Ask Question <BsQuestionCircle /></button></Link>
                </div>
            </section>
            <div id="box" className="mt-2 flex justify-between items-center gap-3">
                <h4 className="text-3xl font-semibold">Filtering by topic: </h4>
            <select onChange={handleTagSelect} value={selectedTag} name="tag">
                <option value="">All</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="react">React</option>
                <option value="javascript">JavaScript</option>
            </select>
            </div>

            <section className="mt-6">
                {
                    filteredQuestions?.map(question => <QueCard key={question?._id} question={question}/>)
                }
                <div className="mt-10"><button className="bg-button mx-auto">Load More <MdUnfoldMore size={20} /></button></div>
            </section>
        </main>
    );
};

export default NewsFeed;