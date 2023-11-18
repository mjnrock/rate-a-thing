import EnumElementType from "../../../EnumElementType";

export const TypeBar = ({ data, update }) => {
	return (
		<div className="flex flex-row p-2 m-2 border border-solid rounded border-neutral-200 bg-neutral-400">
			{
				Object.keys(EnumElementType).map((key, i) => {
					return (
						<div
							key={ `type-bar-${ key }` }
							className="flex flex-col items-center justify-center"
						>
							<div
								className="flex flex-row p-2 m-2 border border-solid rounded shadow-md cursor-pointer select-none text-neutral-600 bg-neutral-100 border-neutral-200 hover:bg-sky-100 hover:border-sky-200 hover:text-sky-500 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
								onClick={ e => {
									update("addElementByType", EnumElementType[ key ]);
								} }
							>
								{ key }
							</div>
						</div>
					)
				})
			}
		</div>
	)
};

export default TypeBar;