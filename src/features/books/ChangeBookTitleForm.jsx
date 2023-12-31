import { Input, Modal, Form, Alert } from "antd";
import { useEffect, useState } from "react";
import { ModalHeader, FormSubmitBtn } from "@/components";
import { useUpdateBookTitleMutation } from "./booksApi";
import { MdOutlineBorderColor} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import { scrollBackToTop } from "@/core/functions/scrollToTop";
import {setAlert, setMessage} from "@/core/global/context/notiSlice.js";

const ChangeBookTitleForm = ({ book }) => {
    const { token } = useSelector((state) => state.authSlice);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useDispatch()

    const [form] = Form.useForm();

    useEffect(() => {
        if (book) {
            form.setFieldValue("title", book?.title);
        }
    }, [openModal]);

    const [updateBookTitle] = useUpdateBookTitleMutation();
    const onFormSubmit = async (values) => {
        try {
            setIsSubmitting(true)
            const { data, error: apiError } = await updateBookTitle({
                title : values.title,
                bookId : book?.id,
                token,
            });
            if (data?.success) {
                dispatch(setMessage({msgType: "success", msgContent: data?.message}))
                closeModal();
            } else {
                dispatch(setMessage({msgType: "error", msgContent: apiError?.data?.message || apiError?.error }))
                setIsSubmitting(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setIsSubmitting(false)
        form.setFieldValue("title", book?.title);
        scrollBackToTop();
        setOpenModal(false);
    };

    return (
        <section className="flex items-center justify-center">
            <button
                type="button"
                className="text-lg text-darkBlue outline-none border-none"
                onClick={() => setOpenModal(true)}
            >
                <MdOutlineBorderColor/>
            </button>
            <Modal
                centered
                open={openModal}
                onCancel={closeModal}
                footer={null}
                width={480}
                className="form-modal"
                closeIcon={false}
            >
                <ModalHeader title={"Change Book Title"} event={closeModal} />

                <Form
                    form={form}
                    onFinish={onFormSubmit}
                    layout="vertical"
                    labelCol={{
                        style: {
                            textAlign: "left",
                        },
                    }}
                >
                    {error !== null ? (
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
                        label={"Book Title"}
                        name={"title"}
                        rules={[
                            {
                                required: true,
                                message: "Book title is required!",
                            },
                        ]}
                    >
                        <Input placeholder="Enter book title . . ." />
                    </Form.Item>
                    <FormSubmitBtn label={"Save"} isSubmitting={isSubmitting} />
                </Form>
            </Modal>
        </section>
    );
};

export default ChangeBookTitleForm;
