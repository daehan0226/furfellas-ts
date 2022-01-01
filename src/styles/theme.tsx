
import media, {sizes, BackQuoteArgs} from "./media"
import { CSSProp } from "styled-components";


interface colorProps {
  primary: {
    [key: string]: string
  };
  secondary: {
    [key: string]: string
  };
  common: {
    [key: string]: string
  }
}

const colors: colorProps = {
  primary: {
    light: "#757ce8",
    main: "#3f50b5",
    dark: "#002884",
    white: "#fff",
    black: "#000",
    text: "#fff",
    btnLight: "#40a9ff",
    btnMain: "#1890ff",
  },
  secondary: {
    light: "#ff7961",
    main: "#f44336",
    dark: "#ba000d",
    text: "#000",
  },
  common: {
    error: "#ff4d4f"
  }
}

interface Props {
  colors: colorProps,
  media: Record<keyof typeof sizes, (l: TemplateStringsArray, ...p: BackQuoteArgs) => CSSProp
>
}

export interface themeProps {
  theme: Props
}


export const theme: Props = {
  colors,
  media,
};