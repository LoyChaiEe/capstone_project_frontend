import React, { useState } from "react";
import { Modal } from "antd";
import GuideModalBody from "./GuideModalBody";
import "./guideModalButton.css";

export default function GuideModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showGuide = async () => {
    try {
      console.log("Open Guide");
    } catch (err) {
      console.log("ERROR", err);
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <button className="modal-close-button" onClick={() => showGuide()}>
        View guide
      </button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <GuideModalBody />
        <div className="modal-footer">
          <button onClick={handleOk} className="modal-close-button">
            Exit
          </button>
        </div>
      </Modal>
    </div>
  );
}
