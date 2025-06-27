import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
    // landlord est le bailleur
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState("");
    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
            fetchLandlord();
        };
    }, [listing.userRef]);
    function onChange(e) {
        setMessage(e.target.value);
    }
    return (
        <>
            {landlord && (
                <div className="flex flex-col gap-2">
                    <p>
                        Contacte
                        <span className="font-semibold">
                            {landlord.username}
                        </span>
                        pour <span>{listing.name.toLowerCase}</span>
                    </p>
                    <textarea
                        onChange={onChange}
                        name="message"
                        id="message"
                        value={message}
                        rows="2"
                        placeholder="Veuillez ecrire votre message ici ..."
                        className="w-full border-gray-400 rounded-md p-3 mt-2"
                    ></textarea>
                    <Link
                        to={`mailto:${landlord.email}?subject=Regarding
                        ${listing.name}$body={message}`}
                        className="bg-slate-700 text-white text-center p-3 rounded-lg uppercase"
                    >
                        Envoyer le message
                    </Link>
                </div>
            )}
        </>
    );
}
