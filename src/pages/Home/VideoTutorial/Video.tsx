import React, { useState, createRef, RefObject } from 'react';
import img1 from '../VideoTutorial/videos/meeting.png.jpg';
import video1 from '../VideoTutorial/videos/video2.png.mp4';
import './Video.css';

type VideoControl = 'PlayPause' | 'seek' | 'time' | 'volume' | 'fullscreen' | 'play' | 'fallback'; 

interface VideoData {
    id: number;
    poster: string;
    videoUri: string;
    
}

const ReactVideoGallery: React.FC = () => {
    const [model, setModel] = useState<boolean>(false);

    let data: VideoData[] = [
        {
            id: 1,
            poster: img1,
            videoUri: video1,
            
        },
    ];

    return (
        <>
            <div className="gallery">
                {data.map((item, index) => {
                    const divRef: RefObject<HTMLDivElement> = createRef();
                    const openModel = () => {
                        if (divRef.current) {
                            divRef.current.classList.remove('video');
                            divRef.current.classList.add('model');
                            setModel(true);
                        }
                    };
                    const closeModel = () => {
                        if (divRef.current) {
                            divRef.current.classList.add('video');
                            divRef.current.classList.remove('model');
                            setModel(false);
                        }
                    };

                    return (
                        <div ref={divRef} className="video" key={index}>
                            {model && (
                                <button className="model-close-btn" onClick={() => closeModel()}>
                                    
                                </button>
                            )}
                            <div className="video-container" onClick={() => openModel()}>
                                <video
                                    style={{ width: '100%' }}
                                    autoPlay={model}
                                    controls={['PlayPause', 'seek', 'time', 'volume', 'fullscreen', 'play', 'fallback'] as VideoControl[]}
                                    poster={item.poster}
                                >
                                    <source src={item.videoUri} type="video/webm" />
                                </video>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ReactVideoGallery;
