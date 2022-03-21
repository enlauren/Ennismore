import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import axios from 'axios';
import to from 'await-to-js';
import { GetHelloWorldMessage } from '../helpers/hello-world';

interface HelloWorldProps {}

export const HelloWorld: React.FC<HelloWorldProps> = () => {
  const [githubUserData, setGithubUserData] = useState({});
  const [noResultsFound, setNoResultsFound] = useState({});
  const [username, setUsername] = useState('');

  const fetchDataByUsername = async (name: string) => {
    const url = `https://api.github.com/users/${name}/repos`;
    const [error, githubUserData] = await to(axios.get(url));
    if (error) {
      if(error.message === 'Request failed with status code 404') {
         setNoResultsFound(`No results found for ${name}`);
      } else {
        throw new Error('Network problems.')
      }
    }
    return githubUserData;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setUsername(() => (event.target.value))
  }

  const handleClick = () => {
      const userData = fetchDataByUsername(username);
      setGithubUserData(userData);
  }

  const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    border: none;
    color: white;
    padding: 12px 42px;
    margin-left: 4px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
  `

  return <div style={{
      maxWidth: '1024px',
      minWidth: '428px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100vh',
    }}>
      <GetHelloWorldMessage />
      <form style={{display: 'flex', height: '30px', flexDirection: 'row'}}>
        <label>
          <p style={{display: 'inline', fontSize: '14px'}}>Github username:</p>
          <input type="text" value={username} onChange={handleChange} />
        </label>
        <Button type="button" value="Search" onClick={handleClick} />
      </form >
  </div>;
};
