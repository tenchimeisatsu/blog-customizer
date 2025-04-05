import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionKey,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';

export type FormProps = {
	themeSetter: (themeParams: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ themeSetter }: FormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLElement>(null);
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				setIsOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, []);

	function handleSubmit(e: SyntheticEvent) {
		e.preventDefault();
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						selected={articleParams.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(newValue) =>
							setArticleParams(
								updateParamsForm(articleParams, 'fontFamilyOption', newValue)
							)
						}
					/>
					<RadioGroup
						name={'fontSizeOptions'}
						options={fontSizeOptions}
						selected={articleParams.fontSizeOption}
						title={'Размер шрифта'}
						onChange={(newValue) =>
							setArticleParams(
								updateParamsForm(articleParams, 'fontSizeOption', newValue)
							)
						}
					/>
					<Select
						selected={articleParams.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(newValue) =>
							setArticleParams(
								updateParamsForm(articleParams, 'fontColor', newValue)
							)
						}
					/>
					<Separator />
					<Select
						selected={articleParams.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(newValue) =>
							setArticleParams(
								updateParamsForm(articleParams, 'backgroundColor', newValue)
							)
						}
					/>
					<Select
						selected={articleParams.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(newValue) =>
							setArticleParams(
								updateParamsForm(articleParams, 'contentWidth', newValue)
							)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								themeSetter(defaultArticleState);
								setArticleParams(defaultArticleState);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => themeSetter(articleParams)}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};

function updateParamsForm(
	paramsForm: ArticleStateType,
	key: OptionKey,
	value: ArticleStateType[OptionKey]
): ArticleStateType {
	const newParams = { ...paramsForm };
	newParams[key] = value;
	return newParams;
}
