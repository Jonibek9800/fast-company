import React, { useState, useEffect } from "react";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { validator } from "../../../utils/validator";
import { useParams, useHistory } from "react-router-dom";
import { useProfession } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";
import Spiner from "../../common/Spiner";
import { toast } from "react-toastify";

const Edit = () => {
    const { userId } = useParams();
    const history = useHistory();
    const { currentUser, updateUser } = useAuth();
    const { profession, qualities: quality } = currentUser;
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const { professions } = useProfession();
    const { qualities } = useQuality();
    const [errors, setErrors] = useState({});
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof._id === id) {
                return prof._id;
            };
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality]._id) {
                    qualitiesArray.push(qualities[quality]._id);
                }
            }
        }
        return qualitiesArray;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        console.log(qualities);
        updateUser(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.push(`/users/${data._id}`);
    };
    console.log(data);
    function errorCatcher(error) {
        toast(error);
    }
    const transformData = (data) => {
        try {
            const qualit = [];
            for (const qual of quality) {
                const q = data.find((q) => q._id === qual);
                qualit.push(q);
            };
            return qualit.map((qual) => ({ label: qual.name, value: qual._id }));
        } catch (error) {
            errorCatcher(error);
        }
    };
    useEffect(() => {
        setData((prev) => ({
            ...prev,
            ...currentUser,
            qualities: transformData(qualities),
            profession: profession
        }));
    }, [isLoading]);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleBack = () => {
        history.goBack();
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        !isLoading &&
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4 mb-3">
                    <button className="btn btn-primary" onClick={handleBack}>Назад</button>
                </div>
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(professions).length > 0 && qualities.length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <Spiner />
                    )}
                </div>
            </div>
        </div >
    );
};

export default Edit;
