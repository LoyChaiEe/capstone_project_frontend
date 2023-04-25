import React, { useState } from "react";
import { Modal } from "antd";
import GuideModalBody from "./GuideModalBody";
import "./guideModalButton.css";
// import { Button } from "./Buttons";
import { Button } from "./Buttons";

export default function GuideModalButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showGuide = async () => {
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
      <Button onClick={() => showGuide()}>View guide</Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <GuideModalBody />
        <div className="modal-footer">
          <Button onClick={handleOk}>Exit</Button>
        </div>
      </Modal>
    </div>
  );
}
