import { Alert, Modal } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import { ActionBtn } from "..";
import { useState } from "react";
import "./confirmModal.css";
import { scrollBackToTop } from "../../core/functions/scrollToTop";

const ConfirmationModal = ({ event, setMessage }) => {
    const [openModal, setOpenModal] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = async () => {
        try {
            const { data, error: apiError } = await event();
            console.log(apiError, data);
            if (data?.success) {
                setMessage(data?.message);
            } else {
                setError(apiError?.data?.message || apiError?.error);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const closeModal = () => {
        setError(null);
        setOpenModal(false);
        scrollBackToTop();
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
                okText="Confirm"
                okButtonProps={{
                    type: "primary",
                    className: "delete-btn",
                }}
                cancelButtonProps={{
                    type: "default",
                    className: "cancel-btn",
                }}
                onOk={onSubmit}
                onCancel={closeModal}
                className="confirm-box"
                width={440}
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
                <div className="flex flex-row items-center justify-center gap-2 pb-6">
                    <BsExclamationCircle className="text-xl text-yellow-500" />
                    <h2 className="text-lg font-medium">
                        {" "}
                        Are you sure you want to delete this ?{" "}
                    </h2>
                </div>
            </Modal>
        </section>
    );
};

export default ConfirmationModal;