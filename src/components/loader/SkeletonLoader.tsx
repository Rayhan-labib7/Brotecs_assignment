import React from 'react';
import Skeleton from './Skeleton';
import { useTheme } from '../../ContextProvider/ThemeContext';

interface BlogPageSkeletonProps {
    name?: string;
}

const SkeletonLoader: React.FC<BlogPageSkeletonProps> = () => {
    const { isDarkMode } = useTheme(); // Get the current theme from context

    return (
        <div className="px-10">
            <div className="pt-20 flex justify-between">
                <div className="flex gap-8">
                    <Skeleton
                        rows={1}
                        height="3rem"
                        width="150px"
                        className={`rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                    />
                    <Skeleton
                        rows={1}
                        height="3rem"
                        width="250px"
                        className={`rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                    />
                </div>
                <Skeleton
                    rows={1}
                    height="3rem"
                    width="150px"
                    className={`rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                />
            </div>
            <div className="py-10">
                <Skeleton
                    rows={1}
                    height="2rem"
                    width="100%"
                    className={`rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                />
                <div className="py-4" />
                <Skeleton
                    rows={1}
                    height="2rem"
                    width="100%"
                    className={`rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                />
                <Skeleton
                    rows={5}
                    height="2rem"
                    width="100%"
                    className={`py-10 rounded-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
                />

            </div>
        </div>
    );
};

export default SkeletonLoader;
