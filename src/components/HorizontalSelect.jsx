import { useState, useEffect, useRef } from "react";

export const classNames = (...classes) => {
	return classes.filter(Boolean).join(" ");
};

export function HorizontalSelect({ current, options = [], onSelect }) {
	return (
		<div className="flex flex-row items-center justify-start w-full p-2 bg-gray-200 border-b rounded-md gap-x-1">
			{ options.map((option) => (
				<button
					key={ option }
					className={ classNames(
						"px-4 py-2 rounded-md text-sm font-medium leading-5 focus:ring-0 focus:outline-none",
						current === option
							? "bg-white text-gray-800 shadow"
							: "text-gray-600 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
					) }
					onClick={ () => onSelect(option) }
				>
					{ option }
				</button>
			)) }
		</div>
	);
};

export function HorizontalMomentumSelect({ current, options = [], onSelect }) {
	const wrapperRef = useRef(null);
	const textRef = useRef(null);
	const [ isAnimating, setIsAnimating ] = useState(false);

	useEffect(() => {
		setIsAnimating(true);
		const activeIndicator = wrapperRef.current.querySelector(".active-indicator");
		const activeButton = wrapperRef.current.querySelector(".active-button");
		if(activeIndicator && activeButton) {
			const { left, width, height } = activeButton.getBoundingClientRect();
			const wrapperRect = wrapperRef.current.getBoundingClientRect();
			const offset = left - wrapperRect.left;

			activeIndicator.style.left = `${ offset }px`;
			activeIndicator.style.width = `${ width }px`;
			activeIndicator.style.height = `${ height }px`;

			const indicatorText = textRef.current;
			indicatorText.textContent = "";

			setTimeout(() => {
				if(current) {
					indicatorText.textContent = current;
				}
				setIsAnimating(false);  // Animation complete
			}, 300);  // matches the duration of the transition
		}
	}, [ current ]);

	return (
		<div className="relative flex flex-row items-center justify-start w-full p-2 bg-gray-200 border-b rounded-md gap-x-1" ref={ wrapperRef }>
			<div className="absolute left-0 z-10 flex items-center justify-center transition-all duration-300 ease-in-out bg-white rounded-md shadow bottom-2 active-indicator">
				<span ref={ textRef } className="text-sm font-medium leading-5"></span>
			</div>
			{ options.map((option) => (
				<button
					key={ option }
					ref={ (el) => {
						if(current === option) el && el.classList.add("active-button");
						else el && el.classList.remove("active-button");
					} }
					className={ classNames(
						"px-4 py-2 rounded-md text-sm font-medium leading-5 focus:ring-0 focus:outline-none z-20",
						"text-gray-600 focus:outline-none",
						(!isAnimating && current !== option) ? "hover:bg-gray-300 hover:text-gray-800" : ""
					) }
					onClick={ () => onSelect(option) }
				>
					{ option }
				</button>
			)) }
		</div>
	);
};

export default HorizontalMomentumSelect;
