import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../auth/pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Mascotas } from "../pages/Home/View";
import DrawerAppBar from "../pages/components/Navbar";
import { Consejos } from "../pages/Consejos/View";
import { Anuncios } from "../pages/Anuncios/View";
import { Foros } from "../pages/Foros/View";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="login" element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                } />
                <Route path="/*" element={
                    <PrivateRoute>
                        <DrawerAppBar>
                            <Routes>
                                <Route path="/home" element={<Mascotas />} />
                                <Route path="/consejos" element={<Consejos />} />
                                <Route path="/anuncios" element={<Anuncios />} />
                                <Route path="/foros" element={<Foros />} />
                            </Routes>
                        </DrawerAppBar>
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}