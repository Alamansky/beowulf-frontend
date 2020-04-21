import styled from "styled-components";

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 10px 5px;
    position: relative;
    font-size: 14px;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
  }
  a {
    text-decoration: underline;
    color: ${props => props.theme.grey};
    &:hover {
      cursor: pointer;
    }
  }
`;

export default Table;
