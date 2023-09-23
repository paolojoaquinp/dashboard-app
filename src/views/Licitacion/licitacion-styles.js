import styled from "styled-components";

export const LicitacionContainer = styled.div`
    padding: 100px 90px 0;
    .title {
        padding: 50px 0;
    }
    .charts__container {
        display: flex;
        flex-direction: row;
        gap: 15px;
        height: 90%;
        > div {
            width: 50%;
        }
    }
`;