import React, { useState } from 'react';
import openai from 'openai';

// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export default function Home(){
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
    openai.api_key = process.env.OPENAI_API_KEY;


    return (
        <div className="container">
        
        wenas  
        </div>
    );

}

