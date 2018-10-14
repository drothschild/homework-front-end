import styled from 'styled-components';

const GifGridItemStyles = styled.div`
    background: white;
    border: 1px solid ${props => props.theme.gray};
    box-shadow: ${props => props.theme.bs};
    position: relative;
    display: flex;
    flex-direction: column;
    .preview {
        display: ${props => (props.loading ? 'block' : 'none')};
        filter: blur(5px) grayscale(100%);
    }
    .moving {
        display: ${props => (props.loading ? 'none' : 'block')};
    }
    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
    }
    p {
        line-height: 2;
        font-weight: 300;
        flex-grow: 1;
        padding: 0 3rem;
        font-size: 1.5rem;
    }
`;

export { GifGridItemStyles };
