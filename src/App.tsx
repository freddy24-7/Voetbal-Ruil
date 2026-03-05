import { ThemeProvider } from "next-themes"

import Page from "@/app/page"

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Page />
    </ThemeProvider>
  )
}

export default App
