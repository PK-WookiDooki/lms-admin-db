import { Alert, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { useLoginAccountMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "./authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FormTlt, FormSubmitBtn } from "@/components";
import imgBg from "../../assets/imgs/img_login.png";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { setMessage } from "../../core/global/context/notiSlice";

const Login = () => {
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        if (error !== null) {
            setTimeout(() => {
                setError(null);
            }, 5000);
        }
    }, [error]);

    const [loginAccount] = useLoginAccountMutation();

    const onFinish = async (values) => {
        try {
            setIsSubmitting(true);
            const { data, error: apiError } = await loginAccount(values);
            if (data?.accessToken) {
                setIsSubmitting(false);
                Cookies.set("token", data?.accessToken, { expires: 1 });
                dispatch(
                    setLoginStatus({
                        token: data?.accessToken,
                    })
                );
                nav("/");
                dispatch(
                    setMessage({
                        msgType: "success",
                        msgContent: "Login successful!",
                    })
                );
            } else {
                setIsSubmitting(false);
                setError(apiError?.data?.message || apiError?.error);
                dispatch(
                    setMessage({
                        msgType: "error",
                        msgContent: error?.data?.message || error?.error,
                    })
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-lightBlue ">
            <div className="flex items-center justify-center w-full gap-32">
                <img src={imgBg} alt="Login Image" />
                <div className=" self-stretch w-full max-w-[1px] bg-black/30"></div>
                <div className="max-w-[480px] w-full p-10 rounded-md shadow-md shadow-[#8FB5FF] bg-white">
                    <div className="mb-8 text-darkBlue ">
                        <h2 className="text-3xl font-bold flex items-center gap-2 justify-center mb-5">
                            {" "}
                            <MdOutlineLocalLibrary className="text-[42px]" />{" "}
                            LIBRARY
                        </h2>
                        <p className="text-center">
                            The library is your gateway to a universe of ideas
                            and inspiration.
                        </p>
                    </div>

                    <FormTlt isCenter={true} title={"Login"} />
                    <Form
                        form={form}
                        onFinish={onFinish}
                        layout="vertical"
                        labelCol={{
                            style: {
                                textAlign: "left",
                            },
                        }}
                        className="mt-5"
                    >
                        {error ? (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                className="mb-3"
                            />
                        ) : (
                            ""
                        )}
                        <Form.Item
                            label="Username"
                            name="username"
                            className=" !mb-6 "
                            rules={[
                                {
                                    required: true,
                                    message: "Username is required!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Password is required!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Link
                            to={"/resetPassword"}
                            className="text-blue-600 block ml-auto w-fit mb-8 underline underline-offset-2 hover:underline hover:underline-offset-2"
                        >
                            {" "}
                            Forgot Password?{" "}
                        </Link>

                        <FormSubmitBtn
                            label={"login"}
                            isFullWidth={true}
                            isSubmitting={isSubmitting}
                        />
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Login;