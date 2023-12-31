import { Alert, Modal } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { ActionBtn } from "..";
import { useState } from "react";
import "./confirmModal.css";
import { scrollBackToTop } from "@/core/functions/scrollToTop";
import {setAlert, setMessage} from "@/core/global/context/notiSlice.js";
import {useDispatch} from "react-redux";

const ConfirmationModal = ({ event, type, }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async () => {
        try {
            setIsSubmitting(true)
            const { data, error: apiError } = await event();
            if (data?.success) {
                closeModal()
                dispatch(setMessage({msgType : "success", msgContent : data?.message}))
            } else {
                dispatch(setMessage({msgType: "error", msgContent: apiError?.data?.message || apiError?.error }))
            }
        } catch (error) {
            throw new Error(error);
        } finally {
            setIsSubmitting(false)
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setError(null);
        scrollBackToTop();
        setIsSubmitting(false);
    };

    return (
        <section>
            <ActionBtn
                actionFor="delete"
                label={"Delete"}
                event={() => setOpenModal(true)}
            />
            <Modal
                open={openModal}
                closeIcon={false}
                centered
                okText="Delete"
                okButtonProps={{
                    type: "primary",
                    className: "delete-btn",
                    loading: isSubmitting,
                }}
                cancelButtonProps={{
                    type: "default",
                    className: "cancel-btn",
                }}
                onOk={onSubmit}
                onCancel={closeModal}
                className="confirm-box"
                width={""}
            >
                {error !== null ? (
                    <Alert
                        message={error}
                        type="error"
                        showIcon
                        className="w-full mb-3"
                    />
                ) : (
                    ""
                )}
                <div className="flex flex-row items-center justify-center gap-4 pb-6">
                    <BsExclamationCircle className="text-2xl text-[#FAAD14] min-w-max  " />
                    <h2 className="font-medium text-base">
                        {" "}
                        Are you sure you want to delete this {type} ?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default ConfirmationModal;
