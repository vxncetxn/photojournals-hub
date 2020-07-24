import { createGlobalStyle } from "styled-components";

require("typeface-rubik");
require("typeface-karla");

const Defaults = createGlobalStyle`
    :root {
        --font-primary: Rubik;
        --font-secondary: Karla;

        --color-h1: #5993c0; //55%
        --color-apostrophe: #b5cfe3; //80%
        --color-bg: #ecf3f8;
        --color-text: #00060a;
        --color-celestial: #fbf2ba;

        --color-accent-one: #db7093;
        --color-accent-two: #7b68ee;

        --bs-celestial-from: 0px 0px 40px 15px #fbf2ba;
        --bs-celestial-to: 0px 0px 40px 45px #fbf2ba;
    }

    [theme="dark"] {
        --color-h1: #3b3bde; //55%
        --color-apostrophe: #161683; //30%
        --color-bg: #07072c;
        --color-text: #f5fbff;
        --color-celestial: #e6e6ea;

        --bs-celestial-from: 0px 0px 40px 2px #e6e6ea;
        --bs-celestial-to: 0px 0px 40px 10px #e6e6ea;
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
        background-color: var(--color-bg);
        // overflow: hidden;
        transition: background-color 0.3s ease-out;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: black;
    }

    button {
        background: none;
        border: none;
    }
`;

export default Defaults;
