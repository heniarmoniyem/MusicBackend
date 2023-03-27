import styled from 'styled-components';

const EditForm = styled.form`
  display: flex;
  justify-content: space-evenly;
  gap: 1rem;
  input {
    padding: 1rem 2rem;
    border-radius: 1rem;
    border: 1px solid #ccc;
    color: black;
    background-color: white;
  }
  button {
    align-self: center;
    border-radius: 1rem;
    border: none;
    padding: 1rem 2rem;
    background-color: rgb(233, 161, 140);
    color: white;
  }

  .cancel {
    background-color: rgb(229, 116, 111);
  }
`;

export default EditForm;
