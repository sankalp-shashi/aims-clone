const EmailLoginBox = (props) => {
    return (
        <div>
            <div id="EmailLoginBox" className="p-19 justify-center items-center flex flex-col space-y-4">
                {/* Email Input */}
                <input
                    type="email"
                    className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Email"
                    value={props.email}
                    onChange={(e) => props.setEmail(e.target.value)} // Update email state
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            document.getElementById("otpInput").focus(); // Focus OTP input
                        }
                    }}
                />

                {/* OTP Input */}
                <input
                    id="otpInput" // Add ID for easy focus management
                    type="text"
                    className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    placeholder="Enter OTP"
                    value={props.enteredOTP} // Bind enteredOTP state
                    onChange={(e) => props.setEnteredOTP(e.target.value)} // Update enteredOTP state
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            props.onLoginClick(); // Trigger login on Enter
                        }
                    }}
                />

                {/* Dropdown for Role Selection */}
                <select
                    className="bg-gray-800 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={props.role}
                    onChange={(e) => props.setRole(e.target.value)} // Update role state
                >
                    <option value="" disabled>Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Instructor">Instructor</option>
                    <option value="Admin">Admin</option>
                </select>

                {/* Login Button */}
                <button
                    className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    onClick={props.onLoginClick}
                >
                    Login
                </button>

                {/* Send OTP Button */}
                <button
                    onClick={props.onSendOTPClick}
                    className="bg-indigo-600 text-white rounded-md px-4 py-2 mt-4 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    Send OTP
                </button>

                {/* Error Message */}
                {props.error && <div className="text-red-500 mt-4">{props.error}</div>}
            </div>
        </div>
    );
};

export default EmailLoginBox;
