import React from "react";
import Qualities from "./qualitie";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getQualitiesByIds, getQualitiesLoadingStatus } from "../../../store/qualities";

const QualitiesList = ({ id }) => {
    // const dispatch = useDispatch();
    const qualitiesList = useSelector(getQualitiesByIds(id));
    const isLoading = useSelector(getQualitiesLoadingStatus());
    // useEffect(() => {}, []);
    if (!isLoading) {
        return qualitiesList.map((quality) => <Qualities quality={quality} key={quality._id} />);
    } else {
        return "loadding...";
    }
};
QualitiesList.propTypes = {
    id: PropTypes.array
};

export default QualitiesList;
