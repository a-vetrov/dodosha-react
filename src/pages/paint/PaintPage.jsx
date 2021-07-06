import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchPaintData} from "../../__data__/actions/fetchPaintData";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import BackButton from "../../components/back-button/BackButton";
import CategoryLink from "./CategoryLink";

function PaintPage({fetch, loaded, error, categories}) {

    useEffect(() => {
        if (!loaded)
            fetch()
        // eslint-disable-next-line
    }, [])

    if (error){
        return <ErrorMessage message='Ошибка загрузки'/>
    }

    if (!loaded)
        return null

    return (
        <>
            <BackButton />
            <h1>Paint page</h1>
            {categories.map((item) => <CategoryLink {...item}/>)}
        </>
    );
}

PaintPage.propTypes = {
    fetch: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    error: PropTypes.bool,
    categories: PropTypes.array.isRequired,
}

PaintPage.defaultProps = {
    loaded: false,
    error: false,
}

const mapDispatchToProps = (dispatch) => ({
    fetch: bindActionCreators(fetchPaintData, dispatch)
})

const mapStateToProps = (state) => ({
    loaded: state.paint.loaded,
    error: state.paint.error,
    categories: state.paint.categories,
})

export default connect(mapStateToProps, mapDispatchToProps)(PaintPage)
