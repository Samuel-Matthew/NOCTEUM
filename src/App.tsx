import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./router";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navigation from "./components/feature/Navigation";
import CustomCursor from "./components/feature/CustomCursor";
import CartDrawer from "./components/feature/CartDrawer";
// import PageTransition from "./components/feature/PageTransition";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter basename={__BASE_PATH__}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Navigation />
              <CustomCursor />
              <CartDrawer />
              <div className="grain-overlay" aria-hidden="true" />
              {/* <PageTransition> */}
                <AppRoutes />
              {/* </PageTransition> */}
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
}

export default App;
