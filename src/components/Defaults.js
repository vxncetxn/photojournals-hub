import { createGlobalStyle } from "styled-components";

const Defaults = createGlobalStyle`
    :root {
        --font-secondary: Oswald;

        // --color-primary: #5b955b;
        // --color-primary-light: #81b181;
        // --color-secondary: #a46a6a;
        // --color-tertiary: #e2f1f1;

        --color-primary: #41b3a3;
        --color-primary-light: #41b3a3;
        --color-secondary: #e8a87c;
        --color-tertiary: #ddeeee;
        --color-temporary: #c38d9e;

        --color-white: #fcfcfc;
        --color-gray: #cccccc;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 62.5%;
    }

    body {
        position: relative;
        background-color: #f6f9fc;
        // border: 1px solid red;
        overflow: hidden;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: black;
    }
`;

export default Defaults;
