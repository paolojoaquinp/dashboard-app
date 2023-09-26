import styled from "styled-components";

export const PieChart = styled.div`
    width:40%;
    padding: 20px;
    border-radius: 12px;
    .chart__wrapper {
        padding-bottom: 20px;
    }
    p {
        font-size: 10px;
    }
    .options__wrapper {
        display: flex;
        flex-direction: column;
        .select__wrapper {
            margin-top: 30px;
            overflow-y:scroll;
            overflow:hidden;
            > h3 {
                margin-bottom: 10px;
            }
                .select__container {
                    background-color: white;
                    width: 250px;
                    height: 40px;
                    border: 1px solid black;
                    border-radius: 12px;
                    padding: 6px 12px;
                    &:hover {
                        background-color: rgba(0,0,0,0.1);
                    }
                }
            }
    }
`;
