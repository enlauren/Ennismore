import React, { Fragment, ReactChild } from 'react';
import styled from '@emotion/styled'

interface Props {};

export const GetHelloWorldMessage: React.FC<Props> = (): JSX.Element => {
    return (
        <>
            <h1 style={{fontSize: '24px'}}>Hello, world!</h1>
            <h2 style={{fontSize: '14px', marginBottom: '20px'}}>Search github by user handle and preview results</h2>
        </>
    )
};
      