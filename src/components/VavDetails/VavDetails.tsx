import { AiOutlineEye } from "react-icons/ai";
import { PiChatsCircleBold } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import { BiLike } from "react-icons/bi";
import { useEffect, useState } from "react";

interface Question {
  email: any;
  username: '';
  name: '';
  _id: string;
  body: string;
  title: string;
  selected: string[];
  uploadTime: '';
  uploadDate: '';
  likes: [];
}

interface Votes {
  QuestionsVote: any[];
}

const VavDetails = ({ question }: { question: Question }) => {
  const [votes, setVotes] = useState<Votes | undefined>(undefined);

  const { data: totalAnswers = [] } = useQuery([question?._id], async () => {
    const res = await fetch(`http://localhost:5000/answer/${question?._id}`);
    const data = await res.json();
    return data;
  });

  const { data: questionDetails } = useQuery(
    ["questionDetails", question?._id],
    async () => {
      const res = await fetch(`http://localhost:5000/question-details/${question?._id}`);
      const data = await res.json();
      return data;
    },
  );

  useEffect(() => {
    setVotes(questionDetails);
  }, [questionDetails]);

  const formatNumber = (number: number) => {
    if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
    if (number >= 1000) return (number / 1000).toFixed(1) + 'k';
    return number;
  };

  return (
    <div className="flex items-center justify-center gap-10 mt-6 md:mt-0">
      <ul className="text-center">
        <li>{formatNumber(votes?.QuestionsVote?.length || 0)}</li>
        <li className="text-gray-600 my-1">votes</li>
        <li className="grid justify-center text-gray-600"><BiLike /></li>
      </ul>
      <ul className="text-center">
        <li>{formatNumber(totalAnswers?.length || 0)}</li>
        <li className="text-gray-600 my-1">answers</li>
        <li className="grid justify-center text-gray-600"><PiChatsCircleBold /></li>
      </ul>
      <ul className="text-center">
        <li>{formatNumber(questionDetails?.totalViews || 0)}</li>
        <li className="text-gray-600 my-1">views</li>
        <li className="grid justify-center text-gray-600"><AiOutlineEye /></li>
      </ul>
    </div>
  );
};

export default VavDetails;