const Login = () => {
    return (
        <>
            <div id="login-page-container" className="w-screen h-screen flex justify-center items-center bg-slate-400">
                <div id="form-container" className="w-[30%] h-[30%] bg-white flex justify-center items-center">
                    <form action="" className="flex flex-col gap-4 justify-center w-[100%] h-[100%] p-5">
                        <h1 className="text-center">Login</h1>
                        <div id="email-input-container" className="flex flex-col text-start">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="" id="" className="border" />
                        </div>
                        <div id="password-input-container" className="flex flex-col text-start">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="border" />
                        </div>
                        <div id="submit-button-container" className="flex justify-center">
                            <button type="submit" className="bg-blue-600 text-white w-[100px] p-2">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login