import { Metadata } from "next";
import ExploreClient from "./ExploreClient";

export const metadata: Metadata = {
    title: "Explore Properties | RentEasy BD",
    description: "Browse rental listings across Dhaka.",
};

export default function ExplorePage() {
    return <ExploreClient />;
}