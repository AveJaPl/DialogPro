const BouncingDotsLoader = () => {
    return (
        <div className="flex p-2 items-center">
            <div className="flex space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce200"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce400"></div>
            </div>
        </div>
    );
};

export default BouncingDotsLoader;
