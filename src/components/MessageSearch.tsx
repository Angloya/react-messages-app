interface MessageSearchProps {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    text: string
}

const MessageSearch = ({ onChange, text }: MessageSearchProps) => {
    return (
        <div className="relative mb-2">
            <div className="absolute top-4 left-0 flex items-center ps-3 pointer-events-none">
                <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20">
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <input
                value={text}
                onChange={onChange}
                type="search"
                id="default-search"
                className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search ..." />
        </div>
    );
};
export default MessageSearch;