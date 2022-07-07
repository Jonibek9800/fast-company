import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import CheckBoxForm from "../common/form/checkBoxField";
import { getAuthErrors, login } from "../../store/users";
import { useDispatch, useSelector } from "react-redux";
import history from "../../utils/history";

const LoginForm = () => {
    const [data, setData] = useState({ email: "", password: "", stayOn: false });
    const [errors, setErrors] = useState({});
    const loginError = useSelector(getAuthErrors());
    const dispatch = useDispatch();
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired:
            {
                message: "Электронная почта обязателтна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        password: {
            isRequired:
            {
                message: "Пароль обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Пароль должен содержать хотя бы одну заглавную букву"
            },
            isContainDigit: {
                message: "Пароль должен содержать хотя бы одно число"
            },
            min: {
                message: "Пароль должен состоять минимум из восми символов",
                value: 8
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValide = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        // const putName = history.location.state.from.pathname;
        const isValide = validate();
        if (!isValide) return;
        const redirect = history.location.state ? history.location.state.from.pathname : "/";
        dispatch(login({ payload: data, redirect }));
    };
    return (

        <form onSubmit={handleSubmit} className="">
            <TextField
                lable="Электроная почта"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                lable="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxForm
                name="stayOn"
                value={data.stayOn}
                onChange={handleChange} >Оставаться в системе
            </CheckBoxForm>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValide}
                className="btn btn-primary mt-4 w-100 mx-auto">
                Submit
            </button>
        </form>

    );
};

export default LoginForm;
