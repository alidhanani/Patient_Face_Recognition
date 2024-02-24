import { DefaultSidebar } from '../component/Sidebar';
// Homepage component with toggleable sidebar
const Homepage = () => {

  return (
    <div className="flex h-screen">
      <DefaultSidebar />
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Patient Website</h1>
      </div>
    </div>
  );
};

export default Homepage;
