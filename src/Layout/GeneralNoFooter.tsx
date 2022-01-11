import styled from "styled-components";
import CommonHeader from "./CommonHeader";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    min-height: 100vh;
    width: 100vw;
`;

const GeneralNoFooter = () => {
    return (
        <Container>
            <CommonHeader />
        </Container>
    );
};

export default GeneralNoFooter;
