import { Fragment } from "react";
import Markdown from "react-markdown";

export function Content({ element, onUpdate, ...rest }) {
	const content = element.value;

	return (
		<Fragment key={ element.$id }>
			<Markdown>{ content }</Markdown>
		</Fragment>
	);
};

export default Content;