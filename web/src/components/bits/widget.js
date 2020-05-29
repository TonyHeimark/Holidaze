import React from "react";
import ReadMessage from "../../components/bits/readMessage";

import rightArrow from "../../assets/sort-down-solid.svg";
import ReadEnquiries from "./readEnquiries";

const Widget = ({
  items,
  setModalContentComponent,
  setModalShow,
  title,
  message,
  enquirie,
  handleDelete
}) => {
  return (
    <div className="widget">
      <h2 className="widget__title">{title}</h2>
      <div className="widget__box">
        <div className="widget__content">
          {items &&
            items.map(node => (
              <button
                onClick={() => {
                  setModalShow(message || enquirie);
                  setModalContentComponent(
                    message ? (
                      <ReadMessage
                        message={node.node}
                        setModalShow={setModalShow}
                        handleDelete={handleDelete}
                      />
                    ) : enquirie ? (
                      <ReadEnquiries
                        enquirie={node.node}
                        setModalShow={setModalShow}
                        handleDelete={handleDelete}
                      />
                    ) : null
                  );
                }}
                key={node.node.id}
                className="widget__button"
              >
                {(node.node.establishmentName || node.node.name).substr(0, 16)}
                {node.node.establishmentName && node.node.establishmentName.length > 16 && "..."}
                {node.node.name && node.node.name.length > 16 && "..."}
                <img src={rightArrow} alt="message" />{" "}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
