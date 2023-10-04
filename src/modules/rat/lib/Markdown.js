import Chord from "@lespantsfancy/chord";
import { EnumRatingType } from "./Rating";

export const EnumTextType = {
	LABEL: "LABEL",
	DESCRIPTION: "DESCRIPTION",
	COMMENT: "COMMENT",
};

export const Reducers = ({ } = {}) => ({
	merge: (state, next = {}) => ({ ...state, ...next }),
});

export const Markdown = ({ $subtype = EnumTextType.COMMENT, content = "", ...rest } = {}) => Chord.Node.Identity.Next({
	$type: EnumRatingType.MARKDOWN,
	$subtype,
	content,
	...rest,
});

export default {
	EnumTextType,
	Reducers,
	State: Markdown,
};