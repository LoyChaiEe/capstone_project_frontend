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
      <button onClick={() => showGuide()}>View guide</button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <GuideModalBody />
      </Modal>
    </div>
  );
}
