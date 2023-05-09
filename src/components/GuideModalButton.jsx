import React, { useState } from "react";
import { Modal } from "antd";
import GuideModalBody from "./GuideModalBody";
import "./guideModalButton.css";
import { Button, AdvancementButton } from "./Buttons";

// Why is this not in the Buttons.jsx?
export default function GuideModalButton({ lesson_id, chapter }) {
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
      <AdvancementButton onClick={() => showGuide()}>
        View guide
      </AdvancementButton>
      {/* It does not make sense to call this component "Button" when it actually includes the Modal */}
      {/* I think the Modal should possibly live on the page level itself, instead of on a component level */}
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <GuideModalBody lesson_id={lesson_id} chapter={chapter} />
        <div className="modal-footer">
          <Button onClick={handleOk}>Exit</Button>
        </div>
      </Modal>
    </div>
  );
}
