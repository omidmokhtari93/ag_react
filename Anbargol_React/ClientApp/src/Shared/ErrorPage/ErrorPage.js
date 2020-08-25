import React from 'react';
import Wrapper from '../Wrapper/Wrapper';

const ErrorPage = props => {
    return (
        <Wrapper>
            <div style={{ textAlign: "center" , padding: 'auto' }}>
                <h1>!! خطا</h1>
                <h6>صفحه مورد نظر پیدا نشد</h6>
            </div>
        </Wrapper>
    )
}

export default ErrorPage;