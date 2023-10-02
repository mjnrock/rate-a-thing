import Markdown from "react-markdown"

export function Default() {
	const markdown = '# Hi, *Pluto*!'

	return (
		<>
			<Markdown>{ markdown }</Markdown>
			<h1 className="text-3xl font-bold underline">
				Hello world!
			</h1>
		</>
	);
};

export default Default;