import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingItem from "../components/ListingItem";

// import Swiper styles
import "swiper/css/bundle";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// img qu'on va utilisé
import Img1 from "../assets/hero-carousel/img1.jpg";

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    SwiperCore.use([Navigation]);
    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch("/api/listing/get?offer=true&limit=6");
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };
        const fetchRentListings = async () => {
            try {
                const res = await fetch("/api/listing/get?type=rent&limit=6");
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };
        const fetchSaleListings = async () => {
            try {
                const res = await fetch("/api/listing/get?type=sale&limit=6");
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchOfferListings();
    }, []);

    return (
        <div className="min-h-screen">
            {/*Top*/}
            <div className="flex flex-col gap-6 p628 px-3 max-w-6xl mx-auto">
                <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
                    trouver votre Logement{" "}
                    <span className="text-slate-500">idéal facilement </span>
                </h1>
                <div className="text-gray-400 text-xs sm:text-sm">
                    Notre agence Immo-immobiliére est la meilleure adresse pour
                    trouver votre futur logement
                    <br />
                    Nous vous proposons un large choix de biens
                </div>
                <Link
                    to={"/search"}
                    className="text-sm sm:text-sm text-blue-800 font-bold hover:underline"
                ></Link>
            </div>
            {/*Swiper*/}
            <Swiper navigation>
                {offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div
                                style={{
                                    background: `url(${listing.imageUrls[0]} center no-repeat`,
                                    backgroundSise: "cover",
                                }}
                                className="h-[500px]"
                                key={listing._id}
                            >
                                <img
                                    src={Img1}
                                    alt=""
                                    className="w-full lg:h-[420px] sm:h-96 h-80"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            {/* listing resultat par offre, vente et location*/}
            {/* <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Logements récents à louer
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={"/search?type=rent"}
                            >
                                Afficher plus de logements à louer
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div> */}
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                {offerListings && offerListings.length > 0 && (
                    <div>
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Offres recents
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={"/search?type=rent"}
                            >
                                Montrer plus d'offres
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {rentListings && rentListings.length > 0 && (
                    <div className="">
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Logements récents à louer
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={"/search?type=rent"}
                            >
                                Afficher plus de logements à louer
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {saleListings && saleListings.length > 0 && (
                    <div className="">
                        <div className="my-3">
                            <h2 className="text-2xl font-semibold text-slate-600">
                                Lieux récents à vendre
                            </h2>
                            <Link
                                className="text-sm text-blue-800 hover:underline"
                                to={"/search?type=sale"}
                            >
                                Afficher plus de logements à vendre
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {saleListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
