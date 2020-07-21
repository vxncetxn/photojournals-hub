import { createGlobalStyle } from "styled-components";

require("typeface-rubik");
require("typeface-karla");

const Defaults = createGlobalStyle`
    :root {
        --font-primary: Rubik;
        --font-secondary: Karla;

        --color-primary: #c7dbea;
        --color-secondary: #dae7f1;
        --color-bg: #ecf3f8;
        --color-text: #00060a;
        --color-celestial: #fdf2b4;

        --color-accent-one: #db7093;
        --color-accent-two: #7b68ee;

        --bs-celestial: 0px 0px 40px 15px #fdf2b4;

        --color-white: #fcfcfc;
        --color-gray: #cccccc;
    }

    [theme="dark"] {
        --color-primary: #0f0f57;
        --color-secondary: #0b0b41;
        --color-bg: #07072c;
        --color-text: #f5fbff;
        --color-celestial: #ffffff;

        --bs-celestial: 0px 0px 40px 2px #ffffff;
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
        overflow: hidden;
        transition: background-color 0.3s ease-out;
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: black;
    }

    .country, .sphere {
       transition: fill 0.3s ease-out;
    }
`;

export default Defaults;
