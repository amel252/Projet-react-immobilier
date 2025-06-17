import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
} from "../redux/user/userSlice";
import { app } from "../firebase";

export default function Profile() {
    const fileRef = useRef(null);
    const dispatch = useDispatch();
    const { currentUser, loading, error } = useSelector((state) => state.user);

    const [file, setFile] = useState(undefined);
    const [formData, setFormData] = useState({});
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);

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
                    setFormData((prev) => ({ ...prev, avatar: downloadURL }));
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const imageSrc =
        typeof formData?.avatar === "string"
            ? formData.avatar
            : typeof currentUser?.avatar === "string"
            ? currentUser.avatar
            : "/default-avatar.png";
    // function de supp du compte
    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.succes === false) {
                dispatch(deleteUserFailure(data.message));
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error));
        }
    };
    // le resultat :
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <img
                    onClick={() => fileRef.current.click()}
                    src={imageSrc}
                    alt="photo de profil"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
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

                <input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    className="border p-3 rounded-lg"
                    id="username"
                    defaultValue={currentUser.username}
                    onChange={(e) =>
                        setFormData({ ...formData, username: e.target.value })
                    }
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="border p-3 rounded-lg"
                    id="email"
                    defaultValue={currentUser.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    className="border p-3 rounded-lg"
                    id="password"
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-90">
                    {loading ? "Chargement..." : "Mettre à jour"}
                </button>
            </form>

            <div className="flex justify-between mt-5">
                <span
                    onClick={handleDeleteUser}
                    className="text-red-700 cursor-pointer"
                >
                    Supprimer le compte
                </span>
                <span className="text-red-700 cursor-pointer">Déconnexion</span>
            </div>

            {error && <p className="text-red-700 mt-3">{error}</p>}
            {updateSuccess && (
                <p className="text-green-700 mt-3">
                    La mise à jour de l'utilisateur est réussie.
                </p>
            )}
        </div>
    );
}
