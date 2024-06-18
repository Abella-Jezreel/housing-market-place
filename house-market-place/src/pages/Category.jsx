import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";


const Category = () => {
  const [listings, setListings] = useState([null]);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  console.log(listings, "listings");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const listingsCollection = collection(db, "listing");
        const listingsQuery = query(
          listingsCollection,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const listingsSnapshot = await getDocs(listingsQuery);
        let listingsData = [];

        listingsSnapshot.forEach((doc) => {
          console.log(doc, "doc");
          const data = doc.data();
          if (data && data.name && data.location) {
            listingsData.push(data);
          }
        });
        setListings(listingsData);
        setLoading(false);
      } catch (error) {
        toast.error("Error fetching listings");
        console.error("Error fetching listings", error);
        setLoading(false);
      }
    };

    fetchListings();
  }, [params.categoryName]);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for Rent"
            : "Places for Sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
        <main>
            <ul className="categoryListings">
                {
                    listings.map((listing, index) => (
                        <ListingItem listing={listing} id={index} key={index}/>
                    ))
                }
            </ul>
        </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
