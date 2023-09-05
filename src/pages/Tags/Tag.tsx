import { useState, useEffect } from "react";
import { MdUnfoldMore } from "react-icons/md";
import './Tags.css'
import { useLoaderData, useLocation } from "react-router-dom";
import QueCard from "../../components/QueCard";

interface Question {
  _id: string;
  body: string;
  title: string;
  selected: string[];
}
const Tag = () => {
  const allQuestions = useLoaderData() as Question[];
  const [tagQuestions, setTagQuestions] = useState<Question[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramValue = searchParams.get('tag');
  useEffect(() => {

    const filtered = allQuestions.filter((question) =>
      question.selected.includes(paramValue));
    setTagQuestions(filtered);

  }, [paramValue, allQuestions]);

  return (
    <div className='container'>
      <h2 className='tags-h2 text-3xl'>Tags</h2>
      <p className='tags-p mt-7'>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question..</p>
      <div>
        {
        tagQuestions.map((que) => (<QueCard 
        question={que} key={que._id} />
        ))}
      </div>

      <div className="mt-10"><button className="bg-button mx-auto">Load More <MdUnfoldMore size={20} /></button></div>
    </div>
  );
};

export default Tag;