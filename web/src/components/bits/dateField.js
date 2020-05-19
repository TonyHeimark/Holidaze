import React from "react";
import MaskedInput from "react-text-mask";

const DateField = ({ label, onChange, value, inline }) => {
  const handleDate = e => {
    onChange(e.target.value);
  };

  return (
    <div className="datefield">
      {label && (
        <div className="datefield__label">
          <span>{label}</span>
        </div>
      )}
      <div className="datefield__content">
        <MaskedInput
          mask={[/[0-9]/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
          placeholder="dd/mm/yyyy"
          className={`datefield__input ${inline && "datefield__input--inline"}`}
          onChange={handleDate}
          value={value}
          kind={"datetime"}
          options={{
            format: "DD-MM-YYYY"
          }}
        />
      </div>
    </div>
  );
};

export default DateField;
