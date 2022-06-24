import React from "react";
import PropTypes from "prop-types";

const SelectField = ({ label, value, onChange, name, defaultOption, options, error }) => {
    const getInputClasses = () => {
        return "form-select " + (error ? "is-invalid" : "");
    };
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const optionsUpdate = (options) => {
        return options.map(op => ({ label: op.name, value: op._id }));
    };
    const optionsArray =
        !Array.isArray(optionsUpdate(options)) && typeof optionsUpdate(options) === "object"
            ? Object.values(optionsUpdate(options))
            : optionsUpdate(options);
    return (
        <div className="md-4">
            <label
                htmlFor={name}
                className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                id={name}
                name={name}
                value={value}
                onChange={handleChange}>
                <option disabled value="">
                    {defaultOption}
                </option>
                {optionsArray &&
                    optionsArray.map((option) => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    );
};
SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string
};
export default SelectField;
