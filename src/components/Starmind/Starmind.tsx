import React from 'react';

const Starmind = () => {
    return (
        <div>
            <div className='w-full py-[10rem] px-4 bg-white'>
                <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>



                    <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                        <img className='w-24 mx-auto mt-2' src="https://i.ibb.co/v4ZH10M/images-1.png" alt="/" />
                        <p className='text-center text-2xl text-blue-700'>Accelerate our R&D <br /> Development cycle</p>
                        <p className="text-center mt-3 tracking-wide">Apply existing knowledge <br /> dynamically to new problem in <br /> real time. </p>
                    </div>


                    <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                        <img className='w-20 mx-auto mt-3 ' src="https://i.ibb.co/fdswGVp/image-2.png" alt="/" />
                        <p className='text-center text-2xl text-blue-700 mt-2'>Improve business<br />agility</p>
                        <p className="text-center mt-3 tracking-wide">Stengthen connection among <br /> experts across your entrie <br /> opportunities for grouth. </p>

                    </div>



                    <div className='w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
                        <img className='w-20 mx-auto mt-3 h-20' src="https://i.ibb.co/dWxGM6j/images-3.png" alt="/" />
                        <p className='text-center text-2xl text-blue-700 mt-2'>Get the benefits of AI <br />with less risk</p>
                        <p className="text-center mt-3 tracking-wide">Enterprise-grade tech <br /> accelerates knowledge sharing  <br /> your organization IP.</p>
                    </div>




                </div>
            </div>
        </div>
    );
};

export default Starmind;

