import { BsChevronRight, BsChevronUp, BsFile, BsFileArrowDown, BsFloppy, BsFolder, BsFolder2Open, BsSave } from "react-icons/bs";

import ElementGroup from "../components/ElementGroup";

import Elements from "../components/elements/package";

import Modules from "../../../../modules/package";
const { EnumType, EnumAs } = Modules;

export const TypeComponentMap = {
	[ EnumType.GROUP ]: ElementGroup,
	[ EnumType.NUMBER ]: Elements.Number.Number,
	[ EnumType.INPUT ]: Elements.Input.Input,
};

export const AsComponentMap = {
	[ EnumType.GROUP ]: {
		[ EnumAs[ EnumType.GROUP ].FORM ]: EditSchema,
	},
	[ EnumType.TEXT ]: {
		[ EnumAs[ EnumType.TEXT ].HEADING ]: Elements.Text.Heading,
		[ EnumAs[ EnumType.TEXT ].MARKDOWN ]: Elements.Text.Markdown,
		[ EnumAs[ EnumType.TEXT ].CODE ]: Elements.Text.Code,
	},
	[ EnumType.RATING ]: {
		[ EnumAs[ EnumType.RATING ].RANGE ]: Elements.Rating.Range,
	},
};

export function EditSchema({ update, element, config = {}, ...props }) {
	const save = e => {
		const htmlElement = document.createElement("a");
		const file = new Blob([ JSON.stringify(element) ], { type: "application/json" });
		htmlElement.href = URL.createObjectURL(file);
		htmlElement.download = `${ element.id }.json`;
		htmlElement.click();
	};
	const load = e => {
		const element = document.createElement("input");
		element.type = "file";
		element.accept = "application/json";
		element.onchange = e => {
			const file = e.target.files[ 0 ];
			const reader = new FileReader();
			reader.onload = e => {
				const schema = JSON.parse(e.target.result);
				update("setForm", schema);
			};
			reader.readAsText(file);
		};
		element.click();
	};

	return (
		<>
			<div className="flex flex-row items-center justify-start w-full gap-2 p-2 mb-2 border border-b border-solid shadow-md select-none bg-neutral-50 border-neutral-200 border-b-neutral-100 ">
				<BsFloppy
					size={ "3rem" }
					className="p-2 bg-white border border-solid rounded cursor-pointer text-neutral-400 border-neutral-200 hover:bg-sky-300 hover:text-sky-50 hover:border-sky-600"
					onClick={ e => {
						save(e);
					} }
				/>
				<BsFile
					size={ "3rem" }
					className="p-2 bg-white border border-solid rounded cursor-pointer text-neutral-400 border-neutral-200 hover:bg-sky-300 hover:text-sky-50 hover:border-sky-600"
					onClick={ e => {
						load(e);
					} }
				/>
			</div>

			<div className="flex flex-row items-center justify-between w-full gap-2 p-2 mb-2 border border-b border-solid shadow-md select-none bg-neutral-50 border-neutral-200 border-b-neutral-100 ">
				{
					element.state.elements.some(el => el.type === EnumType.GROUP) ? (
						<button
							className="flex flex-row items-center p-2 border-2 border-solid rounded cursor-pointer border-neutral-200 hover:bg-sky-50 hover:text-sky-500 hover:border-sky-200 text-neutral-400 active:bg-sky-700 active:border-sky-50 active:text-sky-50"
							onClick={ e => {
								update("toggleConfigSetting", "isCollapsed");
							} }
						>
							{ config.isCollapsed ? <BsChevronRight size={ "1.25rem" } /> : <BsChevronUp size={ "1.25rem" } /> }
						</button>
					) : <div className="flex p-2">&nbsp;</div>
				}
			</div>

			<ElementGroup
				update={ update }
				element={ element }
				config={ config }
				map={ { TypeComponentMap, AsComponentMap } }
				{ ...props }
			/>
		</>
	);
};

export default EditSchema;