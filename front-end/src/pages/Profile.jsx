import { useSelector } from "react-redux";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
    // useRef hook qui permet de ciblé une balise
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [formData, setFormData] = useState({});
    const [filePerc, setFilePerc] = useState(0);
    const [FileUploadError, setFileUploadError] = useState(false);

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    });
    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapShot) => {
                const progress =
                    (snapShot.bytesTransferred / snapShot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((dowloadURL) => {
                    setFormData({ ...formData, avatar: getDownloadURL });
                });
            }
        );
    };
    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form className="flex flex-col gap-4">
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                />
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt="photo de profile"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                />
                <p className="text-sm self-center">
                    {FileUploadError ? (
                        <span className="text-red-700">
                            Une erreur est survenue
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-green-700">{`Téléchargement ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span>Téléchargement réussi</span>
                    ) : (
                        ""
                    )}
                </p>

                <input
                    type="text"
                    placeholder="username"
                    className="border p-3 rounded-lg"
                    id="username"
                />
                <input
                    type="email"
                    placeholder="email"
                    className="border p-3 rounded-lg"
                    id="email"
                />
                <input
                    type="password"
                    placeholder="password"
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
