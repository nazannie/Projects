/* .text{
    position: fixed;
    bottom: 50px;
    right: 50px;
    background: #5A5EB9;
    width: 80px;
    height: 80px;  
    border-radius: 50%;
    color: white;
    padding: 28px;
    cursor: pointer;
    box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  } */

/* .text-header {
    padding: 20px;
    border-bottom: 2px solid white;
}    
    .text-about {
      float: left;
      padding-left: 10px;
      margin-top: 6px;
    }
    
    .text-with {
      font-weight: bold;
      font-size: 16px;
    } */
    
  


/* #msger-send-btn{
    margin-left: 10px;
    background: rgb(211, 219, 226);
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.23s;
}

#msger-send-btn:hover {
    background: rgb(3, 0, 180);
  } */
 import React from 'react';
  import styled from 'styled-components';
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 50px;
    color: #444;
    border: 1px solid #1890ff;
  `;
  
  const Title = styled.h1`
    color: #0d1a26;
    font-weight: 400;
  `;
  
  const Button = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #1890ff;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    transition: .3s background;
    &:hover {
      background: #40a9ff;
    }
  `;
  
  
  const ExampleStyledComponents = () => (
    <Wrapper>
      <Title>Example Styled-Components</Title>
      <Button>Button</Button>
    </Wrapper>
  );
  
  export default ExampleStyledComponents;
