import LoginBox from "../components/LoginBox";

function AuthPage() {
  return (
    <div className="bg-white dark:bg-blue-950 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to the Login Portal
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Please log in using your email and select your role: Student, Instructor, or Admin.
      </p>
      <LoginBox />
    </div>
  );
}

export default AuthPage;
