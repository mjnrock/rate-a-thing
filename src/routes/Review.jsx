import { v4 as uuid } from "uuid";
import Chord from "@lespantsfancy/chord";

import ModReview from "../modules/review/main";
import { Review as ReviewJSX } from "../modules/review/components/Review";

import { ReviewList } from "../modules/reviews/components/ReviewList";

import $$ratings from "../modules/review/data/reviews/test.schema";
import $$reviews from "../data/reviews/reviews.json";

const Nodes = Chord.Node.Node.CreateMany({
    reviews: {
        state: {
            ...ModReview.Transformers.fromJson($$reviews),
        },
		reducers: ModReview.Reducers,
    },
});

export function RouteReview() {
    const { state: reviews, dispatch: reviewsDispatch } = Chord.Node.React.useNode(Nodes.reviews);

    const saveToFile = () => {
        const data = ModReview.Transformers.toJson(reviews);

        const blob = new Blob([ data ], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${ uuid() }.json`;
        a.click();
    };
    const loadFromFile = (e) => {
        const file = e.target.files[ 0 ];
        const reader = new FileReader();

        reader.addEventListener("load", (e) => {
			const json = JSON.parse(e.target.result);
            const data = ModReview.Transformers.fromJson(json);
			console.log(data)

            reviewsDispatch({
                type: "set",
                data,
            });
        });

        reader.readAsText(file);
    };

    return (
        <>
            <button
                className="p-2 m-2 border border-solid rounded border-neutral-200"
                onClick={ saveToFile }
            >
                Save to File
            </button>
            <input
                type="file"
                className="p-2 m-2 border border-solid rounded border-neutral-200"
                onChange={ loadFromFile }
            />
            <ReviewList
                data={ reviews }
                update={ reviewsDispatch }
            />
        </>
    );
};

export default RouteReview;