import { useTheme } from "./ThemeContext";

export function Navbar() {
const { theme, toggle } = useTheme();

  const styles = {
    padding: "1rem",
    backgroundColor: theme === "light" ? "#f5f5f5" : "#333",
    color: theme === "light" ? "#222" : "#f5f5f5",
  };

  return <nav style={styles}>Navbar – current theme: {theme}</nav>;
}