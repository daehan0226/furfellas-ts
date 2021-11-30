
import media from "./media"

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

export const theme = {
  colors,
  media,
};