import styled from "styled-components";

export const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  max-width: 400px;
  width: 350px;
  max-height: 400px;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Content = styled.div`
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;
    & + * {
      margin-top: -20px;
    }
    p {
      font-size: 20px;
      margin-bottom: 0.5rem;
    }
    &:last-child {
      margin-top: 0.5em;
      flex-direction: row;
      justify-content: space-between;
    }
  }
  span {
    padding: 5px;
    text-decoration: none;
    color: #1da1f2;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  border: none;
  font-size: 16px;
  border-bottom: 1px solid #ccc;
  &:active,
  &:focus {
    border: none;
    outline: none;
    border-bottom: 1px solid #1da1f2;
  }
`;

export const Button = styled.button`
  background: white;
  border: 1px solid #1da1f2;
  padding: 0.6rem 1.3rem;
  border-radius: 20px;
  color: #1da1f2;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  &:hover {
    background: #1da1f2;
    color: white;
  }
`;