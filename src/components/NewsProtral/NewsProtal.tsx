import React from 'react';
import Marquee from "react-fast-marquee";

const NewsProtal = () => {
    return (
        <div>
            
            <div className='d-flex'>
                <button className='text-amber-400'>Latest</button>
                <Marquee className='text-danger ' speed={100}>
                    {/* I can be a React component, multiple React components, or just some text......     I can be a React component, multiple React components, or just some text. */}
                    <img className='w-25'  src="https://i.ibb.co/dWxGM6j/images-3.png" alt="" />
                    <img className='w-25 ' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25'  src="https://i.ibb.co/dWxGM6j/images-3.png" alt="" />
                    <img className='w-25 ' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25'  src="https://i.ibb.co/dWxGM6j/images-3.png" alt="" />
                    <img className='w-25 ' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25'  src="https://i.ibb.co/dWxGM6j/images-3.png" alt="" />
                    <img className='w-25 ' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25'  src="https://i.ibb.co/dWxGM6j/images-3.png" alt="" />
                    <img className='w-25 ' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                    <img className='w-25' src=" https://i.ibb.co/v4ZH10M/images-1.png" alt="" />
                </Marquee>
            </div>




        </div>
    );
};

export default NewsProtal;