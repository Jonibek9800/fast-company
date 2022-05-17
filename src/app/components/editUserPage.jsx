import React from "react";
import TextField from "./common/form/textField";
// import { validator } from "../utils/validator";
// import api from "../api";
import SelectField from "./common/form/selectField";
import RadioField from "./common/form/radioField";
import MultiSelectField from "./common/form/multiSelectField";
// import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
// import CheckBoxField from "./common/form/checkBoxField";

const EditUser = ({ id, onChange, onSubmit, user, data, qualities, professions }) => {
    function handleQualities() {
        const qualitiesArray = [];
        const { qualities } = data;
        for (const quality in qualities) {
                qualitiesArray.push({
                    value: qualities[quality]._id,
                    label: qualities[quality].name,
                    color: qualities[quality].color
                });
        }
        return qualitiesArray;
    };
    console.log(data);
    return <>{user
        ? <form onSubmit={onSubmit}>
            <TextField
                label="Имя"
                type="text"
                name="name"
                value={data.name}
                onChange={onChange}
            />
            <TextField
                label="Электронная почта"
                name="email"
                value={data.email}
                onChange={onChange}
            />
            <SelectField
                label="Выбери свою профессию"
                defaultOption="Choose..."
                options={professions}
                name="profession"
                onChange={onChange}
                value={data.profession._id}
            />
            <RadioField
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={onChange}
                label="Выберите ваш пол"
            />
            <MultiSelectField
                options={qualities}
                onChange={onChange}
                defaultValue={handleQualities()}
                name="qualities"
                label="Выберите ваши качества"
            />
            <button
                className="btn btn-primary w-100 mx-auto"
                type="submit"
            // disabled={!isValid}
            >
                Submit
            </button>
        </form>
        : "loadding"}</>;
};
EditUser.propTypes = {
    user: PropTypes.object,
    data: PropTypes.object,
    qualities: PropTypes.array,
    professions: PropTypes.array,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    id: PropTypes.string
};

export default EditUser;
