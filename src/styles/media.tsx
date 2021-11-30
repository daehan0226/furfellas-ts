import { CSSProp, css } from "styled-components";

interface MediaQueryProps {
    phone: number;
    tablet: number;
    desktop: number;
};

const sizes: MediaQueryProps = {
    desktop: 1167,
    tablet: 778,
    phone: 576,
};

type BackQuoteArgs = string[];


const media = {
    phone: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
        css`
      @media only screen and (max-width: ${sizes.phone}px) {
        ${css(literals, ...args)}
      }
    `,
    tablet: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
        css`
      @media only screen and (max-width: ${sizes.tablet}px) {
        ${css(literals, ...args)}
      }
    `,
    desktop: (literals: TemplateStringsArray, ...args: BackQuoteArgs): CSSProp =>
        css`
      @media only screen and (max-width: ${sizes.desktop}px) {
        ${css(literals, ...args)}
      }
    `,
} as Record<
    keyof typeof sizes,
    (l: TemplateStringsArray, ...p: BackQuoteArgs) => CSSProp
>;

export default media;