import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({});
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                console.error("Upload error:", error);
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL }); // ✅ correction ici
                });
            }
        );
    };

    const imageSrc =
        typeof formData?.avatar === "string"
            ? formData.avatar
            : typeof currentUser?.avatar === "string"
            ? currentUser.avatar
            : "/default-avatar.png";

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                {/* Input file caché */}
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {/* Avatar cliquable */}
                <img
                    onClick={() => fileRef.current.click()}
                    src={imageSrc}
                    alt="photo de profil"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />

                {/* Message d'état du téléversement */}
                <p className="text-sm self-center">
                    {fileUploadError ? (
                        <span className="text-red-700">
                            Une erreur est survenue
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-green-700">{`Téléchargement ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className="text-green-700">
                            Téléchargement réussi
                        </span>
                    ) : (
                        ""
                    )}
                </p>

                {/* Formulaire utilisateur */}
                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    id="email"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border p-3 rounded-lg"
                    id="password"
                />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-90">
                    Mettre à jour
                </button>
            </form>

            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">
                    Supprimer le compte
                </span>
                <span className="text-red-700 cursor-pointer">Déconnexion</span>
            </div>
        </div>
    );
}
