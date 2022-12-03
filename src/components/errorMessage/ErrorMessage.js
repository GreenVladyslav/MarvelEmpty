import errImg from './error.gif';

const ErrorMessage = () => {
    return (
        <img style={{'display': 'block', 'width': '250px', 'height': '250px', 'object-fit': 'contain', 'margin': '0 auto'}}
            src={errImg} alt="Error" />
    )
}

export default ErrorMessage;