import './loading.css'

const Loading = () => {
    return (
        <main className="container loading-container">
            <div className="coast">
                <div className="wave-rel-wrap">
                    <div className="wave"></div>
                </div>
            </div>
            <div className="coast delay">
                <div className="wave-rel-wrap">
                    <div className="wave delay"></div>
                </div>
            </div>
            <div className="text text-w">C</div>
            <div className="text text-o">O</div>
            <div className="text text-d">D</div>
            <div className="text text-e">E</div>
            <div className="text text-s">S</div>
            <div className="text text-t">T</div>
            <div className="text text-a">A</div>
            <div className="text text-k">K</div>
        </main>
    );
};

export default Loading;