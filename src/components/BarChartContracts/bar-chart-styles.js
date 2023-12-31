import styled from "styled-components";

export const BarChart = styled.div`
    /* border: 1px solid gray; */
    padding: 20px;
    border-radius: 12px;
    width: 60%;
    .chart__wrapper {
        padding-bottom: 20px;
        overflow:scroll;
    }
    p {
        font-size: 10px;
    }
    .select__wrapper {
        margin-top: 30px;
        > h3 {
            margin-bottom: 10px;
        }
        .select__container {
            background-color: white;
            width: 60%;
            height: 40px;
            border: 1px solid black;
            border-radius: 12px;
            padding: 6px 12px;
            &:hover {
                background-color: rgba(0,0,0,0.1);
            }
        }
    }
`;
