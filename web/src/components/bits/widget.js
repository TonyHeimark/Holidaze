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
                        message={node}
                        setModalShow={setModalShow}
                        handleDelete={handleDelete}
                      />
                    ) : enquirie ? (
                      <ReadEnquiries
                        enquirie={node}
                        setModalShow={setModalShow}
                        handleDelete={handleDelete}
                      />
                    ) : null
                  );
                }}
                key={node._id}
                className="widget__button"
              >
                {(node.establishmentName || node.name).substr(0, 21)}
                {node.establishmentName && node.establishmentName.length > 21 && "..."}
                {node.name && node.name.length > 16 && "..."}
                <img src={rightArrow} alt="message" />{" "}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Widget;
