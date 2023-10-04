import React, { useEffect, useState } from "react";
import { BsEmojiSmile, BsStar } from "react-icons/bs";
import { IconRating } from "../modules/rat/components/IconRating";
import Markdown from "react-markdown";
import CodeMirror from "@uiw/react-codemirror";

import $$ratings from "../modules/rat/data/reviews/test.schema";
import Rating from "../modules/rat/lib/Rating";

export function EditableMarkdown({ content, index, onUpdate }) {
	const [ isEditing, setIsEditing ] = useState(false);
	const [ editedContent, setEditedContent ] = useState(content);

	const handleDoubleClick = () => {
		setIsEditing(true);
	};

	const handleBlur = () => {
		setIsEditing(false);
		onUpdate(index, editedContent);
	};

	const handleKeyDown = (event) => {
		if(event.keyCode === 27) { // ESC key
			setIsEditing(false);
		}
	};

	useEffect(() => {
		onUpdate(index, editedContent);
	}, [ editedContent ]);

	return isEditing ? (
		<CodeMirror
			value={ editedContent }
			onBlur={ handleBlur }
			onKeyDown={ handleKeyDown }
			onChange={ (next) => setEditedContent(next) }
			options={ {
				mode: "markdown",
				theme: "material",
				lineNumbers: true,
				autoFocus: true,
			} }
		/>
	) : (
		<div onDoubleClick={ handleDoubleClick }>
			<Markdown>{ content }</Markdown>
		</div>
	);
}

export function Ratings() {
	const [ ratings, setRatings ] = useState($$ratings);

	const onHover = (index, option) => console.log(option);
	const onSelect = (index, option) => {
		let nextRatings = [ ...ratings ];
		nextRatings[ index ] = {
			...nextRatings[ index ],
			current: option,
		};
		setRatings(nextRatings);
	};

	const handleContentUpdate = (index, newContent) => {
		let nextRatings = [ ...ratings ];
		nextRatings[ index ] = {
			...nextRatings[ index ],
			content: newContent,
		};
		setRatings(nextRatings);
	};

	useEffect(() => {
		console.log(JSON.stringify(ratings, null, 2));
	}, [ ratings ]);

	return (
		<div className="flex flex-col gap-y-1">
			{
				ratings.map((rating, i) => (
					<div
						key={ rating.$id }
						className="flex flex-row"
					>
						{
							rating.$type === Rating.EnumRatingType.DISCRETE_RANGE ? (
								<>
									<div className="text-2xl flex-1">{ rating.label }</div>
									<IconRating
										className="flex flex-1 gap-1 cursor-pointer"
										rating={ rating }
										icon={
											i % 2 === 0
												? <BsStar size={ 36 } />
												: <BsEmojiSmile size={ 36 } />
										}
										onHover={ (...args) => onHover(i, ...args) }
										onSelect={ (...args) => onSelect(i, ...args) }
									/>
								</>
							) : (
								<EditableMarkdown
									content={ rating.content }
									index={ i }
									onUpdate={ handleContentUpdate }
								/>
							)
						}
					</div>
				))
			}
		</div>
	);
}

export default Ratings;