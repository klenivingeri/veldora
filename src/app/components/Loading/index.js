export const Loading = ({color ='gray-100'}) => (
  <div className="flex justify-center items-center h-4">
    <div className={`w-4 h-4 border-2 border-${color} border-solid border-t-transparent rounded-full animate-spin`}></div>
  </div>
);
