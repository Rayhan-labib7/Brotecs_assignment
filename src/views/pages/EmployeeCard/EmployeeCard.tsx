import { useEffect, useState } from 'react';
import { useEmployee } from '../../../ContextProvider/EmployeeProvider';

const EmployeeCard = () => {
    const { employees } = useEmployee();
    const [loading, setLoading] = useState(true); // State to manage loading

    // Simulate loading for 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // 1 second delay

        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="w-full rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative group"
          >
            {/* Spinner Loader */}
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 z-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            )}
      
            {/* Profile Picture */}
            <div className="flex justify-center p-6 relative">
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg group-hover:border-purple-500 transition-all duration-300"
                src={employee.profilePicture}
                alt="Profile"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-full w-32 h-32 transition-all duration-300"></div>
            </div>
      
            {/* Employee Details */}
            <div className="px-6 py-4 text-center">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-purple-600 transition-all duration-300">
                {employee.firstName}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 group-hover:text-gray-800 transition-all duration-300">
                {employee.email}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 group-hover:text-gray-800 transition-all duration-300">
                {employee.phone}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm group-hover:text-gray-800 transition-all duration-300">
                {employee.address}
              </p>
            </div>
      
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-all duration-300"></div>
          </div>
        ))}
      </div>
      
    );
};

export default EmployeeCard;