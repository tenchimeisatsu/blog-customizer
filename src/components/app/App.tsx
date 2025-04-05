import { useState, CSSProperties } from 'react';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';

import styles from './App.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] =
		useState<ArticleStateType>(defaultArticleState);
	const applyTheme = (themeParams: ArticleStateType) => {
		return {
			'--font-family': themeParams.fontFamilyOption.value,
			'--font-size': themeParams.fontSizeOption.value,
			'--font-color': themeParams.fontColor.value,
			'--container-width': themeParams.contentWidth.value,
			'--bg-color': themeParams.backgroundColor.value,
		} as CSSProperties;
	};
	return (
		<main className={styles.main} style={applyTheme(articleParams)}>
			<ArticleParamsForm themeSetter={setArticleParams} />
			<Article />
		</main>
	);
};
