import styled from 'styled-components';

const Table = styled.table`
  border-collapse: collapse;
  color: white;
  td,
  th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
  }

  tr td:nth-child(5),
  tr td:nth-child(6) {
    cursor: pointer;
  }
  th {
    background-color: rgb(233, 161, 140);
  }

  tr:nth-child(odd) {
    background-color: rgb(229, 116, 111);
  }

  tr:nth-child(even) {
    background-color: rgb(233, 161, 140);
  }
`;

export default Table;
