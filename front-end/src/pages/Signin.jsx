import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth.jsx";
function Signin() {
    // pour rediriger l'utilisateur

    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            // pour associer son id avec la valeur écrite
            [e.target.id]: e.target.value,
        });
    };
    // fonction permettant la soumission du formulaire
    const handleSumit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart);
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            // reponse du backend
            const data = await res.json();
            // si ca ne passe pas bien (Message d'erreur)
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            // si ca se passe bien l'utilisateur est rediriger vers la page sign-in (connexion)
            dispatch(signInSuccess(data));
            navigate("/");
        } catch (error) {
            dispatch(signInFailure(error.message));
        }
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl text-center font-semibold my-7">
                Connexion
            </h1>
            <form onSubmit={handleSumit} className="flex flex-col gap-4">
                <input
                    type="email"
                    className="border p-3 rounded-lg"
                    placeholder="email"
                    id="email"
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="border p-3 rounded-lg"
                    placeholder="password"
                    id="password"
                    onChange={handleChange}
                />
                <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
                    {loading ? "Loading ..." : "Connectez-Vous"}
                </button>
                <OAuth />
            </form>
            <div className="flex gap-2 mt-5">
                <p>Avez vous un compte ?</p>
                <Link to={"/sign-up"}>
                    <span className="text-blue-700">Inscrivez-vous</span>
                </Link>
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}
export default Signin;
